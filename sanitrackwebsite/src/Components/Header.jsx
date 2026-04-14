import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { headerStyles } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';


export default function Header({ userProfile, adminViewingStaff = false, viewedStaffName = '' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      return;
    }

    navigate('/', { replace: true });
  }

  const desktopNavStyle =
    window.innerWidth >= 768
      ? { ...headerStyles.desktopNav, display: 'flex' }
      : headerStyles.desktopNav;

  const mobileButtonStyle =
    window.innerWidth >= 768
      ? { ...headerStyles.mobileMenuButton, display: 'none' }
      : headerStyles.mobileMenuButton;

  const isAdmin = userProfile?.role?.toLowerCase() === 'admin';

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.accentLine}></div>

      <div style={headerStyles.container}>
        <div style={headerStyles.contentWrapper}>
          <nav style={headerStyles.nav}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="/logo.png"
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
              <h2 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>
                SaniTrack: Handwash Tracking
              </h2>
            </div>

            <div style={desktopNavStyle}>
              {adminViewingStaff ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    style={{
                      background: 'transparent',
                      color: '#fff',
                     
                    }}
                  >
                    Return to Main Page
                  </button>

                  <button
                    type="button"
                    style={headerStyles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                  <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>
                    Viewing: {viewedStaffName}
                  </span>
                </>
              ) : (
                <>
                  {isAdmin && (
                    <>
                      <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Admins View
                      </Link>

                      <Link to="/choose-staff" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Choose Staff
                      </Link>

                      <Link to="/create-user" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Create New Member
                      </Link>
                    </>
                  )}

                  <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    My Stats
                  </Link>

                  <button
                    type="button"
                    style={headerStyles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                  {userProfile?.name && (
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>
                      {userProfile.name}
                    </span>
                  )}
                </>
              )}
            </div>

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