import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import '../../../css/CreateAccount.css';

function CreateAccount() {
  const { customerId } = useContext(AuthContext);
  const finalCustomerId = customerId || "CUST_FAKE_93776";
  const [formData, setFormData] = useState({
    customer_id: '',
    account_type_id: '',
    branch_id: '',
    account_id: '',
  });

  const [branches, setBranches] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountCreated, setAccountCreated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const branchRes = await fetch("https://tadpole-closing-prawn.ngrok-free.app/api/branches", {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });

    const accountTypeRes = await fetch("https://tadpole-closing-prawn.ngrok-free.app/api/account-types", {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
        const branchData = await branchRes.json();
        const accountTypeData = await accountTypeRes.json();

        setBranches(branchData);
        setAccountTypes(accountTypeData);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        setError('Failed to load branch or account type data.');
      }
    };

    fetchDropdownData();

    setFormData((prev) => ({ ...prev, customer_id: finalCustomerId }));
  }, [customerId]);

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
    setError('');
    try {
      const payload = {
        accountId: formData.account_id,
        customerId: formData.customer_id,
        accountTypeId: formData.account_type_id,
        branchId: formData.branch_id,
        status: 'ACTIVE',
        balance: 0
      };

      const response = await fetch("https://tadpole-closing-prawn.ngrok-free.app/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setAccountCreated(true);
      } else {
        setError('Failed to create account.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('An error occurred while creating account.');
    }
  };

  const handleGenerateCard = async () => {
    try {
      const selectedAccountType = accountTypes.find(
        (type) => type.typeId === formData.account_type_id
      );
      const accountType = selectedAccountType ? selectedAccountType.type : '';

      const queryParams = new URLSearchParams({
        customerId: formData.customer_id,
        accountId: formData.account_id,
        accountType: accountType
      });

      const url = `https://e3a4-2406-8800-9014-b44f-2d82-4283-91dd-3ee.ngrok-free.app/debit_card/generate?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "ngrok-skip-browser-warning": "true" }
      });

      if (response.ok) {
        alert("Debit Card generated successfully!");
      } else {
        alert("Failed to generate debit card.");
      }
    } catch (error) {
      console.error("Error generating card:", error);
      alert("Error occurred while generating card.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Create New Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm rounded-4 border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Customer ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer_id"
                    value={formData.customer_id}
                    disabled
                    className="custom-input"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Account Type</Form.Label>
                  <Form.Select
                    name="account_type_id"
                    value={formData.account_type_id}
                    onChange={handleChange}
                    required
                    className="custom-input"
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
                <Form.Group>
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch_id"
                    value={formData.branch_id}
                    onChange={handleChange}
                    required
                    className="custom-input"
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
                <Form.Group>
                  <Form.Label>Generated Account ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="account_id"
                    value={formData.account_id}
                    readOnly
                    className="custom-input"
                  />
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Button type="submit" variant="primary" className="rounded-3 px-4">
                  Create Account
                </Button>
              </Col>

              {accountCreated && (
                <Col xs={12}>
                  <Button variant="success" onClick={handleGenerateCard} className="rounded-3 px-4">
                    Generate Debit Card
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateAccount;
