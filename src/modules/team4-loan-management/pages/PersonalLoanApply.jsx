import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import { getCustomerDetails } from '../../../services/customerService';
import { applyPersonalLoan } from '../../../services/loanService';

const PersonalLoanApply = () => {
  const { customerId } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pan: '',
    aadhaar: '',
    address: '',
    occupation: '',
    salary: '',
    loanAmount: '',
    tenure: '',
    purpose: '',
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const cust = await getCustomerDetails(customerId);
        

        const address = `${cust.customerAddress.city}, ${cust.customerAddress.state}, ${cust.customerAddress.country} - ${cust.customerAddress.pincode}`;

        setFormData((prev) => ({
          ...prev,
          fullName: cust.customerName,
          mobile: cust.customerPhone,
          pan: cust.customerPanNumber,
          aadhaar: cust.customerAadharNumber,
          address: address,
        }));
      } catch (err) {
        console.error('Failed to fetch customer data:', err);
      }
    };

    if (customerId) {
      fetchCustomer();
    }
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyPersonalLoan({
        customerId: customerId,
        customerName: formData.fullName,
        customerPhone: formData.mobile,
        customerPAN: formData.pan,
        customerADHAAR: formData.aadhaar,
        customerAddress: formData.address,
        occupation: formData.occupation,
        salary: parseFloat(formData.salary),
        loanAmount: parseFloat(formData.loanAmount),
        tenure: parseInt(formData.tenure),
        purpose: formData.purpose,
        status: 'Pending',
      });

      setSubmitted(true);
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          occupation: '',
          salary: '',
          loanAmount: '',
          tenure: '',
          purpose: '',
        }));
      }, 3000);
    } catch (err) {
      console.error('Failed to apply personal loan:', err);
    }
  };

  return (
    <Container className="mt-5 mb-5 py-4 px-3" style={{ maxWidth: '700px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
      <h3 className="mb-4 text-center">Personal Loan Application</h3>

      {submitted && (
        <Alert variant="success" className="text-center">
          Personal loan application submitted successfully!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="fullName" value={formData.fullName} readOnly />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control name="mobile" value={formData.mobile} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>PAN</Form.Label>
              <Form.Control name="pan" value={formData.pan} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar</Form.Label>
              <Form.Control name="aadhaar" value={formData.aadhaar} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Residential Address</Form.Label>
          <Form.Control as="textarea" rows={2} name="address" value={formData.address} readOnly />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Monthly Salary (₹)</Form.Label>
              <Form.Control
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Loan Amount (₹)</Form.Label>
              <Form.Control
                name="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Tenure (Months)</Form.Label>
          <Form.Control
            name="tenure"
            type="number"
            value={formData.tenure}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Loan Purpose (Optional)</Form.Label>
          <Form.Control
            name="purpose"
            placeholder="Eg: Education, Wedding, Travel"
            value={formData.purpose}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Submit Application
        </Button>

        {submitted && (
          <div className="text-center">
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
    </Container>
  );
};

export default PersonalLoanApply;
