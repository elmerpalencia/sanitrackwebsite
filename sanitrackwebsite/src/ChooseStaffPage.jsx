import { useState } from 'react'

const staffMembers = [
  { id: 1, name: 'Nurse John Doe', role: 'ICU Ward', compliance: '98%' },
  { id: 2, name: 'Nurse Jane Smith', role: 'General Ward', compliance: '95%' },
  { id: 3, name: 'Dr. Michael Brown', role: 'Pediatrics', compliance: '94%' },
  { id: 4, name: 'Nurse Emily Davis', role: 'ICU Ward', compliance: '97%' },
  { id: 5, name: 'Dr. Sarah Wilson', role: 'General Ward', compliance: '93%' },
  { id: 6, name: 'Nurse David Lee', role: 'Pediatrics', compliance: '96%' },
]

export default function ChooseStaffPage() {
  const [selectedStaffId, setSelectedStaffId] = useState(null)

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
              Choose Staff
            </h1>
            <p
              style={{
                marginTop: '10px',
                marginBottom: 0,
                color: '#6b7a99',
                fontSize: '16px',
              }}
            >
              Select a staff member to view their hand hygiene information.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {staffMembers.map((staff) => {
              const isSelected = selectedStaffId === staff.id

              return (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaffId(staff.id)}
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
                      marginBottom: '16px',
                    }}
                  >
                    {staff.role}
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
                    {staff.compliance} compliance
                  </div>
                </button>
              )
            })}
          </div>

          {selectedStaffId && (
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
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