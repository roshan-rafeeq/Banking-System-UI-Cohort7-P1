import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ComplaintPage() {
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

    fetch('https://949b-103-141-55-30.ngrok-free.app/api/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit complaint');
        }
        return response.json(); // Parse response JSON
      })
      .then((responseData) => {
        alert(`Complaint submitted successfully!\nCustomer ID: ${responseData.customerId}`);
        form.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong. Try again later.');
      });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{ width: '100%', padding: '40px' }}>
        <Row className="g-10 align-items-center">
          <Col md={6} className="text-center">
            <img
              src="/images/complaint.png"
              alt="Customer Support"
              style={{
                width: '90%',
                maxWidth: '600px',
                height: 'auto',
              }}
            />
          </Col>

          <Col md={6}>
            <div
              style={{
                padding: '40px',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 className="mb-4 text-center text-primary">Submit Your Complaint</h3>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter your phone number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoanType">
                  <Form.Label>Type</Form.Label>
                  <Form.Select required>
                    <option value="">Select Type</option>
                    <option>Loan</option>
                    <option>Account</option>
                    <option>Credit</option>
                    <option>Transaction</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formComplaint">
                  <Form.Label>Complaint Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Describe your issue..." required />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit" className="px-4">
                    Submit Complaint
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ComplaintPage;
