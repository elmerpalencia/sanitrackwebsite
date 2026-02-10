import React from 'react';
import { Droplets, Shield, FileText, Lock, AlertCircle } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const styles = {
        footer: {
            position: 'relative',
            background: 'linear-gradient(135deg, #0f172a 0%, #172554 50%, #0f172a 100%)',
            color: '#f1f5f9',
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
            background: 'linear-gradient(90deg, #67e8f9 0%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },
        subtitle: {
            fontSize: '0.75rem',
            color: '#94a3b8',
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

    // Media query styles (for responsive grid)
    const gridStyle = window.innerWidth >= 768 ? {
        ...styles.grid,
        gridTemplateColumns: 'repeat(2, 1fr)'
    } : styles.grid;

    const bottomContentStyle = window.innerWidth >= 768 ? {
        ...styles.bottomContent,
        flexDirection: 'row'
    } : styles.bottomContent;

    return (
        <footer style={styles.footer}>
            {/* Animated background pattern */}
            <div style={styles.pattern}></div>

            {/* Decorative accent line */}
            <div style={styles.accentLine}></div>

            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    {/* Main footer content */}
                    <div style={gridStyle}>

                        {/* Brand section */}
                        <div style={styles.brandSection}>
                            <div style={styles.brandHeader}>
                                <div style={styles.iconWrapper}>
                                    <Droplets size={32} color="#22d3ee" />
                                </div>
                                <div>
                                    <h3 style={styles.brandTitle}>CleanTrack</h3>
                                    <p style={styles.subtitle}>Compliance Suite</p>
                                </div>
                            </div>
                            <p style={styles.description}>
                                Enterprise-grade hand hygiene monitoring and compliance tracking for healthcare facilities.
                            </p>
                            <div style={styles.badge}>
                                <Shield size={16} color="#10b981" />
                                <span>HIPAA Compliant</span>
                            </div>
                        </div>

                        {/* Resources */}
                        <div style={styles.resourcesSection}>
                            <h4 style={styles.sectionHeader}>
                                <FileText size={16} />
                                Resources
                            </h4>
                            <ul style={styles.list}>
                                {['Documentation', 'Best Practices', 'Case Studies', 'Integration Guide', 'API Reference', 'Support Center'].map((item) => (
                                    <li key={item} style={styles.listItem}>
                                        <a
                                            href="#"
                                            style={styles.link}
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                                        >
                                            <span style={styles.bullet}></span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Compliance badges */}
                    <div style={styles.divider}>
                        <div style={styles.complianceBadges}>
                            <div style={styles.complianceBadge}>
                                <Lock size={12} color="#10b981" />
                                <span>SOC 2 Type II</span>
                            </div>
                            <div style={styles.complianceBadge}>
                                <Shield size={12} color="#10b981" />
                                <span>HIPAA Compliant</span>
                            </div>
                            <div style={styles.complianceBadge}>
                                <AlertCircle size={12} color="#10b981" />
                                <span>FDA Registered</span>
                            </div>
                            <div style={styles.complianceBadge}>
                                <Shield size={12} color="#10b981" />
                                <span>ISO 27001</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div style={styles.bottomBar}>
                        <div style={bottomContentStyle}>
                            <p style={styles.copyright}>
                                © {currentYear} CleanTrack Systems. All rights reserved.
                            </p>
                            <div style={styles.footerLinks}>
                                <a
                                    href="#"
                                    style={styles.footerLink}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                >
                                    Privacy Policy
                                </a>
                                <span style={{ color: '#334155' }}>•</span>
                                <a
                                    href="#"
                                    style={styles.footerLink}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                >
                                    Terms of Service
                                </a>
                                <span style={{ color: '#334155' }}>•</span>
                                <a
                                    href="#"
                                    style={styles.footerLink}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                >
                                    Cookie Settings
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}