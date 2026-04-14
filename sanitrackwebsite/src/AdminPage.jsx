import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import Card from './Components/Card.jsx';
import { AdminChart } from './Components/Chart.jsx';  // ← curly braces
import { supabase } from "./supabaseClient"; // ← import supabase for admin side
import { useEffect, useState } from "react"; // ← import React and hooks for admin side



function Admin({ session, userProfile }) {
  //Do supabase connection
  //start with states, the four cards and the chart data
  const [totalWashes, setTotalWashes] = useState(0); // ← state for total washes
  const [activeStaff, setActiveStaff] = useState(0);// ← state for active staff
  const [staffCompliance, setStaffCompliance] = useState(0); // ← state for staff compliance
  const [topPerformer, setTopPerformer] = useState("Loading..."); // ← state for top performer


  //chart info
  const [adminData, setAdminData] = useState({
    "self": [
      { day: "Mon", actual: 0, target: 100 },
      { day: "Tue", actual: 0, target: 100 },
      { day: "Wed", actual: 0, target: 100 },
      { day: "Thu", actual: 0, target: 100 },
      { day: "Fri", actual: 0, target: 100 },
      { day: "Sat", actual: 0, target: 100 },
      { day: "Sun", actual: 0, target: 100 },
    ]
    
  });

  //time for useEffect queries to supabase
  useEffect(() => {
    if (!session?.user?.id) return;

    async function fetchAdminStats() {
      //for total washes of all the staff
      const { count, error } = await supabase
        .schema("relational")
        .from("history")
        .select("historyid", { count: "exact", head: true });

      if (error) {
        console.error("fetchTotalWashes error:", error);
      }
      else {
        setTotalWashes(count ?? 0); //if a wash has has a value, uses it, if not, uses 0
      }

      //for active staff
      const { count: staffCount, error: staffError } = await supabase
        .schema("relational")
        .from("profiles")
        .select("authid", { count: "exact", head: true })
        
      if (staffError) {
        console.error("fetchActiveStaff error:", staffError);
      }
      else {
        setActiveStaff(staffCount ?? 0); //if a staff has has a value, uses it, if not, uses 0
      }
      

      //for staff compliance
      const { data: complianceRows, error: complianceError } = await supabase
        .schema("relational")
        .from("history")
        .select("authid, duration");

      if (complianceError) {
        console.error("fetchCompliance error:", complianceError);
      }

      else {
        const total = complianceRows?.length ?? 0
        const compliant = (complianceRows ?? []).filter(r => r.duration >= 20).length

        const percent = total > 0 ? Math.round((compliant / total) * 100) : 0

        setStaffCompliance(percent);
      }

    

      // //for top performer
      // const { data: performerRows, error: performerError} = await supabase
      //   .schema("relational")
      //   .from("history")
      //   .select("authid, duration");

      // if (performerError) {
      //   console.error("fetchTopPerformer error:", performerError);
      // }
      // else {
      //   const stats = {}

      //   performerRows?.forEach(row => {
      //     if (!stats[row.authid]) {
      //       stats[row.authid] = { total: 0, compliant: 0 }
      //     }

      //     stats[row.authid].total += 1

      //     if (row.duration >= 20) {
      //       stats[row.authid].complaint += 1
      //     }
      //   })

      //   let bestUser = null
      //   let bestRate = 0

      //   for (const id in stats) {

      //     const rate = stats[id].compliant / stats[id].total

      //     if (rate > bestRate) {
      //       bestRate = rate
      //       bestUser = id
      //     }
      //   }

      //   if (bestUser) {
      //     const { data: profile } = await supabase
      //       .schema("relational")
      //       .from("profiles")
      //       .select("name")
      //       .eq("authid", bestUser)
      //       .maybeSingle();

      //     setTopPerformer(profile?.name ?? "Unknown")
      //   }

      //   else {
      //     setTopPerformer("No data")
      //   }
      // }      
    }
    fetchAdminStats();
  }, [session]); //empty dependency array means this runs once on component mount
  //end of supabase connection query

  //Chart data
  //weekly performance trend
  useEffect(() => {
    if (!session?.user?.id) return;
 


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
  }, [session]);


  return (
    <>
      <Header userProfile={userProfile} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px",
        padding: "40px",
        background: "#f0f4f8",
      }}>
        <Card
          title="Staff Compliance"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value={`${staffCompliance}%`} // ← display staff compliance percentage, this is for real changing data, not hardcoded
          progress={staffCompliance} // ← use staff compliance for progress bar
          footerText="Target: 95% compliance"
          footerBadge="On Track"
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        />
        <Card
          title="Amount of Washes"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value={totalWashes} // ← display total washes, this is for real changing data, not hardcoded
          footerText="Up 234 washes from yesterday"
          footerBadge="On Track"
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        />
        {/* <Card
          title="Top Performer"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value={topPerformer} // ← display top performer, this is for real changing data, not hardcoded
          footerText="98% compliance"
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        /> */}
        <Card
          title="Active Staff"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value={activeStaff} // ← display active staff, this is for real changing data, not hardcoded
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        />

        {/* Chart spans both columns — inside the grid */} 
        <div style={{ gridColumn: "1 / -1" }}>
          <AdminChart data={adminData} width={800} /> 
        </div>
      </div>
      <Footer />
      
    </>
  ); //change on line 172, adminData to chartData, connecting chart to state so it can be updated with real data from supabase
}

export default Admin;