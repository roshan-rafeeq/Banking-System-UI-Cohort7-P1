import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import { applyGoldLoan } from '../../../services/loanService';
import { getCustomerDetails } from '../../../services/customerService';

const GoldLoanApply = () => {
  const { customerId } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  console.log("Customer id inside Goldloanapply: ",customerId);
  
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerPAN: '',
    customerADHAAR: '',
    customerAddress: '',
    goldGrams: '',
    amount: '',
    interestRate: '7.5',   // Dummy rate
    tenure: 12,
    type: 'Gold Loan',
  });

  // Fetch & prefill data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer = await getCustomerDetails(customerId);
        if (customer) {
          const { customerName, customerPanNumber, customerAadharNumber, customerAddress } = customer;
          setFormData((prev) => ({
            ...prev,
            customerId,
            customerName,
            customerPAN: customerPanNumber,
            customerADHAAR: customerAadharNumber,
            customerAddress: `${customerAddress.city}, ${customerAddress.state}, ${customerAddress.country} - ${customerAddress.pincode}`,
          }));
        }
      } catch (err) {
        setError('Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchData();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    if (name === 'goldGrams') {
      const ratePerGram = 8000;
      const amount = value * ratePerGram;
      updated.amount = amount;
      // Calculate dummy EMI (Simple Interest for now)
      const interest = (amount * updated.interestRate * updated.tenure) / (100 * 12);
      updated.emi = ((amount + interest) / updated.tenure).toFixed(2);
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const cleanData = {
        customerId: formData.customerId,
        customerName: formData.customerName,
        customerPAN: formData.customerPAN,
        customerADHAAR: formData.customerADHAAR,
        customerAddress: formData.customerAddress,
        amount: parseFloat(formData.amount),
        goldGrams: parseFloat(formData.goldGrams),
        interestRate: parseFloat(formData.interestRate),
        tenure: parseInt(formData.tenure),
        type: formData.type
      }
      console.log("clean", cleanData);
      const res = await applyGoldLoan(cleanData);
      if (!res.ok) throw new Error('Failed to submit loan');
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong while applying for loan.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="mt-5 mb-5 py-4 px-3" style={{ maxWidth: '700px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h3 className="mb-4 text-center">Gold Loan Application</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {submitted && <Alert variant="success">Loan application submitted successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control type="text" name="customerName" value={formData.customerName} readOnly />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PAN</Form.Label>
              <Form.Control type="text" name="customerPAN" value={formData.customerPAN} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar</Form.Label>
              <Form.Control type="text" name="customerADHAAR" value={formData.customerADHAAR} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={2} name="customerAddress" value={formData.customerAddress} readOnly />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gold Weight (grams)</Form.Label>
              <Form.Control type="number" name="goldGrams" value={formData.goldGrams} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control type="text" name="amount" value={formData.amount} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Interest Rate (%)</Form.Label>
              <Form.Control type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tenure (months)</Form.Label>
              <Form.Control type="number" name="tenure" value={formData.tenure} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Estimated EMI</Form.Label>
          <Form.Control type="text" name="emi" value={formData.emi} readOnly />
        </Form.Group>

        <Button type="submit" className="w-100">Submit Application</Button>
      </Form>

      {submitted && (
        <div className="text-center mt-3">
          <Button
            variant="outline-danger"
            style={{ backgroundColor: '#f8d7da', borderColor: '#f5c2c7', color: '#842029' }}
            className="w-100"
            onClick={() => (window.location.href = '/loan/status')}
          >
            View Loan Status
          </Button>
        </div>
      )}
    </Container>
  );
};

export default GoldLoanApply;
