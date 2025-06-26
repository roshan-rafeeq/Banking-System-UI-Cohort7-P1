import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();
  return (
    <Navbar expand="lg" className=" navbar-dark py-3 px-4">
      <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img
            src="/logo.png"  
            alt="Bank Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          FinSecure
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >

            <Nav.Link className={`${location.pathname === "/register" || location.pathname ==="/login"? "d-none": ""}`} href="/accounts">Accounts</Nav.Link>
            <Nav.Link className={`${location.pathname === "/register" || location.pathname ==="/login"? "d-none": ""}`} href="/transfer">Transfer</Nav.Link>
            {/* <Nav.Link href="/loan">Loan</Nav.Link> */}
            <NavDropdown className={`${location.pathname === "/register" || location.pathname ==="/login"? "d-none": ""}`} title="Loan" id="standard-nav-dropdown">
              <NavDropdown.Item href='/loan'>Loan Type</NavDropdown.Item>
              <NavDropdown.Item href='/loan/status'>Loan Status</NavDropdown.Item>
            </NavDropdown>

             <NavDropdown className={`${location.pathname === "/register" || location.pathname ==="/login"? "d-none": ""}`} title="Complaint " id="basic-nav-dropdown">
              <NavDropdown.Item href="/complaint">Complaint Register</NavDropdown.Item>
              <NavDropdown.Item href="/complaint/status">
                Complaint Status
              </NavDropdown.Item>
              <NavDropdown.Item href="/complaint/admin">Complaint View</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className={`${location.pathname === "/register" || location.pathname ==="/login"? "d-none": ""}`} href="/debit">Debit Cards</Nav.Link>
          </Nav>
           <div className="d-flex gap-2">
            <Button className={`${location.pathname ==="/profile" || location.pathname==="/login" ? 'd-none':""}`} variant="outline-light" href="/login">Login</Button>
            <Button className={`${(location.pathname === "/profile" || location.pathname==="/register")? 'd-none':""}`} variant="light" href="/register">Register</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;