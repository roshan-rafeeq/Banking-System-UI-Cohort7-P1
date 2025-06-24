import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GoldLoanCalculator = () => {
  const [weight, setWeight] = useState('');
  const [amount, setAmount] = useState(null);
  const navigate = useNavigate();

  const calculateLoan = () => {
    const ratePerGram = 7000; // dummy rate
    setAmount(weight * ratePerGram);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h4>Gold Loan Calculator</h4>
      <Form.Group className="mb-3">
        <Form.Label>Gold Weight (in grams)</Form.Label>
        <Form.Control
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Form.Group>
      <Button variant="info" onClick={calculateLoan}>Calculate</Button>

      {amount && (
        <Alert className="mt-3" variant="success">
          Eligible Loan Amount: ₹{amount}
        </Alert>
      )}

      {amount && (
        <Button className="mt-3" onClick={() => navigate('apply')}>Apply for Gold Loan</Button>
      )}
    </Container>
  );
};

export default GoldLoanCalculator;
