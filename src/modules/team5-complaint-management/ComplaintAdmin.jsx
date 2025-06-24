import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function ComplaintAdmin() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Example: Replace with actual API fetch
    // fetch('/api/complaints')
    //   .then(res => res.json())
    //   .then(data => setComplaints(data));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
  };

  const filteredComplaints =
    filterStatus === 'All'
      ? complaints
      : complaints.filter((c) => c.status === filterStatus);

  return (
    <div className="container mt-4" style={{ marginLeft: '400px' }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="text-primary text-center mb-4">Complaint Admin Panel</h4>

        

          {/* Complaint Table */}
          <div className="table-responsive">
            <Table bordered hover className="text-center">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Complaint Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.complaint}</td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={c.status}
                          onChange={(e) =>
                            handleStatusChange(c.id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Resolved">Resolved</option>
                        </Form.Select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No complaints found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ComplaintAdmin;
