import React, { useState } from 'react';
import NavBar from '../../../components/Navbar';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function CreateAccount() {
  const [formData, setFormData] = useState({
    customer_id: '',
    account_type: 'SAVINGS',
    branch: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Account Created Successfully!');
  };

  return (
    <>
      <NavBar />
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
                      placeholder="Enter customer ID"
                      name="customer_id"
                      value={formData.customer_id}
                      onChange={handleChange}
                      required
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
                    <Form.Control
                      type="text"
                      placeholder="Enter branch name"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    />
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
    </>
  );
}

export default CreateAccount;
