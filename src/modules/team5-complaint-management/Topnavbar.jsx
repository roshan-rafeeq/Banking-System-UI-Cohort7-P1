import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function TopNavbar() {
  return (
    <>
      {/* Top Header */}
      <div style={{
        backgroundColor: '#2B0079',
        color: 'white',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1c/State_Bank_of_India_logo.svg"
            alt="Bank"
            height="30"
            style={{ marginRight: '10px' }}
          />
          <h5 style={{ margin: 0, fontWeight: 'bold' }}>
            Customer Request and Complaint Form
          </h5>
        </div>
        
        <button variant="primary" style={{ fontFamily: 'italic', fontWeight: 'bold', marginLeft : '700px'}}> Back to Home Page </button>
        <Button variant="warning" style={{ fontWeight: 'bold' }}>
          FORMS & FAQ
        </Button>
      </div>

      {/* Navigation */}
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ fontWeight: 'bold', color: 'black' }}>
              Query
            </Nav.Link>
            <Nav.Link as={Link} to="/complaint" style={{ fontWeight: 'bold', color: 'black' }}>
              Request Status
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
