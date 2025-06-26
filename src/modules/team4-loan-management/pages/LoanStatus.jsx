import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert, Button } from 'react-bootstrap';
// import { fetchAllLoans } from '../services/loanService'; // to connect backend
import { Link } from 'react-router-dom';

const LoanStatus = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch data from the API
    const fetchLoans = async () => {
      try {
        const response = await fetch('https://6c01-103-141-55-30.ngrok-free.app/goldLoan/all', {
          method: "GET",
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const data = await response.json();  // Parse the response to JSON
        console.log("API Response:", data);  // Log the response to check its structure
        setLoans(Array.isArray(data) ? data : []);  // Ensure it's an array
        setLoading(false);
      } catch (err) {
        console.error('Error fetching loans:', err);
        setLoans([]);  // Set to empty array in case of error
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

    

  return (
    <>
      <Container className="mt-5">
        <h3 className="text-center mb-4">Your Gold Loan Applications</h3>

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
                <th>ID</th>
                <th>Type</th>
                <th>Applicant Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.customerId}</td>
                  <td>{loan.type}</td>
                  <td>{loan.customerName}</td>
                  <td>₹{loan.amount}</td>
                  <td>
                    <strong
                      className={
                        loan.status === 'APPROVED'
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
