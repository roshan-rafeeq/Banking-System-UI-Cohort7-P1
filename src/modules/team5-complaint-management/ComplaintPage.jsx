import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ComplaintPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div style={{ width: '100%', padding: '40px' }}>
        <Row className="g-10 align-items-center">
          
          {/* Left Image */}
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

          {/* Right Form */}
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

              <Form>
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

                {/* Loan Account Credit Transaction Dropdown */}
                <Form.Group className="mb-3" controlId="formLoanType">
                  <Form.Label><strong>Type</strong></Form.Label>
                  <Form.Select required>
                    <option value="">Type </option>
                    <option value="">Loan </option>
                    <option value="">Account</option>
                    <option value=""> Credit </option>
                    <option value="">Transaction</option>
                                     

                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formComplaint">
                  <Form.Label>Complaint Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Describe your issue..." required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formFile">
                  <Form.Label>Upload Supporting Document</Form.Label>
                  <Form.Control type="file" />
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
