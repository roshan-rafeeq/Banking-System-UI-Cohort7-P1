import React from 'react';
import NavBar from '../../../components/Navbar';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

function AccountsDashboard() {
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <h2 className="mb-4">Accounts Dashboard</h2>

        <Row className="mb-4">
          <Col md={4}>
            <Card bg="primary" text="white">
              <Card.Body>
                <Card.Title>Total Accounts</Card.Title>
                <Card.Text>1,234</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="success" text="white">
              <Card.Body>
                <Card.Title>Active Accounts</Card.Title>
                <Card.Text>1,000</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="danger" text="white">
              <Card.Body>
                <Card.Title>Closed Accounts</Card.Title>
                <Card.Text>234</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Header>Account Summary</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Account ID</th>
                  <th>Account Type</th>
                  <th>Status</th>
                  <th>Holder Name</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AC001</td>
                  <td>SAVINGS</td>
                  <td>ACTIVE</td>
                  <td>John Doe</td>
                  <td>$5,000</td>
                </tr>
                <tr>
                  <td>AC002</td>
                  <td>LOAN</td>
                  <td>CLOSED</td>
                  <td>Jane Smith</td>
                  <td>$0</td>
                </tr>
                <tr>
                  <td>AC003</td>
                  <td>CURRENT</td>
                  <td>ACTIVE</td>
                  <td>Michael Brown</td>
                  <td>$12,450</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AccountsDashboard;
