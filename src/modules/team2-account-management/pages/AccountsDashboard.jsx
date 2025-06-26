import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, XCircle, Eye } from 'lucide-react';
import "../../../css/AccountDashboard.css";


function AccountsDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://tadpole-closing-prawn.ngrok-free.app/api/accounts', {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((res) => {
        console.log('Fetched accounts:', res.data);
        setAccounts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch accounts');
        setLoading(false);
      });
  }, []);

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter((acc) => acc.status === 'ACTIVE').length;
  const closedAccounts = accounts.filter((acc) => acc.status === 'CLOSED').length;

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Accounts Dashboard</h2>

      <Row className="mb-4">
  <Col md={4}>
    <Card className="shadow-sm rounded-4 border-light border mb-3">
      <Card.Body>
        <div className="d-flex align-items-start">
          <Users size={28} className="me-3 text-secondary" />
          <div>
            <Card.Title className="mb-1 text-muted">Total Accounts</Card.Title>
            <h4 className="text-primary mb-0">{totalAccounts}</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>

  <Col md={4}>
    <Card className="shadow-sm rounded-4 border-light border mb-3">
      <Card.Body>
        <div className="d-flex align-items-start">
          <CheckCircle size={28} className="me-3 text-secondary" />
          <div>
            <Card.Title className="mb-1 text-muted">Active Accounts</Card.Title>
            <h4 className="text-success mb-0">{activeAccounts}</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>

  <Col md={4}>
    <Card className="shadow-sm rounded-4 border-light border mb-3">
      <Card.Body>
        <div className="d-flex align-items-start">
          <XCircle size={28} className="me-3 text-secondary" />
          <div>
            <Card.Title className="mb-1 text-muted">Closed Accounts</Card.Title>
            <h4 className="text-danger mb-0">{closedAccounts}</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>

 <Card className="shadow-sm rounded-4 border-0">
  <Card.Header className="bg-white border-bottom-0 px-4 py-3">
    <h5 className="mb-0 fw-semibold" style={{ color: '#1f2937' }}>Account Summary</h5>
  </Card.Header>
  <Card.Body>
    <div className="table-responsive">
      <Table hover className="modern-table mb-0">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Type</th>
            <th>Status</th>
            <th>Customer ID</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountId}>
              <td>{account.accountId}</td>
              <td>{account.accountTypeName}</td>
              <td>
                <span
                  className={`status-badge ${
                    account.status === 'ACTIVE' ? 'status-active' : 'status-closed'
                  }`}
                >
                  {account.status}
                </span>
              </td>
              <td>{account.customerId}</td>
              <td>
                ₹{account.balance.toLocaleString('en-IN', {
                  maximumFractionDigits: 2,
                })}
              </td>
              <td>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  onClick={() => navigate(`/accounts/${account.accountId}`)}
                >
                  <Eye size={16} />
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

  </Card.Body>
</Card>


    </Container>
  );
}

export default AccountsDashboard;
