import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PersonalLoanCalculator = () => {
  const [income, setIncome] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [purpose, setPurpose] = useState('');
  const [emi, setEmi] = useState(null);
  const [interest, setInterest] = useState(null);

  const navigate = useNavigate();

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = 12; // dummy annual interest rate (12%)
    const monthlyRate = annualRate / 12 / 100;
    const months = parseInt(tenure);

    if (!principal || !monthlyRate || !months) return;

    const emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emiCalc * months;
    const totalInterest = totalPayment - principal;

    setEmi(emiCalc.toFixed(2));
    setInterest(totalInterest.toFixed(2));
  };

  const handleProceed = () => {
    // optional: save data in localStorage or pass via context/state
    navigate('/loan/personal/apply');
  };

  return (
    <Container className="mt-5 mb-5 py-4 px-3" style={{ maxWidth: '700px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h3 className="mb-4 text-center">Personal Loan Calculator</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Monthly Income (₹)</Form.Label>
          <Form.Control
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Desired Loan Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tenure (Months)</Form.Label>
              <Form.Control
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Purpose of Loan (Optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: Medical, Education, Travel"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </Form.Group>

        <div className="d-grid gap-2 mb-3">
          <Button variant="primary" onClick={calculateEMI}>Calculate EMI</Button>
        </div>
      </Form>

      {emi && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Estimated EMI: ₹{emi}</Card.Title>
            <Card.Text>Total Interest Payable: ₹{interest}</Card.Text>
            <Button variant="success" onClick={handleProceed}>Proceed to Apply</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default PersonalLoanCalculator;
