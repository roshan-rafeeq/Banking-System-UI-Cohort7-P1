import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

//Check how to use context in functional components
const Home = () => {
  const navigate = useNavigate();
  const {customerId} = useContext(AuthContext); 
  console.log("Customer ID:", customerId);

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingTop: '40px' }}>
      <Container>
        {/* 🏦 Hero Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5">Welcome to FinSecure Bank</h1>
          <p className="text-muted fs-5">
            Simplifying banking, empowering your financial journey in 2025.
          </p>
          <Button variant="primary" size="lg" className="mt-3" onClick={() => navigate('/loan')}>
            Apply for a Loan
          </Button>
        </div>

        {/* 🔗 Services Section */}
        <h3 className="mb-4 text-center">Explore Our Services</h3>
        <Row className="g-4">
          {/* Loan Management */}
          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Loans</Card.Title>
                <Card.Text>
                  Choose from Personal, Gold, and Property loans with easy EMI.
                </Card.Text>
                <Button variant="outline-primary" onClick={() => navigate('/loan')}>
                  Explore Loans
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Complaint System */}
          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Complaints</Card.Title>
                <Card.Text>
                  Raise tickets and track service issues quickly and efficiently.
                </Card.Text>
                <Button variant="outline-primary" onClick={() => navigate('/complaint')}>
                  Lodge Complaint
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Account / Customer / Access placeholders */}
          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Accounts & Onboarding</Card.Title>
                <Card.Text>
                  Manage your account and customer details in one click.
                </Card.Text>
                <Button variant="outline-primary" onClick={() => navigate('/accounts')}>
                  Your Accounts
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Debit Cards</Card.Title>
                <Card.Text>
                  Secure access & login flow to manage your banking.
                </Card.Text>
                <Button variant="outline-primary" onClick={() => navigate('/debit')}>
                  Explore Cards
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Transactions</Card.Title>
                <Card.Text>
                  Send and receive funds with full visibility.
                </Card.Text>
                <Button variant="outline-primary" onClick={() => navigate('/transfer')}>
                  Transfer funds
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
