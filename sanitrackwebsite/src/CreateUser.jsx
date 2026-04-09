import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  })

  const [message, setMessage] = useState('')

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function selectRole(role) {
    setFormData({
      ...formData,
      role,
    })
  }

  async function handleSubmit(e) { //async function since using await inside
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setMessage('Please fill out all fields.')
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    const { error: profileError } = await supabase //inserting into profiles
      .schema('relational')
      .from('profiles')
      .insert([
        {
          authid: data.user.id,
          name: formData.name,
          role: formData.role,
        },
      ])

    if (profileError) {
      setMessage(profileError.message)
      return
    }

    setMessage(`User "${formData.name}" was created successfully.`) //showing success message

  }

  return (
    <div className="create-user-root">
      <style>{`
        .create-user-root {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(90deg, #ffffff 0%, #f3f9ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          padding: 24px;
          box-sizing: border-box;
        }

        .create-user-shell {
          width: 100%;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .create-user-brand {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .create-user-brand-inner {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .create-user-brand-inner img {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: white;
          padding: 6px;
          box-shadow: 0 4px 12px rgba(2,6,23,0.06);
        }

        .create-user-brand-inner h2 {
          margin: 0;
          font-size: 18px;
          color: #0b1220;
        }

        .create-user-hero {
          text-align: center;
          max-width: 760px;
        }

        .create-user-hero h1 {
          margin: 0 0 8px 0;
          font-size: 36px;
          line-height: 1.05;
          color: #071035;
        }

        .create-user-hero p {
          margin: 0;
          color: #475569;
        }

        .create-user-card-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .create-user-card {
          width: 100%;
          max-width: 460px;
          background: white;
          border-radius: 12px;
          padding: 28px;
          box-shadow: 0 18px 50px rgba(2,6,23,0.12);
          border: 1px solid rgba(15,23,42,0.04);
        }

        .create-user-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .create-user-top img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #e6f2fb;
          padding: 10px;
        }

        .create-user-top h3 {
          margin: 0;
          font-size: 22px;
          color: #07203a;
        }

        .create-user-top p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          text-align: center;
        }

        .role-row {
          display: flex;
          gap: 8px;
          margin: 14px 0;
        }

        .role-btn {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #cfe8ff;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          color: #0369a1;
          transition: 0.2s ease;
        }

        .role-btn.active {
          background: #0369a1;
          color: white;
          border-color: #0369a1;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }

        .field label {
          font-size: 13px;
          color: #0b1220;
        }

        .field input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e6eef7;
          color: black;
          background: #fbfeff;
          outline: none;
        }

        .field input:focus {
          border-color: #7dd3fc;
          box-shadow: 0 0 0 3px rgba(125, 211, 252, 0.2);
        }

        .cta {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }

        .btn-primary {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: none;
          background: #0477b6;
          color: white;
          font-weight: 700;
          cursor: pointer;
        }

        .form-message {
          margin-top: 10px;
          color: #047857;
          font-size: 13px;
          text-align: center;
        }

        .info-note {
          margin-top: 12px;
          background: #f1f8ff;
          padding: 10px;
          border-radius: 8px;
          color: #0b2b40;
          font-size: 13px;
        }

        @media (max-width: 640px) {
          .create-user-root {
            padding: 12px;
          }

          .create-user-hero h1 {
            font-size: 28px;
          }

          .create-user-card {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="create-user-shell">
        <div className="create-user-brand">
          <div className="create-user-brand-inner">
            <img src="/logo.png" alt="SaniTrack Logo" />
            <h2>SaniTrack</h2>
          </div>
        </div>

        <div className="create-user-hero">
          <h1>Create a New User</h1>
          <p>
            Add a new account to the system and choose whether the user should
            have admin or staff access.
          </p>
        </div>

        <div className="create-user-card-wrap">
          <div className="create-user-card">
            <div className="create-user-top">
              <img src="/logo.png" alt="SaniTrack Logo" />
              <h3>User Setup</h3>
              <p>Enter the new account details below</p>
            </div>

            <div className="role-row">
              <button
                type="button"
                className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                onClick={() => selectRole('admin')}
              >
                Admin
              </button>
              <button
                type="button"
                className={`role-btn ${formData.role === 'staff' ? 'active' : ''}`}
                onClick={() => selectRole('staff')}
              >
                Staff
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                />
              </div>

              <div className="cta">
                <button type="submit" className="btn-primary">
                  Create User
                </button>
              </div>
            </form>

            {message && <div className="form-message">{message}</div>}

            <div className="info-note">
              <div>• Admin accounts should have management access</div>
              <div>• Staff accounts should have standard user access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}