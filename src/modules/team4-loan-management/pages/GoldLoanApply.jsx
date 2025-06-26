





























































import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// import AppNavbar from '../../../components/Navbar';

const GoldLoanApply = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    pan: '',
    aadhaar: '',
    mobile: '',
    address: '',
    goldWeight: '',
    loanAmount: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === 'goldWeight') {
      const ratePerGram = 8000; // dummy logic
      updatedData.loanAmount = value * ratePerGram;
    }

    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting loan application:', formData);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        fullName: '',
        pan: '',
        aadhaar: '',
        mobile: '',
        address: '',
        goldWeight: '',
        loanAmount: '',
      });
    }, 3000);
  };

  return (
    <>
      <Container className="mt-5 mb-5 py-4 px-3" style={{ maxWidth: '650px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <h3 className="mb-4 text-center">Gold Loan Application</h3>

        {submitted && (
          <Alert variant="success" className="text-center">
            Loan application submitted successfully!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  type="text"
                  name="pan"
                  placeholder="ABCDE1234F"
                  value={formData.pan}
                  onChange={handleChange}
                  required
                  maxLength={10}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Aadhaar Number</Form.Label>
                <Form.Control
                  type="text"
                  name="aadhaar"
                  placeholder="1234 5678 9123"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  required
                  maxLength={12}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              placeholder="9876543210"
              value={formData.mobile}
              onChange={handleChange}
              required
              maxLength={10}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Residential Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              placeholder="Your address here"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Gold Weight (in grams)</Form.Label>
                <Form.Control
                  type="number"
                  name="goldWeight"
                  value={formData.goldWeight}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Eligible Loan Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="loanAmount"
                  value={formData.loanAmount}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Submit Application
          </Button>
        </Form>

        {submitted && (
          <div className="text-center">
            <Button
              variant="outline-danger"
              style={{ backgroundColor: '#f8d7da', borderColor: '#f5c2c7', color: '#842029' }}
              className="w-100 mb-3"
              onClick={() => (window.location.href = '/loan/status')}
            >
              View Status
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default GoldLoanApply;
