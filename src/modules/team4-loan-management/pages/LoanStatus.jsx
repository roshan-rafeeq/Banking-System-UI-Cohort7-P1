import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert, Button } from 'react-bootstrap';
// import { fetchAllLoans } from '../services/loanService'; // to connect backend
import { Link } from 'react-router-dom';

const LoanStatus = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for now
  const dummyLoans = [
    {
      id: 'L001',
      type: 'Gold Loan',
      name: 'Roshan Rafeeque',
      amount: 50000,
      status: 'Approved',
    },
    {
      id: 'L002',
      type: 'Personal Loan',
      name: 'Roshan Rafeeque',
      amount: 80000,
      status: 'Pending',
    },
  ];

  useEffect(() => {
    // Later replace with fetchAllLoans()
    setTimeout(() => {
      setLoans(dummyLoans);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Container className="mt-5">
        <h3 className="text-center mb-4">Your Loan Applications</h3>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : loans.length === 0 ? (
          <Alert variant="info">No loan applications found.</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Type</th>
                <th>Applicant Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, idx) => (
                <tr key={idx}>
                  <td>{loan.id}</td>
                  <td>{loan.type}</td>
                  <td>{loan.name}</td>
                  <td>₹{loan.amount}</td>
                  <td>
                    <strong
                      className={
                        loan.status === 'Approved'
                          ? 'text-success'
                          : loan.status === 'Pending'
                          ? 'text-warning'
                          : 'text-danger'
                      }
                    >
                      {loan.status}
                    </strong>
                  </td>
                  <td>
                    <Link to={`/loan/status/${loan.id}`}>
  <Button size="sm" variant="info"> View </Button> </Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default LoanStatus;
