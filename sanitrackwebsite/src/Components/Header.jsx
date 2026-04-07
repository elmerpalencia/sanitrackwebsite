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
          <h2 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>SaniTrack: Handwash Tracking</h2>

        </div>

            {/* Desktop Navigation */}

            <div style={desktopNavStyle}>
              <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admins Only</Link>
              <Link to="/app" style={{ color: 'inherit', textDecoration: 'none' }}> View All Staff</Link>
              <Link to="/app" style={{ color: 'inherit', textDecoration: 'none' }}> Create New Member</Link>

              <Link to="/app" style={{ color: 'inherit', textDecoration: 'none' }}> My Stats</Link>
              
              
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
        </div>
        <div style={headerStyles.accentLine}></div>
      </div>
      
    </header>
  );
}