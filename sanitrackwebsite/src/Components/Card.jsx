import { cardStyles } from "./styles";

function Card({
  title,
  icon,
  value,
  content,
  footerText,
  footerBadge,
  progress,
  accent = "#0d9488",
  iconBg = "#f0fdfa",
}) {
  return (
    <>
      <style>{cardStyles}</style>
      <div
        className="card"
        style={{
          "--accent": accent,
          "--icon-bg": iconBg,
        }}
      >
        <div className="card-header">
          <span className="card-title">{title}</span>
          {icon && (
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icon}
              </svg>
            </div>
          )}
        </div>

        <div className="card-content">
          {value && <div className="card-value">{value}</div>}
          {content && <p className="card-description">{content}</p>}
          {progress !== undefined && (
            <div className="card-progress">
              <div className="progress-label">
                <span>Progress</span>
                <strong>{progress}%</strong>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        {(footerText || footerBadge) && (
          <div className="card-footer">
            {footerBadge && <span className="footer-badge">{footerBadge}</span>}
            {footerText && <span className="footer-text">{footerText}</span>}
          </div>
        )}
      </div>
    </>
  );
}

export default Card;

// Demo
// export default function App() {
//   return (
//     <>
//       <style>{cardStyles}</style>
//       <div className="card-wrapper">

//         {/* Stat card */}
//         <Card
//           title="Total Hand Washes Today"
//           icon={<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
//           value="1,773"
//           content="Recorded across all monitored stations."
//           footerBadge="+12%"
//           footerText="from yesterday"
//           accent="#0d9488"
//           iconBg="#f0fdfa"
//         />

//         {/* Progress card */}
//         <Card
//           title="Overall Compliance"
//           icon={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
//           value="92.6%"
//           progress={92.6}
//           footerText="Target: 95% compliance"
//           footerBadge="On Track"
//           accent="#0ea5e9"
//           iconBg="#f0f9ff"
//         />

//         {/* Info card */}
//         <Card
//           title="Weekly Summary"
//           content="Hand wash volumes peaked on Friday with 320 washes. Weekend volumes dropped as expected, averaging around 185 per day."
//           footerText="View full weekly report →"
//           accent="#8b5cf6"
//           iconBg="#faf5ff"
//           icon={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>}
//         />

//       </div>
//     </>
//   );
// }
