import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function CreateAccount() {
  const [formData, setFormData] = useState({
    customer_id: '',
    account_type: 'SAVINGS',
    branch: '',
  });

  // Simulate auto-filling customer ID (you can replace this with real logic)
  useEffect(() => {
    const fakeCustomerId = 'CUST123456'; // Replace with actual logic
    setFormData((prev) => ({ ...prev, customer_id: fakeCustomerId }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Account Created Successfully!');
  };

  const branchOptions = [
    'Edappally',
    'Kakkanad',
    'Aluva',
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Account Creation Form</h2>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="customerId">
                  <Form.Label>Customer ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer_id"
                    value={formData.customer_id}
                    disabled
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="accountType">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select
                    name="account_type"
                    value={formData.account_type}
                    onChange={handleChange}
                  >
                    <option value="SAVINGS">Savings</option>
                    <option value="CURRENT">Current</option>
                    <option value="LOAN">Loan</option>
                    <option value="POOL">Pool</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="branch">
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a branch</option>
                    {branchOptions.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateAccount;
