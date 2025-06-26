import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomeLoanCalculator = () => {
  const [homeValue, setHomeValue] = useState('');
  const [loanAmount, setLoanAmount] = useState(null);
  const [showCalc, setShowCalc] = useState(false);
  const navigate = useNavigate();

  const handleCalculate = () => {
    const eligibleLoan = homeValue * 0.8; // 80% of home value
    setLoanAmount(eligibleLoan);
    setShowCalc(true);
  };

  const handleApply = () => {
    navigate('/loan/home/apply'); // navigates to actual form
  };

  return (
    <Container className="mt-5 mb-5 py-4 px-3" style={{ maxWidth: '600px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
      <h3 className="text-center mb-4">Home Loan Eligibility Calculator</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Enter Property Value (₹)</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g. 50,00,000"
            value={homeValue}
            onChange={(e) => setHomeValue(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" className="w-100" onClick={handleCalculate}>
          Calculate Loan Amount
        </Button>
      </Form>

      {showCalc && (
        <Alert variant="info" className="text-center mt-4">
          You are eligible for a loan of <strong>₹{loanAmount}</strong>
        </Alert>
      )}

      {loanAmount && (
        <Button
          variant="success"
          className="w-100 mt-2"
          onClick={handleApply}
        >
          Apply for Home Loan
        </Button>
      )}
    </Container>
  );
};

export default HomeLoanCalculator;
