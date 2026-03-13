import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import Card from './Components/Card.jsx';
import { AdminChart } from './Components/Chart.jsx';  // ← curly braces
import { supabase } from "./supabaseClient"; // ← import supabase for admin side
import { useEffect, useState } from "react"; // ← import React and hooks for admin side

const adminData = {
  "ICU Ward": [
    { day: "Mon", actual: 241, target: 300 },
    { day: "Tue", actual: 278, target: 300 },
    { day: "Wed", actual: 295, target: 300 },
    { day: "Thu", actual: 260, target: 300 },
    { day: "Fri", actual: 318, target: 300 },
    { day: "Sat", actual: 172, target: 200 },
    { day: "Sun", actual: 185, target: 200 },
  ],
  "General Ward": [
    { day: "Mon", actual: 180, target: 220 },
    { day: "Tue", actual: 210, target: 220 },
    { day: "Wed", actual: 198, target: 220 },
    { day: "Thu", actual: 225, target: 220 },
    { day: "Fri", actual: 240, target: 220 },
    { day: "Sat", actual: 130, target: 150 },
    { day: "Sun", actual: 145, target: 150 },
  ],
  "Pediatrics": [
    { day: "Mon", actual: 95, target: 120 },
    { day: "Tue", actual: 112, target: 120 },
    { day: "Wed", actual: 108, target: 120 },
    { day: "Thu", actual: 125, target: 120 },
    { day: "Fri", actual: 119, target: 120 },
    { day: "Sat", actual: 70, target: 80 },
    { day: "Sun", actual: 65, target: 80 },
  ],
};

function Admin() {
  //Do supabase connection
  //start with states, the four cards and the chart data
  const [totalWashes, setTotalWashes] = useState(0); // ← state for total washes
  const [activeStaff, setActiveStaff] = useState(0);// ← state for active staff
  const [staffCompliance, setStaffCompliance] = useState(0); // ← state for staff compliance
  const [topPerformer, setTopPerformer] = useState("Loading..."); // ← state for top performer
  const [chartData, setChartData] = useState(adminData); // ← state for chart data

  //time for useEffect queries to supabase
  useEffect(() => {

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
  }, []); //empty dependency array means this runs once on component mount
  //end of supabase connection query

  return (
    <>
      <Header />
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
          <AdminChart data={chartData} width={800} /> 
        </div>
      </div>
      <Footer />
    </>
  ); //change on line 172, adminData to chartData, connecting chart to state so it can be updated with real data from supabase
}

export default Admin;