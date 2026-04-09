import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient.js'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import AdminPage from './AdminPage.jsx'
import ChooseStaffPage from './ChooseStaffPage.jsx'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function HomePage({
  role,
  email,
  password,
  authenticationError,
  selectRole,
  setEmail,
  setPassword,
  handleSignIn,
}) {
  return (
    <div className="sanitrack-root">
      <style>{`
        .sanitrack-root{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background-size:cover;display:flex;align-items:center;justify-content:center;padding:0;}
        .container{display:flex;flex-direction:column;align-items:center;}
        .nav{display:flex;align-items:center;justify-content:space-between}
        .brand{display:flex;align-items:center;gap:12px}
        .brand img{width:46px;height:46px;border-radius:50%;background:white;padding:6px;box-shadow:0 4px 12px rgba(2,6,23,0.06)}
        .brand h2{margin:0;font-size:18px;color:#0b1220}
        .hero{text-align:center;padding:12px 14px;z-index:2}
        .hero h1{font-size:36px;margin:8px 0 8px;color:#071035;line-height:1.05}
        .hero p{color:#475569;margin:0;max-width:720px}
        .login-center{position:relative;margin:8px 0;width:100%;display:flex;align-items:center;justify-content:center;padding:12px;z-index:3}
        .login-card{background:white;border-radius:12px;padding:28px;width:460px;box-shadow:0 18px 50px rgba(2,6,23,0.12);border:1px solid rgba(15,23,42,0.04)}
        .login-top{display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:14px}
        .login-top img{width:56px;height:56px;border-radius:50%;background:#e6f2fb;padding:10px}
        .login-top h3{margin:0;font-size:22px;color:#07203a}
        .login-top p{margin:0;color:#64748b;font-size:14px;text-align:center}
        .roles{display:flex;gap:8px;margin:14px 0}
        .role-btn{flex:1;padding:10px;border-radius:10px;border:1px solid #cfe8ff;background:transparent;cursor:pointer;font-weight:600;color:#0369a1}
        .role-btn.active{background:#0369a1;color:white;border-color:#0369a1}
        .field{display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
        .field input{padding:10px 12px;border-radius:8px;border:1px solid #e6eef7;color:black;background:#fbfeff}
        .cta{display:flex;gap:10px;margin-top:8px}
        .btn-primary{flex:1;padding:10px;border-radius:8px;border:none;background:#0477b6;color:white;font-weight:700;cursor:pointer}
      `}</style>

      <div className="container">
        <div className="nav">
          <div className="brand">
            <img src="/logo.png" alt="SaniTrack Logo" />
            <h2>SaniTrack</h2>
          </div>
        </div>

        <div className="hero">
          <h1>Welcome to SaniTrack — Smarter Hand Hygiene</h1>
          <p>
            Track handwashing activity in real time, measure compliance across
            your facility, and empower healthcare teams with accurate,
            actionable data to improve patient safety.
          </p>
        </div>

        <div className="login-center">
          <div className="login-card">
            <div className="login-top">
              <img src="/logo.png" alt="SaniTrack Logo" />
              <h3>Hand Hygiene Tracker</h3>
              <p>Monitoring hand washing compliance for better patient safety</p>
            </div>

            <div className="roles">
              <button
                className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => selectRole('admin')}
              >
                Admin
              </button>
              <button
                className={`role-btn ${role === 'staff' ? 'active' : ''}`}
                onClick={() => selectRole('staff')}
              >
                Staff
              </button>
            </div>

            <div className="field">
              <label style={{ fontSize: 13, color: '#0b1220' }}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="field">
              <label style={{ fontSize: 13, color: '#0b1220' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="cta">
              <button className="btn-primary" onClick={handleSignIn}>
                Sign In
              </button>
            </div>

            {authenticationError && (
              <div style={{ marginTop: 10, color: '#b91c1c', fontSize: 13 }}>
                {authenticationError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardPage({
  userProfile,
  session,
  adminViewingStaff,
  viewedStaffId,
  viewedStaffName,
}) {
  return (
    <>
      <Header
        userProfile={userProfile}
        adminViewingStaff={adminViewingStaff}
        viewedStaffName={viewedStaffName}
      />
      <Body
        session={session}
        adminViewingStaff={adminViewingStaff}
        viewedStaffId={viewedStaffId}
      />
      <Footer />
    </>
  )
}

function App() {

  //staff view
  const location = useLocation()

  const adminViewingStaff = location.state?.adminViewingStaff === true
  const viewedStaffId = location.state?.viewedStaffId || null
  const viewedStaffName = location.state?.viewedStaffName || null

  //regular view
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)
  const [authenticationError, setAuthenticationError] = useState('')
  const [session, setSession] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('admin@hospital.com')
  const [password, setPassword] = useState('adminpass')

  const demo = {
    admin: { email: 'admin@hospital.com', password: 'adminpass' },
    staff: { email: 'staff@hospital.com', password: 'staffpass' },
  }

  function selectRole(r) {
    setRole(r)
    setEmail(demo[r].email)
    setPassword(demo[r].password)
  }

  async function handleSignIn() {
  setAuthenticationError('')
  setIsCheckingAccess(true)

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    setAuthenticationError(error.message)
    setIsCheckingAccess(false)
    return
  }

  const userId = data?.user?.id

  if (!userId) {
    setAuthenticationError('Could not find authenticated user.')
    setIsCheckingAccess(false)
    return
  }

  const { data: profile, error: profileError } = await supabase
    .schema('relational')
    .from('profiles')
    .select('name, role, authid')
    .eq('authid', userId)
    .single()

  if (profileError || !profile) {
    await supabase.auth.signOut()
    setUserProfile(null)
    setSession(null)
    setAuthenticationError('No profile found for this account.')
    setIsCheckingAccess(false)
    return
  }

  const dbRole = profile.role?.toLowerCase()
  const selectedRole = role?.toLowerCase()

  if (dbRole === 'staff' && selectedRole === 'admin') {
    await supabase.auth.signOut()
    setUserProfile(null)
    setSession(null)
    setAuthenticationError('Staff accounts can only log into the Staff page')
    setIsCheckingAccess(false)
    return
  }

  setUserProfile(profile)
  setIsCheckingAccess(false)
}

  useEffect(() => {
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user?.id) return

    async function fetchProfile() {
      const { data, error } = await supabase
        .schema('relational')
        .from('profiles')
        .select('name, role, authid')
        .eq('authid', session.user.id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setUserProfile(data || null)
    }

    fetchProfile()
  }, [session])


  return (
    <Routes>
    <Route
      path="/"
      element={
        session && userProfile ? (
          <DashboardPage
            userProfile={userProfile}
            session={session}
            adminViewingStaff={adminViewingStaff}
            viewedStaffId={viewedStaffId}
            viewedStaffName={viewedStaffName}
          />
        ) : (
          <HomePage
            role={role}
            email={email}
            password={password}
            authenticationError={authenticationError}
            selectRole={selectRole}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSignIn={handleSignIn}
          />
        )
      }
    />
      <Route path="/admin" element={<AdminPage userProfile={userProfile} session={session} />} />
      
      

     <Route
      path="/choose-staff"
      element={
        session ? (
          <ChooseStaffPage session={session} />
        ) : (
          <Navigate to="/" replace />
        )
      }
    />
    </Routes>
  )
}

export default App