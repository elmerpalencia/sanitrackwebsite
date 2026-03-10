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