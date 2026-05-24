import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [activities, setActivities] = useState([])

  const fetchActivities = async () => {

    const res = await axios.get(
      'http://127.0.0.1:8000/api/activities/'
    )

    setActivities(res.data)
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const uploadFile = async (event, type) => {

    const file = event.target.files[0]

    if (!file) return

    const formData = new FormData()

    formData.append('file', file)

    await axios.post(
      `http://127.0.0.1:8000/api/upload/${type}/`,
      formData
    )

    fetchActivities()
  }

  const approve = async (id) => {

    await axios.post(
      `http://127.0.0.1:8000/api/activities/${id}/approve/`
    )

    fetchActivities()
  }

  const reject = async (id) => {

    await axios.post(
      `http://127.0.0.1:8000/api/activities/${id}/reject/`
    )

    fetchActivities()
  }

  const suspiciousCount =
    activities.filter(
      item => item.suspicious
    ).length

  const approvedCount =
    activities.filter(
      item => item.status === 'approved'
    ).length

  return (

    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial',
        backgroundColor: '#f4f6f8',
        minHeight: '100vh'
      }}
    >

      <h1
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          fontSize: '52px'
        }}
      >
        ESG Emissions Data Review Platform
      </h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}
      >

        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '220px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <h2>{activities.length}</h2>
          <p>Total Records</p>
        </div>

        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '220px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <h2>{suspiciousCount}</h2>
          <p>Suspicious Records</p>
        </div>

        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '220px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <h2>{approvedCount}</h2>
          <p>Approved Records</p>
        </div>

      </div>

      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '40px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >

        <h2>Upload Source Files</h2>

        <br />

        <div style={{ marginBottom: '20px' }}>
          <h3>Upload SAP CSV</h3>

          <input
            type="file"
            onChange={(e) => uploadFile(e, 'sap')}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Upload Utility CSV</h3>

          <input
            type="file"
            onChange={(e) => uploadFile(e, 'utility')}
          />
        </div>

        <div>
          <h3>Upload Travel CSV</h3>

          <input
            type="file"
            onChange={(e) => uploadFile(e, 'travel')}
          />
        </div>

      </div>

      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}
        >

          <thead>

            <tr
              style={{
                backgroundColor: '#1f2937',
                color: 'white'
              }}
            >
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Source</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Suspicious</th>
              <th style={styles.th}>Actions</th>
            </tr>

          </thead>

          <tbody>

            {activities.map((item) => (

              <tr
                key={item.id}
                style={{
                  backgroundColor:
                    item.suspicious
                      ? '#fff7ed'
                      : 'white'
                }}
              >

                <td style={styles.td}>
                  {item.id}
                </td>

                <td style={styles.td}>
                  {item.source_type}
                </td>

                <td style={styles.td}>
                  {item.category}
                </td>

                <td style={styles.td}>
                  {item.quantity} {item.unit}
                </td>

                <td style={styles.td}>

                  <span
                    style={{
                      color:
                        item.status === 'approved'
                          ? 'green'
                          : item.status === 'rejected'
                          ? 'red'
                          : '#444'
                    }}
                  >
                    {item.status}
                  </span>

                </td>

                <td style={styles.td}>

                  {item.suspicious
                    ? '⚠️ Yes'
                    : 'No'}

                </td>

                <td style={styles.td}>

                  {item.status === 'pending' ? (

                    <>

                      <button
                        style={styles.approveButton}
                        onClick={() => approve(item.id)}
                      >
                        Approve
                      </button>

                      <button
                        style={styles.rejectButton}
                        onClick={() => reject(item.id)}
                      >
                        Reject
                      </button>

                    </>

                  ) : (

                    <span>Reviewed</span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

const styles = {

  th: {
    padding: '14px',
    textAlign: 'left'
  },

  td: {
    padding: '14px',
    borderBottom: '1px solid #ddd'
  },

  approveButton: {
    marginRight: '10px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '5px'
  },

  rejectButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '5px'
  }
}

export default App