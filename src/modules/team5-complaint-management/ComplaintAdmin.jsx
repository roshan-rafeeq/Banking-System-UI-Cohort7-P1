import React, { useEffect, useState, useContext } from 'react';
import { Table, Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; // Make sure this path is correct

function ComplaintAdmin() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const location = useLocation();

  const { customerId } = useContext(AuthContext); // ✅ Accessing customerId
  console.log("Logged-in Customer ID:", customerId);

  // Get filter values (name & phone) from route state
  const filterName = location.state?.filterName?.toLowerCase() || '';
  const filterPhone = location.state?.filterPhone?.toLowerCase() || '';

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('https://6555-103-141-55-30.ngrok-free.app/api/complaints', {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setComplaints(data.products || data);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error);
        setErrorMsg('Failed to fetch complaints. Please try again later.');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // 🔍 Filter complaints by name and phone
  const filteredComplaints = complaints.filter((item) => {
    const nameMatch = item.name?.toLowerCase().includes(filterName);
    const phoneMatch = item.phone?.toLowerCase().includes(filterPhone);
    return nameMatch && phoneMatch;
  });

  return (
    <Container className="py-5" style={{ backgroundColor: '#F1F6FB', minHeight: '100vh' }}>
      <Card className="shadow-lg p-4 mb-4">
        <h2 className="text-center text-primary mb-4">Customer Complaints Overview</h2>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading complaints...</p>
          </div>
        )}

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        {!loading && !errorMsg && (
          <div style={{ overflowX: 'auto' }}>
            <Table striped bordered hover responsive="md" className="mt-3">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Complaint Type</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Customer ID</th> {/* ✅ Display customer ID */}
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.name || item.brand}</td>
                      <td>{item.phone || 'N/A'}</td>
                      <td>{item.type || item.category}</td>
                      <td>{(item.complaint || item.description || '').slice(0, 60)}...</td>
                      <td>
                        <select
                          className="form-select"
                          defaultValue={item.status || "Pending"}
                          style={{ padding: '5px 10px', borderRadius: '5px' }}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                              const response = await fetch(`https://43c2-103-141-55-30.ngrok-free.app/api/complaints/${item.id}`, {
                                method: 'PUT',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'ngrok-skip-browser-warning': 'true',
                                },
                                body: JSON.stringify({ status: newStatus }),
                              });

                              if (response.ok) {
                                alert('Status updated successfully');
                              }
                            } catch (err) {
                              console.error('Update error:', err);
                              alert('Status update failed');
                            }
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Resolved</option>
                        </select>
                      </td>
                      <td>{item.customerId || customerId || 'N/A'}</td> {/* ✅ Display each item's customerId */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No complaints found for this name and phone.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default ComplaintAdmin;
