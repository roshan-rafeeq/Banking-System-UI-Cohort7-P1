import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../../components/Navbar';
import { Container, Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';

function AccountDetails() {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ledgerEntries, setLedgerEntries] = useState([]);

  useEffect(() => {
    // Fetch account details from backend
    axios.get(`http://localhost:8080/api/accounts/${accountId}`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then((res) => {
        console.log('Account details fetched:', res.data);
        setAccount(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load account details.');
        setLoading(false);
      });

   // Fetch ledger entries for the account
   axios.get(`http://localhost:8080/api/ledger/account/${accountId}`)
   .then((res) => {
    console.log('Ledger entries fetched:', res.data);
    setLedgerEntries(res.data);
  })
  .catch((err) => {
    console.error('Failed to load ledger entries', err);
  });

  }, [accountId]);

  if (loading) return <Spinner className="m-5" animation="border" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;
  if (!account) return null;

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Account Details</h2>

        {/* Account Info */}
        <Card className="mb-4">
          <Card.Header>Account Info</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}><strong>Customer ID:</strong> {account.customerId || 'N/A'}</Col>
              <Col md={6}><strong>Account Type:</strong> {account.accountType}</Col>
              <Col md={6}><strong>Branch:</strong> {account.branch || 'N/A'}</Col>
              <Col md={6}><strong>Status:</strong> {account.status}</Col>
              <Col md={6}><strong>Balance:</strong> ₹{account.balance?.toLocaleString()}</Col>
              <Col md={6}><strong>Created At:</strong> {new Date(account.createdAt).toLocaleString()}</Col>
              <Col md={6}><strong>Updated At:</strong> {new Date(account.updatedAt).toLocaleString()}</Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Ledger Transactions */}
        <Card>
          <Card.Header>Transactions</Card.Header>
          <Card.Body>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ledgerEntries.map(entry => (
                  <tr key={entry.ledger_entry_id}>
                    <td>{entry.timestamp}</td>
                    <td>{entry.referenceId}</td>
                    <td>{entry.type}</td>
                    <td>₹{entry.amount.toLocaleString()}</td>
                    <td>{entry.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AccountDetails;
