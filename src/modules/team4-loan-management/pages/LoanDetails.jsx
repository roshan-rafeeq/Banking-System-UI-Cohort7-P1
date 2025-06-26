import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { fetchLoanById } from '../services/loanService.js';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import AppNavbar from '../../../components/Navbar';

const LoanDetails = () => {
  const { loanId } = useParams();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoanById(loanId)
      .then((res) => {
        setLoan(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Loan not found or server error.');
        setLoading(false);
      });
  }, [loanId]);

  if (loading) return <Spinner className="mt-5 d-block mx-auto" animation="border" />;
  if (error) return <Alert variant="danger" className="mt-4 text-center">{error}</Alert>;

  return (
    <>
      <AppNavbar />
      <Container className="mt-5">
        <h3 className="mb-4">Loan Details</h3>
        <Card>
          <Card.Body>
            <Card.Text><strong>Loan ID:</strong> {loan.id}</Card.Text>
            <Card.Text><strong>Type:</strong> {loan.type}</Card.Text>
            <Card.Text><strong>Name:</strong> {loan.fullName}</Card.Text>
            <Card.Text><strong>Amount:</strong> ₹{loan.amount}</Card.Text>
            <Card.Text><strong>Status:</strong> {loan.status}</Card.Text>
            <Card.Text><strong>Mobile:</strong> {loan.mobile}</Card.Text>
            <Card.Text><strong>Address:</strong> {loan.address}</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LoanDetails;
