import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert, Card } from 'react-bootstrap';

function ComplaintAdmin() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setComplaints(data.products); // Adjust based on your actual complaint schema
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error);
        setErrorMsg('Failed to fetch complaints. Please try again later.');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

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
                  <th>Complaint Type</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>{item.brand}</td> {/* Replace with actual customerName */}
                    <td>{item.category}</td> {/* Replace with complaintType */}
                    <td>{item.description.slice(0, 60)}...</td> {/* Replace with complaintMessage */}
                    <td>
                      <span className="badge bg-warning text-dark">Pending</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default ComplaintAdmin;
