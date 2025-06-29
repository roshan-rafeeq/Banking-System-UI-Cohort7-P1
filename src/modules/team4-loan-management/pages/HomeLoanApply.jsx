import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import { applyPropertyLoan } from '../../../services/loanService';
import { getCustomerDetails } from '../../../services/customerService';

const HomeLoanApply = () => {
  const { customerId } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerPAN: '',
    customerADHAAR: '',
    customerAddress: '',
    type: 'Home Loan',
    amount: '',
    loanAmount: '',
    interestRate: 8.5,
    tenure: 15,
    status: 'Pending',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // For spinner if data loading fails

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customer = await getCustomerDetails(customerId);
        if (!customer) {
          throw new Error('Customer not found');
        }

        const address = `${customer.customerAddress.city}, ${customer.customerAddress.state}, ${customer.customerAddress.country} - ${customer.customerAddress.pincode}`;

        setFormData((prev) => ({
          ...prev,
          customerId: customer.customerId,
          customerName: customer.customerName,
          customerPAN: customer.customerPanNumber,
          customerADHAAR: customer.customerAadharNumber,
          customerAddress: address,
        }));

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch customer details:', err);
        setLoading(false);
      }
    };

    if (customerId) fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'amount') {
        updated.loanAmount = value * 0.8;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      const res = await applyPropertyLoan(cleanData);
      if (!res.ok) throw new Error('Failed to submit loan');
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to apply for loan:', err);
    }
  };

  return (
    <Container className="mt-5 mb-5 py-4 px-3" style={{ maxWidth: '720px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h3 className="text-center mb-4">Home Loan Application</h3>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Fetching your details...</p>
        </div>
      ) : (
        <>
          {submitted && (
            <Alert variant="success" className="text-center">
              Home Loan application submitted successfully!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control type="text" name="customerName" value={formData.customerName} readOnly />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>PAN Number</Form.Label>
                  <Form.Control type="text" name="customerPAN" value={formData.customerPAN} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Aadhaar Number</Form.Label>
                  <Form.Control type="text" name="customerADHAAR" value={formData.customerADHAAR} readOnly />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Residential Address</Form.Label>
                  <Form.Control type="text" name="customerAddress" value={formData.customerAddress} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Property Value (₹)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Eligible Loan Amount</Form.Label>
                  <Form.Control type="text" name="loanAmount" value={formData.loanAmount} readOnly />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Interest Rate (%)</Form.Label>
                  <Form.Control type="text" name="interestRate" value={formData.interestRate} readOnly />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Tenure (Years)</Form.Label>
                  <Form.Control type="text" name="tenure" value={formData.tenure} readOnly />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="w-100" variant="primary">
              Submit Application
            </Button>

            {submitted && (
              <div className="text-center mt-3">
                <Button
                  variant="outline-danger"
                  style={{ backgroundColor: '#f8d7da', borderColor: '#f5c2c7', color: '#842029' }}
                  className="w-50"
                  onClick={() => (window.location.href = '/loan/status')}
                >
                  View Status
                </Button>
              </div>
            )}
          </Form>
        </>
      )}
    </Container>
  );
};

export default HomeLoanApply;
