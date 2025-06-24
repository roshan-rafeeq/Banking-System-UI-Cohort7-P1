import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AppNavbar from '../../../components/Navbar';

const LoanTypes = () => {
  const navigate = useNavigate();

  const loanTypes = [
    {
      title: 'Gold Loan',
      description: 'Instant loans based on gold weight. Best for urgent needs.',
      image: 'https://cdn-icons-png.flaticon.com/512/5727/5727120.png',
      route: 'gold'
    },
    {
      title: 'Personal Loan',
      description: 'Loans for personal needs with flexible repayment.',
      image: 'https://cdn-icons-png.flaticon.com/512/4202/4202846.png',
      route: 'personal'
    },
    {
      title: 'Property Loan',
      description: 'Loan secured against property with low interest.',
      image: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      route: 'property'
    }
  ];

  return (
    <>
      <AppNavbar />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Select Loan Type</h2>
        <Row>
          {loanTypes.map((loan, idx) => (
            <Col md={4} key={idx} className="d-flex align-items-stretch mb-4">
              <Card className="shadow border-0 w-100">
                <Card.Img variant="top" src={loan.image} style={{ height: '180px', objectFit: 'contain', padding: '1rem' }} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{loan.title}</Card.Title>
                  <Card.Text className="flex-grow-1">{loan.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(loan.route)}
                  >
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default LoanTypes;
