import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const LoanTypes = () => {
  const navigate = useNavigate();

  const loanTypes = [
    {
      title: 'Gold Loan',
      description: 'Instant loans based on gold weight. Best for urgent needs.',
      image: 'https://cdn-icons-png.flaticon.com/512/9691/9691574.png',
      route: 'gold'
    },
    {
      title: 'Personal Loan',
      description: 'Loans for personal needs with flexible repayment.',
      image: 'https://cdn-icons-png.flaticon.com/512/4202/4202846.png',
      route: 'personal'
    },
    {
      title: 'Home Loan',
      description: 'Loan secured against Home with low interest.',
      image: 'https://cdn-icons-png.flaticon.com/512/619/619032.png',
      route: 'home'
    }
  ];

  return (
    <>
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
