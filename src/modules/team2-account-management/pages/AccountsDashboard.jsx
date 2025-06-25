import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AccountsDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/accounts')
      .then(res => {
        console.log('Fetched accounts:', res.data);
        setAccounts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch accounts');
        setLoading(false);
      });
  }, []);

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter(acc => acc.status === 'ACTIVE').length;
  const closedAccounts = accounts.filter(acc => acc.status === 'CLOSED').length;

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Accounts Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Total Accounts</Card.Title>
              <Card.Text>{totalAccounts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Active Accounts</Card.Title>
              <Card.Text>{activeAccounts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card bg="danger" text="white">
            <Card.Body>
              <Card.Title>Closed Accounts</Card.Title>
              <Card.Text>{closedAccounts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>Account Summary</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Account Type</th>
                <th>Status</th>
                <th>Customer ID</th>
                <th>Balance</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.accountId}>
                  <td>{account.accountId}</td>
                  <td>{account.accountTypeName}</td>
                  <td>{account.status}</td>
                  <td>{account.customerId}</td>
                  <td>
                    ₹{account.balance.toLocaleString('en-IN', {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{new Date(account.createdAt).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/accounts/${account.accountId}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AccountsDashboard;
