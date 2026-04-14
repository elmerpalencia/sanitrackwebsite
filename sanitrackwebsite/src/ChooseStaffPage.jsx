import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient.js'

export default function ChooseStaffPage({ session }) {
  const [staffMembers, setStaffMembers] = useState([])
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!session?.user?.id) return

    async function fetchStaffMembers() {
      setLoading(true)

      const currentUserId = session.user.id

      // get everyone except yourself
      const { data: profiles, error: profilesError } = await supabase
        .schema('relational')
        .from('profiles')
        .select('authid, name, role, departmentname')
        .neq('authid', currentUserId)
        .order('name', { ascending: true })

      if (profilesError) {
        console.error('fetch profiles error:', profilesError)
        setStaffMembers([])
        setLoading(false)
        return
      }

      if (!profiles || profiles.length === 0) {
        setStaffMembers([])
        setLoading(false)
        return
      }


      const authIds = profiles.map((person) => person.authid)

      const { data: historyRows, error: historyError } = await supabase
        .schema('relational')
        .from('history')
        .select('authid, duration')
        .in('authid', authIds)

      if (historyError) {
        console.error('fetch history error:', historyError)
      }

      const complianceMap = {}

      profiles.forEach((person) => {
        complianceMap[person.authid] = { total: 0, compliant: 0 }
      })

      ;(historyRows ?? []).forEach((row) => {
        if (!complianceMap[row.authid]) return

        complianceMap[row.authid].total += 1

        if (row.duration >= 20) {
          complianceMap[row.authid].compliant += 1
        }
      })

      const formattedStaff = profiles.map((person, index) => {
        const stats = complianceMap[person.authid] ?? { total: 0, compliant: 0 }
        const compliance =
          stats.total > 0
            ? Math.round((stats.compliant / stats.total) * 100)
            : 0

        return {
          id: index + 1,
          authid: person.authid,
          name: person.name || 'Unnamed User',
          role: person.role || 'Unknown Role',
          department: person.departmentname || 'Unknown Department',
          compliance,
        }
      })

      setStaffMembers(formattedStaff)
      setLoading(false)
    }

    fetchStaffMembers()
  }, [session])

  function handleContinue() {
    if (!selectedStaff) return

    navigate('/', {
      state: {
        adminViewingStaff: true,
        viewedStaffId: selectedStaff.authid,
        viewedStaffName: selectedStaff.name,
      },
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#e9e9e9',
        padding: '32px 24px 48px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '980px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '22px',
            padding: '28px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            border: '1px solid #dbe3f0',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <h1
              style={{
                margin: 0,
                fontSize: '34px',
                color: '#1d2f6f',
                fontWeight: 700,
              }}
            >
              Choose User
            </h1>
            <p
              style={{
                marginTop: '10px',
                marginBottom: 0,
                color: '#6b7a99',
                fontSize: '16px',
              }}
            >
              Select a user to view their hand hygiene information.
            </p>
          </div>

          {loading ? (
            <p style={{ color: '#6b7a99', fontSize: '16px' }}>Loading users...</p>
          ) : staffMembers.length === 0 ? (
            <p style={{ color: '#6b7a99', fontSize: '16px' }}>
              No other users found.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {staffMembers.map((staff) => {
                const isSelected = selectedStaff?.authid === staff.authid

                return (
                  <button
                    key={staff.authid}
                    onClick={() => setSelectedStaff(staff)}
                    style={{
                      textAlign: 'left',
                      border: isSelected ? '2px solid #1fb6ff' : '1px solid #d7e0ef',
                      borderRadius: '20px',
                      padding: '22px',
                      background: isSelected ? '#1d2f6f' : '#f8fbff',
                      color: isSelected ? '#ffffff' : '#1d2f6f',
                      cursor: 'pointer',
                      transition: '0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        background: isSelected ? '#2fb8ff' : '#d8ecff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '18px',
                        fontSize: '22px',
                        fontWeight: 700,
                        color: isSelected ? '#ffffff' : '#1d2f6f',
                      }}
                    >
                      {staff.name
                        .split(' ')
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join('')}
                    </div>

                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        marginBottom: '8px',
                      }}
                    >
                      {staff.name}
                    </div>

                    <div
                      style={{
                        fontSize: '15px',
                        opacity: isSelected ? 0.9 : 0.75,
                        marginBottom: '6px',
                      }}
                    >
                      {staff.role}
                    </div>

                    <div
                      style={{
                        fontSize: '14px',
                        opacity: isSelected ? 0.85 : 0.7,
                        marginBottom: '16px',
                      }}
                    >
                      {staff.department}
                    </div>

                    <div
                      style={{
                        display: 'inline-block',
                        background: isSelected ? '#ffffff' : '#e7f8ef',
                        color: isSelected ? '#1d2f6f' : '#17a36b',
                        padding: '8px 14px',
                        borderRadius: '999px',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      {staff.compliance}% compliance
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {selectedStaff && (
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={handleContinue}
                style={{
                  background: 'linear-gradient(90deg, #2fb8ff 0%, #3a8dff 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(47, 184, 255, 0.25)',
                }}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}