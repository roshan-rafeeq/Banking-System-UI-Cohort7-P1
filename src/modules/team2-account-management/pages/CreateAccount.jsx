import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function CreateAccount() {
  const [formData, setFormData] = useState({
    customer_id: '',
    account_type_id: '',
    branch_id: '',
    account_id: '',
  });

  const [branches, setBranches] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);

  // Set customer ID and fetch dropdown data
  useEffect(() => {
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

    const fakeCustomerId = "CUST9877";
    setFormData((prev) => ({ ...prev, customer_id: fakeCustomerId }));
  }, []);

  // Auto-generate accountId whenever relevant fields change
  useEffect(() => {
    const { branch_id, customer_id, account_type_id } = formData;
    if (branch_id && account_type_id && customer_id) {
      const newAccountId = `${branch_id}-${customer_id}-${account_type_id}`;
      setFormData((prev) => ({ ...prev, account_id: newAccountId }));
    }
  }, [formData.branch_id, formData.account_type_id, formData.customer_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        accountId: formData.account_id,
        customerId: formData.customer_id,
        accountTypeId: formData.account_type_id,
        branchId: formData.branch_id,
        status: 'ACTIVE',
        balance: 0
      };

      console.log("Payload being sent to backend:", payload);

      const response = await fetch("http://localhost:8080/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Account Created Successfully!");
        setFormData({
          customer_id: 'CUST123456',
          account_type_id: '',
          branch_id: '',
          account_id: ''
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
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select
                    name="account_type_id"
                    value={formData.account_type_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Account Type</option>
                    {accountTypes.map((type) => (
                      <option key={type.typeId} value={type.typeId}>
                        {type.type} - {type.description}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch_id"
                    value={formData.branch_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map((b) => (
                      <option key={b.branchId} value={b.branchId}>
                        {b.branchName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Generated Account ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="account_id"
                    value={formData.account_id}
                    readOnly
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
  );
}

export default CreateAccount;
