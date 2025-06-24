import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopNavbar from './Topnavbar';

function ComplaintPage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <div style={{ width: '90%' }}>
        <Row className="align-items-center">
          {/* Left Image */}
          <Col md={6} className="text-center">
            <img
              src="/images/home.png" // Replace with your own image URL if needed
              alt="Support"
              style={{ width: '80%', maxWidth: '600px' }}
            />
          </Col>

          {/* Right Form */}
          <Col md={6}>
            <div
              style={{
                padding: '30px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 0 15px rgba(0,0,0,0.1)',
              }}
            >
              <h3 className="mb-4 text-center text-primary">Submit Your Complaint</h3>

              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter your phone number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formComplaint">
                  <Form.Label>Complaint Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Describe your issue..." required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label>Upload Supporting Document</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
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
