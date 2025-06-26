import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../../components/Navbar';
import { Container, Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import '../../../css/AccountDetails.css';

function AccountDetails() {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ledgerEntries, setLedgerEntries] = useState([]);

  useEffect(() => {
    // Fetch account details
    axios.get(`http://localhost:8080/api/accounts/${accountId}`, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then((res) => {
        setAccount(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load account details.');
        setLoading(false);
      });

    // Fetch ledger entries
    axios.get(`http://localhost:8080/api/ledger/account/${accountId}`)
      .then((res) => setLedgerEntries(res.data))
      .catch((err) => console.error('Failed to load ledger entries', err));
  }, [accountId]);

  if (loading) return <Spinner className="m-5" animation="border" />;
  if (error) return <Alert variant="danger" className="m-4">{error}</Alert>;
  if (!account) return null;

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Account Details</h2>

        {/* Account Info */}
        <Card className="mb-4 shadow-sm rounded-4 border-0">
          <Card.Header className="bg-white border-0 fw-semibold fs-5">Account Info</Card.Header>
          <Card.Body>
            <Row className="gy-3">
              <Col md={6}><strong>Customer ID:</strong> {account.customerId || 'N/A'}</Col>
              <Col md={6}><strong>Account Type:</strong> {account.accountTypeName}</Col>
              <Col md={6}><strong>Branch:</strong> {account.branchName || 'N/A'}</Col>
              <Col md={6}>
                <strong>Status:</strong>{' '}
                <span className={account.status === 'ACTIVE' ? 'status-active' : 'status-closed'}>
                  {account.status}
                </span>
              </Col>
              <Col md={6}>
                <strong>Balance:</strong>{' '}
                ₹{account.balance?.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Ledger Transactions */}
        <Card className="shadow-sm rounded-4 border-0">
          <Card.Header className="bg-white border-0 fw-semibold fs-5">Transactions</Card.Header>
          <Card.Body>
            {ledgerEntries.length === 0 ? (
              <p>No transactions found for this account.</p>
            ) : (
              <Table hover responsive className="modern-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[...ledgerEntries].reverse().map((entry) => (
                    <tr key={entry.ledger_entry_id}>
                      <td>{new Date(entry.timestamp).toLocaleString()}</td>
                      <td>{entry.referenceId}</td>
                      <td>{entry.type}</td>
                      <td>₹{entry.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                      <td>
                        <span className={entry.status === 'SUCCESS' ? 'status-success' : 'status-failed'}>
                          {entry.status}
                        </span>
                      </td>
                      <td>{entry.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AccountDetails;
