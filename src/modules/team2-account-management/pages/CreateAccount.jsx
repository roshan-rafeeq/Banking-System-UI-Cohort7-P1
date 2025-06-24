import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function CreateAccount() {
  const [formData, setFormData] = useState({
    customer_id: '',
    account_type: '',
    branch: ''
  });

  const [branches, setBranches] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);

  useEffect(() => {
    // Fetch branches and account types from backend
    const fetchDropdownData = async () => {
      try {
        const branchRes = await fetch("http://localhost:8080/api/branches");
        const accountTypeRes = await fetch("http://localhost:8080/api/account-types");

        const branchData = await branchRes.json();
        const accountTypeData = await accountTypeRes.json();

        setBranches(branchData);
        setAccountTypes(accountTypeData);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();

    // Set default customer ID (you can replace this with real logic)
    const fakeCustomerId = "CUST123456";
    setFormData((prev) => ({ ...prev, customer_id: fakeCustomerId }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Account Created Successfully!");
        setFormData({
          customer_id: 'CUST123456',
          account_type: '',
          branch: ''
        });
      } else {
        alert("Failed to create account.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error occurred while creating account.");
    }
  };

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
                    required
                  >
                    <option value="">Select Account Type</option>
                    {accountTypes.map((type) => (
                      <option key={type.typeId} value={type.type}>
                        {type.type} - {type.description}
                      </option>
                    ))}
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
                    {branches.map((b) => (
                      <option key={b.branchId} value={b.branchName}>
                        {b.branchName}
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
