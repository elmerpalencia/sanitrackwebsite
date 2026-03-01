// Main.jsx

import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";


export default function Body({ session }) {

  //washes today
  const [washesToday, setWashesToday] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    // start/end of today
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);


    async function fetchWashesToday() {
      const date = start.toISOString().slice(0, 10);
      const { count, error } = await supabase
        .schema("relational")
        .from("history")
        .select("historyid", { count: "exact", head: true })
        .eq("authid", userId)
        .eq("day", date);
        

      if (error) {
        console.error("fetchWashesToday error:", error);
        setWashesToday(0);
      } else {
        setWashesToday(count ?? 0);
      }

    }

    fetchWashesToday();
  }, [session]);


  //compliance rate
  const [complianceRate, setComplianceRate] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    // start/end of today
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    async function fetchComplianceRate() {
      const date = start.toISOString().slice(0, 10);
      const { data, error } = await supabase
        .schema("relational")
        .from("history")
        .select("authid, duration")
        .eq("authid", userId)

        if (error) {
          console.error("fetchCompliance Rate error:", error);
          return;
        }

        const total = data.length;
        const compliance = data.filter(row => row.duration >= 20).length;
        const percentage = total > 0 ? Math.round((compliance / total) * 100) : 0;
        setComplianceRate(percentage);
    }

    fetchComplianceRate();
  }, [session]);


  //weekly average
  const [weeklyAverage, setWeeklyAverageAllTime] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;
    const userId = session.user.id;

    function startOfWeekSunday(dateObj) {
      const d = new Date(dateObj);
      d.setHours(0, 0, 0, 0);
      const dayOfWeek = d.getDay(); 
      d.setDate(d.getDate() - dayOfWeek); 
      return d;
    }

    async function fetchWeeklyAverageAllTime() {
      const { data, error } = await supabase
        .schema("relational")
        .from("history")
        .select("day")
        .eq("authid", userId);

      if (error) {
        console.error("fetchWeeklyAverage error:", error);
        setWeeklyAverageAllTime(0);
        return;
      }

      if (!data || data.length === 0) {
        setWeeklyAverageAllTime(0);
        return;
      }

      const washesPerWeek = {};

      data.forEach((row) => {
        const dateObj = new Date(row.day + "T00:00:00"); //midnight
        const weekStart = startOfWeekSunday(dateObj).toISOString().slice(0, 10);

        washesPerWeek[weekStart] = (washesPerWeek[weekStart] ?? 0) + 1;
      });

      const weekCounts = Object.values(washesPerWeek); // only weeks w/data to account for vacation
      const totalWashes = weekCounts.reduce((sum, c) => sum + c, 0);
      const numWeeks = weekCounts.length;

      const avg = numWeeks > 0 ? totalWashes / numWeeks : 0;

      //.ceil to round up,
      setWeeklyAverageAllTime(Math.ceil(avg));
    }

    fetchWeeklyAverageAllTime();
  }, [session]);


  //current streak
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!session?.user?.id) return;
    const userId = session.user.id;

    async function fetchStreak() {
      try {
        const todayStr = new Date().toISOString().slice(0, 10);

        //get hospitalid
        const { data: profile, error: profileError } = await supabase
          .schema("relational")
          .from("profiles")
          .select("hospitalid")
          .eq("authid", userId)
          .maybeSingle();

        if (profileError) {
          console.error("profile fetch error:", profileError);
          setStreak(0);
          return;
        }
        if (!profile?.hospitalid) {
          console.warn("No hospitalid found for user in profiles.");
          setStreak(0);
          return;
        }

        const hospitalId = profile.hospitalid;

        //get wash compliance metric for that hospital
        const { data: hospital, error: hospitalError } = await supabase
          .schema("relational")
          .from("hospitals")
          .select("dailywashrequirements")
          .eq("hospitalid", hospitalId)
          .maybeSingle();

        if (hospitalError) {
          console.error("hospital fetch error:", hospitalError);
          setStreak(0);
          return;
        }
        if (!hospital?.dailywashrequirements && hospital?.dailywashrequirements !== 0) {
          console.warn("No hospital row returned. (bad hospitalid or RLS)");
          setStreak(0);
          return;
        }

        const requirement = hospital.dailywashrequirements;

        // count washes per day 
        const { data: historyRows, error: historyError } = await supabase
          .schema("relational")
          .from("history")
          .select("day")
          .eq("authid", userId)
          .lte("day", todayStr);

        if (historyError) {
          console.error("history fetch error:", historyError);
          setStreak(0);
          return;
        }

        const washesByDay = {};
        (historyRows ?? []).forEach((r) => {
          washesByDay[r.day] = (washesByDay[r.day] ?? 0) + 1;
        });

        // start streak from today and go backwards until washes for that day don't meet the hospital metric
        let s = 0;
        const d = new Date();          
        d.setHours(0, 0, 0, 0);

        while (true) {
          const dayStr = d.toISOString().slice(0, 10);
          const count = washesByDay[dayStr] ?? 0;

          if (count >= requirement) {
            s += 1;
            d.setDate(d.getDate() - 1); 
          } else {
            break; 
          }
        }

        setStreak(s);
      } catch (e) {
        console.error("fetchStreak unexpected error:", e);
        setStreak(0);
      }
    }

    fetchStreak();
  }, [session]);


  //today's compliance
  const [todayCompliance, setTodayCompliance] = useState("0/0");

  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const date = start.toISOString().slice(0, 10);

    async function fetchTodayCompliance() {
     const { data, error } = await supabase
        .schema("relational")
        .from("history")
        //.select("authid, duration")
        .select("duration")
        .eq("authid", userId)
        .eq("day", date);

        if (error) {
          console.error("fetchCompliance Rate error:", error);
          return;
        }

        const total = data?.length ?? 0;
        const compliance = (data ?? []).filter(row => row.duration >= 20).length;
      setTodayCompliance(`${compliance}/${total}`);
    }

    fetchTodayCompliance();
  }, [session]);



  return (
/*     <div className="main">
      <div className="searchbar2">
        <input type="text" placeholder="Search" />
        <div className="searchbtn">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
            className="icn srchicn"
            alt="search-button"
          />
        </div>
      </div> */

      <div className="box-container">
        <div className="box box1">
          <div className="text">
            <h2 className="topic-heading">{washesToday}</h2>
            <h2 className="topic">Washes Today</h2>
          </div>
        </div>

        <div className="box box2">
          <div className="text">
            <h2 className="topic-heading">{complianceRate}%</h2>
            <h2 className="topic">Compliance Rate</h2>
          </div>
        </div>

        <div className="box box3">
          <div className="text">
            <h2 className="topic-heading">{weeklyAverage}</h2>
            <h2 className="topic">Weekly Average</h2>
          </div>
        </div>

        <div className="box box4">
          <div className="text">
            <h2 className="topic-heading">{streak}</h2>
            <h2 className="topic">Current Streak</h2>
          </div>
        </div>

        <div className="box box5">
          <div className="text">
            <h2 className="topic-heading">320</h2>
            <h2 className="topic">Today's Hourly Activity</h2>
          </div>
        </div>

        <div className="box box6">
          <div className="text">
            <h2 className="topic-heading">{todayCompliance}</h2>
            <h2 className="topic">Today's Compliance</h2>
          </div>
        </div>

        <div className="box box7">
          <div className="text">
            <h2 className="topic-heading">320</h2>
            <h2 className="topic">Weekly Performance Trend</h2>
          </div>
        </div>
      </div>
  );
};


