import {React, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import AuthContext from '../../context/AuthContext';

function ComplaintPage() {

  const { customerId } = useContext(AuthContext);
  console.log(customerId);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.formName.value,
      email: form.formEmail.value,
      phone: form.formPhone.value,
      type: form.formLoanType.value,
      complaint: form.formComplaint.value,
    };

    fetch('https://6555-103-141-55-30.ngrok-free.app/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert('✅ Your complaint has been successfully registered.');
          form.reset();
        } else {
          alert('⚠️ Something went wrong. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('❌ An error occurred while submitting your complaint.');
      });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F1F6FB',
        padding: '40px 20px',
      }}
    >
      <Row className="g-5 align-items-center">
        {/* LEFT SIDE IMAGE + MESSAGE */}
        <Col md={6} className="text-center">
          <img
            src="images/complaint.png"
            alt="Customer Support"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              marginBottom: '20px',
              borderRadius: '12px',
              boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            }}
          />
          <div
            style={{
              backgroundColor: '#E2EFFB',
              color: '#1F3C88',
              padding: '15px 25px',
              fontSize: '18px',
              fontWeight: '600',
              borderRadius: '10px',
              display: 'inline-block',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.07)',
            }}
          >
            🤝 Need Assistance? Submit your complaint.
          </div>
        </Col>

        {/* RIGHT SIDE FORM */}
        <Col md={6}>
          <Card
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #d9e4f0',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Card.Body>
              <Card.Title
                className="mb-3 text-center"
                style={{ color: '#1F3C88', fontWeight: '700', fontSize: '24px' }}
              >
                📩 Register a Complaint
              </Card.Title>

              <p className="text-muted text-center mb-4" style={{ fontSize: '14px' }}>
                Please provide accurate information. Our support team will reach out shortly.
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    required
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    required
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoanType">
                  <Form.Label>Complaint Type</Form.Label>
                  <Form.Select required style={{ borderRadius: '8px' }}>
                    <option value="">-- Select Category --</option>
                    <option>Loan Related</option>
                    <option>Account Access</option>
                    <option>Credit/Debit Issues</option>
                    <option>Transaction Failure</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formComplaint">
                  <Form.Label>Complaint Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Describe your issue in detail..."
                    required
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-5 py-2"
                    style={{
                      backgroundColor: '#1F3C88',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  >
                    Submit Complaint
                  </Button>
                </div>
              </Form>

              {/* EMAIL SUPPORT */}
              <div className="text-center mt-4">
                <p style={{ marginBottom: '6px' }}>Still have questions?</p>
                <a
                  href="mailto:support@example.com?subject=Complaint%20Assistance"
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    border: '1px solid #17a2b8',
                    borderRadius: '6px',
                    color: '#17a2b8',
                    textDecoration: 'none',
                    fontWeight: '500',
                  }}
                >
                  📧 Email Support
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ComplaintPage;
