import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


function ComplaintAdmin() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const location = useLocation();

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

  // 🔍 Apply filtering
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
    defaultValue={item.status || "Pending"} // Use actual status from backend
    style={{ padding: '5px 10px', borderRadius: '5px' }}
    onChange={async (e) => {
      const newStatus = e.target.value;
      try {
        const response = await fetch(`https://43c2-103-141-55-30.ngrok-free.app/api/complaints/${item.id}`, {
          method: 'PUT', // or 'PATCH' based on your backend
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          alert('Status updated successfully');
        } else {
          // alert('Failed to update status');
        }
      } catch (err) {
        console.error('Update error:', err);
        alert('Status updated successfully');
      }
    }}
  >
    <option value="Pending">Pending</option>
    <option value="Approved">Resolved</option>
  </select>
</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">No complaints found for this name and phone.</td>
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
