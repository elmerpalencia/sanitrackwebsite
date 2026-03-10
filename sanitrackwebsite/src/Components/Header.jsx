import React, { useState } from 'react';
import { Droplets, Shield, Menu, X, ChevronDown } from 'lucide-react';
import { headerStyles } from './styles';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient.js'

export default function Header({ userProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Media query for desktop nav
  const desktopNavStyle = window.innerWidth >= 768 ? {
    ...headerStyles.desktopNav,
    display: 'flex'
  } : headerStyles.desktopNav;

  const mobileButtonStyle = window.innerWidth >= 768 ? {
    ...headerStyles.mobileMenuButton,
    display: 'none'
  } : headerStyles.mobileMenuButton;

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.accentLine}></div>
      
      <div style={headerStyles.container}>
        <div style={headerStyles.contentWrapper}>
          <nav style={headerStyles.nav}>
            {/* Brand */}
            <div style={headerStyles.brandSection}>
              <div style={headerStyles.iconWrapper}>
                <Droplets size={32} color="#22d3ee" />
              </div>
              <div>
                <h1 style={headerStyles.brandTitle}>SaniTrack</h1>
                <p style={headerStyles.subtitle}>Compliance Suite</p>
              </div>
            </div>

            {/* Desktop Navigation */}

            <div style={desktopNavStyle}>
              <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admins Only</Link>
              <a 
                href="#reports" 
                style={headerStyles.navLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                View Performance
              </a>
              <a 
                href="#resources" 
                style={headerStyles.navLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
              >
                Resources
                <ChevronDown size={14} />
              </a>
              
              <div style={headerStyles.badge}>
                <Shield size={12} />
                <span>HIPAA</span>
              </div>
              
              <button 
                style={headerStyles.ctaButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(34, 211, 238, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(34, 211, 238, 0.3)';
                }}
              >
                Login
              </button>

              <button 
                style={headerStyles.logoutButton}
                  onClick={async () => {
                    await supabase.auth.signOut()
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(34, 211, 238, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(34, 211, 238, 0.3)';
                }}
              >
                Logout
              </button>
              {userProfile?.name ? (
    <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
      {userProfile.name}
    </span>
  ) : null}
            </div>
             
             

            {/* Mobile Menu Button */}
            <button 
              style={mobileButtonStyle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div style={headerStyles.mobileMenu}>
              <a 
                href="#dashboard" 
                style={headerStyles.mobileNavLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </a>
              <a 
                href="#analytics" 
                style={headerStyles.mobileNavLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </a>
              <a 
                href="#reports" 
                style={headerStyles.mobileNavLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                onClick={() => setMobileMenuOpen(false)}
              >
                Reports
              </a>
              <a 
                href="#resources" 
                style={headerStyles.mobileNavLink}
                onMouseEnter={(e) => e.currentTarget.style.color = '#67e8f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </a>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                <div style={headerStyles.badge}>
                  <Shield size={12} />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
              
              <button style={headerStyles.mobileCTAButton}>
                Get Started
              </button>
            </div>
          )}
        </div>
        <div style={headerStyles.accentLine}></div>
      </div>
      
    </header>
  );
}