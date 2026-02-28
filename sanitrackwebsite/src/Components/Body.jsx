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

      const { count, error } = await supabase
        .schema("timeseries")
        .from("handwashevents")
        .select("*", { count: "exact", head: true })
        .eq("authid", userId)
        .gte("timestamp", start.toISOString())
        .lt("timestamp", end.toISOString());

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

    async function fetchComplianceRate() {
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


  //current streak



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
            <h2 className="topic-heading">320</h2>
            <h2 className="topic">Weekly Average</h2>
          </div>
        </div>

        <div className="box box4">
          <div className="text">
            <h2 className="topic-heading">12</h2>
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
            <h2 className="topic-heading">320</h2>
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


