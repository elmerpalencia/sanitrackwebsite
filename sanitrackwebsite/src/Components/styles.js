
export const chartStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .chart-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 28px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    font-family: 'DM Sans', sans-serif;
    width: 92%;
  }

  .chart-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .chart-title {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
    margin: 0 0 4px 0;
  }

  .chart-subtitle {
    font-size: 12px;
    color: #94a3b8;
    margin: 0;
    font-weight: 400;
  }

  .dept-tabs {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .dept-tab {
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid #e2e8f0;
    background: transparent;
    color: #64748b;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s ease;
  }

  .dept-tab:hover {
    border-color: #0ea5e9;
    color: #0ea5e9;
  }

  .dept-tab.active {
    background: #0ea5e9;
    border-color: #0ea5e9;
    color: #fff;
  }

  .chart-legend {
    display: flex;
    gap: 16px;
    margin-top: 12px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #64748b;
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .legend-line {
    width: 16px;
    height: 2px;
    border-top: 2px dashed;
  }

  .tooltip-box {
    background: #0f172a !important;
    border-radius: 8px !important;
    padding: 10px 14px !important;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #f8fafc;
    min-width: 130px;
  }

  .tooltip-day {
    font-size: 11px;
    color: #94a3b8;
    margin-bottom: 6px;
    font-family: 'DM Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tooltip-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 2px;
  }

  .tooltip-label { color: #94a3b8; }
  .tooltip-value { font-weight: 600; font-family: 'DM Mono', monospace; }
  .tooltip-actual { color: #38bdf8; }
  .tooltip-target { color: #94a3b8; }
`;


export const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .card-wrapper * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .card-wrapper {
    font-family: 'DM Sans', sans-serif;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    padding: 40px;
    background: #f0f4f8;
    min-height: 100vh;
    align-items: flex-start;
    justify-content: center;
  }
  .card {
    background: #ffffff;
    border-radius: 16px;
    padding: 28px;
    width: 300px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--accent, #0d9488);
    border-radius: 16px 16px 0 0;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.06);
  }
  .card:hover::before {
    opacity: 1;
  }
  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .card-title {
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .card-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--icon-bg, #f0fdfa);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .card-icon svg {
    width: 16px;
    height: 16px;
    color: var(--accent, #0d9488);
  }
  .card-content {
    flex: 1;
  }
  .card-value {
    font-size: 36px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
  .card-description {
    font-size: 14px;
    color: #64748b;
    line-height: 1.5;
    font-weight: 400;
  }
  .card-footer {
    border-top: 1px solid #f1f5f9;
    padding-top: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .footer-text {
    font-size: 12px;
    font-weight: 500;
    color: var(--footer-color, #10b981);
    font-family: 'DM Mono', monospace;
  }
  .footer-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--badge-bg, #f0fdf4);
    color: var(--badge-color, #059669);
    font-size: 11px;
    font-weight: 600;
    font-family: 'DM Mono', monospace;
    padding: 2px 8px;
    border-radius: 100px;
  }
  .card-progress {
    margin-top: 4px;
  }
  .progress-bar-track {
    height: 6px;
    background: #f1f5f9;
    border-radius: 100px;
    overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%;
    border-radius: 100px;
    background: var(--accent, #0d9488);
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .progress-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .progress-label span {
    font-size: 12px;
    color: #94a3b8;
  }
  .progress-label strong {
    font-size: 12px;
    color: #475569;
    font-weight: 500;
  }
`;


export const headerStyles = {
  header: {
    top: 0,
    zIndex: 50,
    background: '#172554',
    borderBottom: '1px solid #1e293b',
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #3b82f6 0%, #22d3ee 50%, #3b82f6 100%)'
  },
  container: {
    position: 'relative',
    paddingTop: '0',
  },
  contentWrapper: {
    maxWidth: '80rem',
    margin: '0 auto'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 0',
    position: 'relative'
  },
  brandSection: {
    display: 'flex',
    alignItems: 'cent#172554er',
    gap: '0.75rem',
    cursor: 'pointer',
    zIndex: 60
  },
  iconWrapper: {
    position: 'relative'
  },
  brandTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #fafafa 0%, #fafafa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    fontSize: '0.75rem',
    color: '#ffffff',
    fontFamily: 'monospace',
    marginTop: '-0.25rem'
  },
  desktopNav: {
    display: 'none',
    alignItems: 'center',
    color: '#ffffff',
    gap: '2rem'
  },
  navLink: {
    fontSize: '0.875rem',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  ctaButton: {
    padding: '0.625rem 1.5rem',
    background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px -1px rgba(34, 211, 238, 0.3)'
  },
  logoutButton: {
    padding: '0.625rem 1.5rem',
    background: 'linear-gradient(135deg, #ee2222 0%, #f63b3b 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px -1px rgba(34, 211, 238, 0.3)'
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.75rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    color: '#10b981',
    fontWeight: '600'
  },
  mobileMenuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#cbd5e1',
    zIndex: 60
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'linear-gradient(135deg, #0f172a 0%, #172554 100%)',
    borderBottom: '1px solid #1e293b',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
  },
  mobileNavLink: {
    fontSize: '1rem',
    color: '#cbd5e1',
    textDecoration: 'none',
    padding: '0.75rem 0',
    borderBottom: '1px solid #1e293b',
    transition: 'color 0.2s'
  },
  mobileCTAButton: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(34, 211, 238, 0.3)'
  }
};

export const footerStyles = {
  footer: {
    position: 'relative',
    background: "#172554",
    color: '#475569',
    overflow: 'hidden'
  },
  pattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
    backgroundSize: '32px 32px'
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #3b82f6 0%, #22d3ee 50%, #3b82f6 100%)'
  },
  container: {
    position: 'relative',
    padding: '3rem 1.5rem'
  },
  contentWrapper: {
    maxWidth: '80rem',
    margin: '0 auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2.5rem',
    marginBottom: '2.5rem'
  },
  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  brandHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer'
  },
  iconWrapper: {
    position: 'relative'
  },
  brandTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '0.75rem',
    color: '#ffffff',
    fontFamily: 'monospace'
  },
  description: {
    fontSize: '0.875rem',
    color: '#cbd5e1',
    lineHeight: '1.5'
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  resourcesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#67e8f9'
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.625rem'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  link: {
    fontSize: '0.875rem',
    color: '#cbd5e1',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'color 0.2s'
  },
  bullet: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: '#475569'
  },
  divider: {
    borderTop: '1px solid #1e293b',
    paddingTop: '2rem',
    marginBottom: '2rem'
  },
  complianceBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  complianceBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '9999px',
    border: '1px solid rgba(51, 65, 85, 0.5)'
  },
  bottomBar: {
    borderTop: '1px solid #1e293b',
    paddingTop: '2rem'
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem'
  },
  copyright: {
    fontSize: '0.875rem',
    color: '#94a3b8'
  },
  footerLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    fontSize: '0.875rem',
    color: '#94a3b8'
  },
  footerLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'color 0.2s'
  }
};