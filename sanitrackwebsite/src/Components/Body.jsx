import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Card from "./Card.jsx";
import { AdminChart } from "../Components/Chart.jsx";

export default function Body({
  session,
  adminViewingStaff = false,
  viewedStaffId = null,
}) {
  const effectiveAuthId =
    adminViewingStaff && viewedStaffId ? viewedStaffId : session?.user?.id;

  const [adminData, setAdminData] = useState({
    self: [
      { day: "Mon", actual: 0, target: 100 },
      { day: "Tue", actual: 0, target: 100 },
      { day: "Wed", actual: 0, target: 100 },
      { day: "Thu", actual: 0, target: 100 },
      { day: "Fri", actual: 0, target: 100 },
      { day: "Sat", actual: 0, target: 100 },
      { day: "Sun", actual: 0, target: 100 },
    ],
  });

  const [washesToday, setWashesToday] = useState(0);
  const [washChangeText, setWashChangeText] = useState("No change from yesterday");
  const [complianceRate, setComplianceRate] = useState(0);
  const [weeklyAverage, setWeeklyAverageAllTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [todayCompliance, setTodayCompliance] = useState("0/0");

  useEffect(() => {
    if (!effectiveAuthId) return;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    async function fetchWashesToday() {
      const date = start.toISOString().slice(0, 10);

      const { count, error } = await supabase
        .schema("relational")
        .from("history")
        .select("historyid", { count: "exact", head: true })
        .eq("authid", effectiveAuthId)
        .eq("day", date);

      if (error) {
        console.error("fetchWashesToday error:", error);
        setWashesToday(0);
        setWashChangeText("Unable to compare with yesterday");
        return;
      }

      setWashesToday(count ?? 0);
      const todayCount = count ?? 0;

      const yesterday = new Date(start);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      const { count: yesterdayCount, error: yesterdayError } = await supabase
        .schema("relational")
        .from("history")
        .select("historyid", { count: "exact", head: true })
        .eq("authid", effectiveAuthId)
        .eq("day", yesterdayStr);

      if (yesterdayError) {
        console.error("fetchYesterday error:", yesterdayError);
        setWashChangeText("Unable to compare with yesterday");
        return;
      }

      const diff = todayCount - (yesterdayCount ?? 0);

      if (diff > 0) {
        setWashChangeText(`Up ${diff} washes from yesterday`);
      } else if (diff < 0) {
        setWashChangeText(`Down ${Math.abs(diff)} washes from yesterday`);
      } else {
        setWashChangeText("No change from yesterday");
      }
    }

    fetchWashesToday();
  }, [effectiveAuthId]);

  useEffect(() => {
    if (!effectiveAuthId) return;

    async function fetchComplianceRate() {
      const { data, error } = await supabase
        .schema("relational")
        .from("history")
        .select("duration")
        .eq("authid", effectiveAuthId);

      if (error) {
        console.error("fetchComplianceRate error:", error);
        return;
      }

      const total = data?.length ?? 0;
      const compliant = (data ?? []).filter((row) => row.duration >= 20).length;
      const percentage = total > 0 ? Math.round((compliant / total) * 100) : 0;
      setComplianceRate(percentage);
    }

    fetchComplianceRate();
  }, [effectiveAuthId]);

  const complianceOnTrack = complianceRate >= 95;
  const complianceBadgeText = complianceOnTrack ? "On Track" : "Not On Track";

  useEffect(() => {
    if (!effectiveAuthId) return;

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
        .eq("authid", effectiveAuthId);

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
        const dateObj = new Date(row.day + "T00:00:00");
        const weekStart = startOfWeekSunday(dateObj).toISOString().slice(0, 10);
        washesPerWeek[weekStart] = (washesPerWeek[weekStart] ?? 0) + 1;
      });

      const weekCounts = Object.values(washesPerWeek);
      const totalWashes = weekCounts.reduce((sum, c) => sum + c, 0);
      const numWeeks = weekCounts.length;
      const avg = numWeeks > 0 ? totalWashes / numWeeks : 0;

      setWeeklyAverageAllTime(Math.ceil(avg));
    }

    fetchWeeklyAverageAllTime();
  }, [effectiveAuthId]);

  const weeklyAverageOnTrack = weeklyAverage >= 700;
  const weeklyAverageBadgeText = weeklyAverageOnTrack ? "On Track" : "Not On Track";

  useEffect(() => {
    if (!effectiveAuthId) return;

    async function fetchStreak() {
      try {
        const todayStr = new Date().toISOString().slice(0, 10);

        const { data: profile, error: profileError } = await supabase
          .schema("relational")
          .from("profiles")
          .select("hospitalid")
          .eq("authid", effectiveAuthId)
          .maybeSingle();

        if (profileError || !profile?.hospitalid) {
          console.error("profile fetch error:", profileError);
          setStreak(0);
          setLongestStreak(0);
          return;
        }

        const { data: hospital, error: hospitalError } = await supabase
          .schema("relational")
          .from("hospitals")
          .select("dailywashrequirements")
          .eq("hospitalid", profile.hospitalid)
          .maybeSingle();

        if (hospitalError || hospital?.dailywashrequirements == null) {
          console.error("hospital fetch error:", hospitalError);
          setStreak(0);
          setLongestStreak(0);
          return;
        }

        const requirement = hospital.dailywashrequirements;

        const { data: historyRows, error: historyError } = await supabase
          .schema("relational")
          .from("history")
          .select("day")
          .eq("authid", effectiveAuthId)
          .lte("day", todayStr);

        if (historyError) {
          console.error("history fetch error:", historyError);
          setStreak(0);
          setLongestStreak(0);
          return;
        }

        const washesByDay = {};
        (historyRows ?? []).forEach((r) => {
          washesByDay[r.day] = (washesByDay[r.day] ?? 0) + 1;
        });

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

        const sortedDays = Object.keys(washesByDay).sort();

        let longest = 0;
        let currentRun = 0;
        let previousDate = null;

        for (const day of sortedDays) {
          const count = washesByDay[day] ?? 0;

          if (count < requirement) {
            currentRun = 0;
            previousDate = null;
            continue;
          }

          const currentDate = new Date(day + "T00:00:00");

          if (!previousDate) {
            currentRun = 1;
          } else {
            const nextExpected = new Date(previousDate);
            nextExpected.setDate(nextExpected.getDate() + 1);

            if (currentDate.getTime() === nextExpected.getTime()) {
              currentRun += 1;
            } else {
              currentRun = 1;
            }
          }

          if (currentRun > longest) {
            longest = currentRun;
          }

          previousDate = currentDate;
        }

        setLongestStreak(longest);
      } catch (e) {
        console.error("fetchStreak unexpected error:", e);
        setStreak(0);
        setLongestStreak(0);
      }
    }

    fetchStreak();
  }, [effectiveAuthId]);

  useEffect(() => {
    if (!effectiveAuthId) return;

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const date = start.toISOString().slice(0, 10);

    async function fetchTodayCompliance() {
      const { data, error } = await supabase
        .schema("relational")
        .from("history")
        .select("duration")
        .eq("authid", effectiveAuthId)
        .eq("day", date);

      if (error) {
        console.error("fetchTodayCompliance error:", error);
        return;
      }

      const total = data?.length ?? 0;
      const compliant = (data ?? []).filter((row) => row.duration >= 20).length;
      setTodayCompliance(`${compliant}/${total}`);
    }

    fetchTodayCompliance();
  }, [effectiveAuthId]);

  useEffect(() => {
    if (!effectiveAuthId) return;

    function formatLocalDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    async function fetchWeeklyGraphData() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const startStr = formatLocalDate(startOfWeek);
      const endStr = formatLocalDate(endOfWeek);

      const { data, error } = await supabase
        .schema("relational")
        .from("history")
        .select("day")
        .eq("authid", effectiveAuthId)
        .gte("day", startStr)
        .lte("day", endStr);

      if (error) {
        console.error("fetchWeeklyGraphData error:", error);
        return;
      }

      const washesByDay = {};
      (data ?? []).forEach((row) => {
        washesByDay[row.day] = (washesByDay[row.day] ?? 0) + 1;
      });

      const orderedDays = [
        { label: "Mon", offset: 1, target: 100 },
        { label: "Tue", offset: 2, target: 100 },
        { label: "Wed", offset: 3, target: 100 },
        { label: "Thu", offset: 4, target: 100 },
        { label: "Fri", offset: 5, target: 100 },
        { label: "Sat", offset: 6, target: 100 },
        { label: "Sun", offset: 0, target: 100 },
      ];

      const weekData = orderedDays.map(({ label, offset, target }) => {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + offset);

        const dateStr = formatLocalDate(currentDate);

        return {
          day: label,
          actual: washesByDay[dateStr] ?? 0,
          target,
        };
      });

      setAdminData({
        self: weekData,
      });
    }

    fetchWeeklyGraphData();
  }, [effectiveAuthId]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        padding: "40px",
        background: "#f0f4f8",
      }}
    >
      <Card
        title="Lifetime Compliance"
        icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
        value={complianceRate + "%"}
        progress={complianceRate}
        footerText="Target: 95% compliance"
        footerBadge={complianceBadgeText}
        accent="#0ea5e9"
        iconBg="#f0f9ff"
      />
      <Card
        title="Amount of Washes"
        icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
        value={String(washesToday ?? 0)}
        footerText={washChangeText}
        accent="#0ea5e9"
        iconBg="#f0f9ff"
      />
      <Card
        title="Weekly Average"
        icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
        value={String(weeklyAverage ?? 0)}
        progress={Math.min(Number((((weeklyAverage ?? 0) / 700) * 100).toFixed(2)), 100)}
        footerText="Goal: 700 washes/week"
        footerBadge={weeklyAverageBadgeText}
        accent="#0ea5e9"
        iconBg="#f0f9ff"
      />
      <Card
        title="Current Streak"
        icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
        value={String(streak ?? 0)}
        footerText={`Largest streak: ${longestStreak}`}
        accent="#0ea5e9"
        iconBg="#f0f9ff"
      />
      <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }}>
        <Card
          title="Today's Compliance"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value={todayCompliance}
          footerText="Remember to wash for at least 20 seconds"
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <AdminChart data={adminData} width={800} />
      </div>
    </div>
  );
}