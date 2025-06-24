import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../../components/Navbar';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';

function AccountDetails() {
  const { accountId } = useParams();
  const [account, setAccount] = useState(null);
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      // Sample data – replace with real API calls later
      setAccount({
        account_id: accountId,
        customer_id: 'CUST123',
        account_type: 'SAVINGS',
        branch: 'Kakkanad',
        status: 'ACTIVE',
        balance: 8500.75,
        created_at: '2024-03-01',
        updated_at: '2025-06-24',
      });

      setLedgerEntries([
        {
          ledger_entry_id: 'LEDG001',
          transaction_id: 'TXN001',
          entry_type: 'CREDIT',
          amount: 5000,
          status: 'SUCCESS',
          timestamp: '2025-06-22',
        },
        {
          ledger_entry_id: 'LEDG002',
          transaction_id: 'TXN002',
          entry_type: 'DEBIT',
          amount: 1500,
          status: 'SUCCESS',
          timestamp: '2025-06-23',
        },
      ]);

      setLoading(false);
    }, 500);
  }, [accountId]);

  if (loading) return <Spinner className="m-5" animation="border" />;

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Account Details  {account.account_id}</h2>

        {/* Account Info Card */}
        <Card className="mb-4">
          <Card.Header>Account Info</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}><strong>Customer ID:</strong> {account.customer_id || 'N/A'}</Col>
              <Col md={6}><strong>Account Type:</strong> {account.account_type}</Col>
              <Col md={6}><strong>Branch:</strong> {account.branch}</Col>
              <Col md={6}><strong>Status:</strong> {account.status}</Col>
              <Col md={6}><strong>Current Balance:</strong> ₹{account.balance}</Col>
              <Col md={6}><strong>Created At:</strong> {account.created_at}</Col>
              <Col md={6}><strong>Updated At:</strong> {account.updated_at}</Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Ledger Table */}
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
                    <td>{entry.transaction_id}</td>
                    <td>{entry.entry_type}</td>
                    <td>₹{entry.amount}</td>
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
