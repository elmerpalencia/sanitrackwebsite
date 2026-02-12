export const headerStyles = {
  header: {
    top: 0,
    zIndex: 50,
    background: '#172554',
    borderBottom: '1px solid #1e293b',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
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