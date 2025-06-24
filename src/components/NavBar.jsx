import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar expand="lg" className=" navbar-dark py-3 px-4">
      <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
          <img
            src="/logo.png"  
            alt="Bank Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          Bank Demo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >

            <Nav.Link href="/accounts">Accounts</Nav.Link>
            <Nav.Link href="/transfer">Transfer</Nav.Link>
            <Nav.Link href="/loan-management">Loan management</Nav.Link>
            <Nav.Link href="/complaint-management">Complaint management</Nav.Link>
            <Nav.Link href="/debit-cards">Debit Cards</Nav.Link>
          </Nav>
           <div className="d-flex gap-2">
            <Button variant="outline-light" href="#login">Login</Button>
            <Button variant="light" href="#register">Register</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;