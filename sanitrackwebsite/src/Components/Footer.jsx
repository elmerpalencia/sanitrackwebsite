import React from 'react';
import { Droplets, Shield, FileText, Lock, AlertCircle } from 'lucide-react';
import { footerStyles } from './styles';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Media query styles (for responsive grid)
  const gridStyle = window.innerWidth >= 768 ? {
    ...footerStyles.grid,
    gridTemplateColumns: 'repeat(2, 1fr)'
  } : footerStyles.grid;

  const bottomContentStyle = window.innerWidth >= 768 ? {
    ...footerStyles.bottomContent,
    flexDirection: 'row'
  } : footerStyles.bottomContent;

  return (
    <footer style={footerStyles.footer}>
      {/* Animated background pattern */}
      <div style={footerStyles.pattern}></div>
      
      {/* Decorative accent line */}
      <div style={footerStyles.accentLine}></div>
      
      <div style={footerStyles.container}>
        <div style={footerStyles.contentWrapper}>
        {/* Main footer content */}
        <div style={gridStyle}>
          
          {/* Brand section */}
          <div style={footerStyles.brandSection}>
            <div style={footerStyles.brandHeader}>
              <div style={footerStyles.iconWrapper}>
                <Droplets size={32} color="#22d3ee" />
              </div>
              <div>
                <h3 style={footerStyles.brandTitle}>CleanTrack</h3>
                <p style={footerStyles.subtitle}>Compliance Suite</p>
              </div>
            </div>
            <p style={footerStyles.description}>
              Enterprise-grade hand hygiene monitoring and compliance tracking for healthcare facilities.
            </p>
            <div style={footerStyles.badge}>
              <Shield size={16} color="#10b981" />
              <span>HIPAA Compliant</span>
            </div>
          </div>

          {/* Resources */}
          <div style={footerStyles.resourcesSection}>
            <h4 style={footerStyles.sectionHeader}>
              <FileText size={16} />
              Resources
            </h4>
            <ul style={footerStyles.list}>
              {['Documentation', 'Best Practices', 'Case Studies', 'Integration Guide', 'API Reference', 'Support Center'].map((item) => (
                <li key={item} style={footerStyles.listItem}>
                  <a 
                    href="#" 
                    style={footerStyles.link}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                  >
                    <span style={footerStyles.bullet}></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance badges */}
        <div style={footerStyles.divider}>
          <div style={footerStyles.complianceBadges}>
            <div style={footerStyles.complianceBadge}>
              <Lock size={12} color="#10b981" />
              <span>SOC 2 Type II</span>
            </div>
            <div style={footerStyles.complianceBadge}>
              <Shield size={12} color="#10b981" />
              <span>HIPAA Compliant</span>
            </div>
            <div style={footerStyles.complianceBadge}>
              <AlertCircle size={12} color="#10b981" />
              <span>FDA Registered</span>
            </div>
            <div style={footerStyles.complianceBadge}>
              <Shield size={12} color="#10b981" />
              <span>ISO 27001</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={footerStyles.bottomBar}>
          <div style={bottomContentStyle}>
            <p style={footerStyles.copyright}>
              © {currentYear} CleanTrack Systems. All rights reserved.
            </p>
            <div style={footerStyles.footerLinks}>
              <a 
                href="#" 
                style={footerStyles.footerLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                Privacy Policy
              </a>
              <span style={{ color: '#334155' }}>•</span>
              <a 
                href="#" 
                style={footerStyles.footerLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                Terms of Service
              </a>
              <span style={{ color: '#334155' }}>•</span>
              <a 
                href="#" 
                style={footerStyles.footerLink}
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
)};