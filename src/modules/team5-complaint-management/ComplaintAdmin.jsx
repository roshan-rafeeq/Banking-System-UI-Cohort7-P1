import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ComplaintAdmin() {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const location = useLocation();

  const filterName = location.state?.filterName?.toLowerCase() || '';
  const filterPhone = location.state?.filterPhone?.trim() || '';

  useEffect(() => {
    fetch('https://949b-103-141-55-30.ngrok-free.app/api/complaints') // ✅ Updated API
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
      })
      .catch((err) => console.error('Failed to fetch complaints', err));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);

    fetch(`https://949b-103-141-55-30.ngrok-free.app/api/complaints/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated.find((c) => c.id === id)),
    }).catch((err) => console.error('Failed to update status', err));
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesName = filterName === '' || c.name?.toLowerCase().includes(filterName);
    const matchesPhone = filterPhone === '' || c.phone?.includes(filterPhone);

    return matchesStatus && matchesName && matchesPhone;
  });

  return (
    <div className="container mt-4" style={{ marginLeft: '40px' }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="text-primary text-center mb-4">Complaint Admin Panel</h4>

          {/* Filter by status */}
          <div className="d-flex justify-content-end mb-3">
            <Form.Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </Form.Select>
          </div>

          <div className="table-responsive">
            <Table bordered hover className="text-center">
              <thead className="table-primary">
                <tr>
                  <th>Complaint ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.type || 'N/A'}</td>
                      <td>{c.complaint}</td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={c.status}
                          onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Resolved">Resolved</option>
                        </Form.Select>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="info"
                          onClick={() => alert(`Viewing complaint ID: ${c.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No matching complaints found.</td>
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
