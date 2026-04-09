import Footer from './Components/Footer.jsx'
import Header from './Components/Header.jsx'
import Body  from './Components/Body.jsx'
import Card from './Components/Card.jsx'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient.js'
import './App.css'
import AdminPage from './AdminPage.jsx'
import { Routes, Route } from 'react-router-dom'
import Admin from './AdminPage.jsx'
// import { createClient } from "@supabase/supabase-js";
// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);




function App() {

  
  // const [instruments, setInstruments] = useState([]);

  // useEffect(() => {
  //   getInstruments();
  // }, []);

  // async function getInstruments() {
  //   const { data } = await supabase.from("instruments").select();
  //   setInstruments(data);
  // }


  //checking if it should take you to home page or not
  const [authenticationError, setAuthenticationError] = useState('')
  const [session, setSession] = useState(null)

  //user info
  const [userProfile, setUserProfile] = useState(null)


  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('admin@hospital.com')
  const [password, setPassword] = useState('adminpass')


  const demo = {
    admin: { email: 'admin@hospital.com', password: 'adminpass' },
    staff: { email: 'staff@hospital.com', password: 'staffpass' }
  }

  function selectRole(r) {
    setRole(r)
    setEmail(demo[r].email)
    setPassword(demo[r].password)
  }

  async function handleSignIn() {
    setAuthenticationError('')


    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthenticationError(error.message)
      return
    }
  
 
  }

  //keeps you logged in on a refresh
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  //retrieves user profile
  useEffect(() => {
    if (!session?.user?.id) return

    async function fetchProfile() {
      const { data, error } = await supabase
        .schema("relational")
        .from('profiles')
        .select('name, role')
        .eq('authid', session.user.id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      if (!data) {
        setUserProfile(null)
        return
      }

      setUserProfile(data)
    }

    fetchProfile()
  }, [session])


if (session) {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header userProfile={userProfile} />
          <Body session={session} />
          <Footer />
        </>
      } />
      <Route path="/admin" element={<Admin session={session} />} />
      <Route path="/app" element={<App />} />
    </Routes>
  )
}

  return (
    <div className="sanitrack-root">
      <style>{`
        .sanitrack-root{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;min-height:100vh;width:100vw;background:linear-gradient(90deg,#ffffff 0%, #f3f9ff 100%);background-size:cover;background-repeat:no-repeat;display:flex;align-items:center;justify-content:center;padding:0;overflow-x:hidden}
        .container{width:100%;max-width:1200px;display:flex;flex-direction:column;align-items:center;gap:22px;position:relative;min-height:100vh;padding-top:84px;padding-bottom:84px}

        .nav{width:100%;display:flex;align-items:center;justify-content:space-between}
        .brand{display:flex;align-items:center;gap:12px}
        .brand img{width:46px;height:46px;border-radius:50%;background:white;padding:6px;box-shadow:0 4px 12px rgba(2,6,23,0.06)}
        .brand h2{margin:0;font-size:18px;color:#0b1220}

        .hero{text-align:center;padding:12px 14px;z-index:2}
        .hero h1{font-size:36px;margin:8px 0 8px;color:#071035;line-height:1.05}
        .hero p{color:#475569;margin:0;max-width:720px}

        /* keep login in the document flow so it scrolls with the page */
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
        .btn-ghost{padding:10px;border-radius:8px;border:1px solid #cbd5e1;background:white;cursor:pointer}

        .demo-note{margin-top:12px;background:#f1f8ff;padding:10px;border-radius:8px;color:#0b2b40;font-size:13px}

        @media (max-width:900px){
          .container{padding:28px;padding-top:64px}
        }
        @media (max-width:640px){
          .container{padding:12px}
          .login-card{width:100%}
          .login-center{position:relative;left:auto;top:auto;transform:none;z-index:3}
        }
      `}</style>

      <div className="container">
        <div className="nav">
          <div className="brand">
              <img src="/public/logo.png" alt="SaniTrack Logo" />
            <h2>SaniTrack</h2>
          </div>
          <div />
        </div>

        <div className="hero">
          <h1>Welcome to SaniTrack — Smarter Hand Hygiene</h1>
          <p>Track handwashing activity in real time, measure compliance across your facility, and empower healthcare teams with accurate, actionable data to improve patient safety.</p>
        </div>

        <div className="login-center">
          <div className="login-card">
            <div className="login-top">
                <img src="/public/logo.png" alt="SaniTrack Logo" />
              <h3>Hand Hygiene Tracker</h3>
              <p>Monitoring hand washing compliance for better patient safety</p>
            </div>

            <div className="roles">
              <button className={`role-btn ${role==='admin'?'active':''}`} onClick={() => selectRole('admin')}>Admin</button>
              <button className={`role-btn ${role==='staff'?'active':''}`} onClick={() => selectRole('staff')}>Staff</button>
            </div>

            <div className="field">
              <label style={{fontSize:13,color:'#0b1220'}}>Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label style={{fontSize:13,color:'#0b1220'}}>Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>

            <div className="cta">
              <button className="btn-primary" onClick={handleSignIn} >Sign In</button>
            </div>

            {authenticationError && (
              <div style={{ marginTop: 10, color: "#b91c1c", fontSize: 13 }}>
                {authenticationError}
              </div>
            )}

            <div className="demo-note">
              Demo accounts:
              <div style={{marginTop:6}}>• admin@hospital.com (Admin analytics view)</div>
              <div>• staff@hospital.com (Personal stats)</div>
            </div>
          </div>
        </div>
          
      </div>
    </div>

  )
}

export default App