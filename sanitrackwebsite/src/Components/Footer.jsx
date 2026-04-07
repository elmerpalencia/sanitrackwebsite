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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src="/public/logo.png"
            alt="SaniTrack Logo"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'white',
              padding: '6px',
              boxShadow: '0 4px 12px rgba(2,6,23,0.06)'
            }}
          />
          <h2 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>SaniTrack: The Handwashing Compliance App</h2>

        </div>

        </div>

        {/* Bottom bar */}
        <div style={footerStyles.bottomBar}>
          <div style={bottomContentStyle}>
            <p style={footerStyles.copyright}>
              © {currentYear} SaniTrack Systems. All rights reserved.
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
)};