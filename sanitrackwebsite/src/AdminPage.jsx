import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import Card from './Components/Card.jsx';
import { AdminChart } from './Components/Chart.jsx';  // ← curly braces

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
          value="92.6%"
          progress={92.6}
          footerText="Target: 95% compliance"
          footerBadge="On Track"
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        />
        <Card
          title="Amount of Washes"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value="1,772"
          footerText="Up 234 washes from yesterday"
          footerBadge="On Track"
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        />
        <Card
          title="Top Performer"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value="Nurse John Doe"
          footerText="98% compliance"
          accent="#0ea5e9"
          iconBg="#f0f9ff"
        />
        <Card
          title="Active Staff"
          icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
          value="53"
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
  );
}

export default Admin;