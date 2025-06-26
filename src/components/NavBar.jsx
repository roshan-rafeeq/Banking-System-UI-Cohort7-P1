import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import '../css/NavBar.css';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function NavBar() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const isActive = (path) => location.pathname.startsWith(path);
  const isExact = (path) => location.pathname === path;
  const isDropdownActive = (basePath) => location.pathname.startsWith(basePath);

  return (
    <Navbar expand="lg" className="navbar-dark py-3 px-4 custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2 me-4">
          <img src="/logo.png" alt="Bank Logo" width="30" height="30" />
          FinSecure
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-between w-100">

          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/accounts" className={`${localStorage.getItem("customerId") ? " ": "d-none"} ${isActive('/accounts') ? 'active' : ''}`}>
              Accounts
            </Nav.Link>

            <Nav.Link href="/transfer" className={`${localStorage.getItem("customerId") ? " ": "d-none"} ${isActive('/transfer') ? 'active' : ''}`}>
              Transfer
            </Nav.Link>

            <NavDropdown
              title="Loan"
              id="loan-nav-dropdown"
              className={`${localStorage.getItem("customerId") ? " ": "d-none"} ${isDropdownActive('/loan') ? 'dropdown-active' : ''}`}
            >
              <NavDropdown.Item
                href="/loan"
                className={isExact('/loan') ? 'active' : ''}
              >
                Loan Type
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/loan/status"
                className={isExact('/loan/status') ? 'active' : ''}
              >
                Loan Status
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Complaint"
              id="complaint-nav-dropdown"
              className={` ${localStorage.getItem("customerId") ? " ": "d-none"} ${isDropdownActive('/complaint') ? 'dropdown-active' : ''}`}
            >
              <NavDropdown.Item
                href="/complaint"
                className={isExact('/complaint') ? 'active' : ''}
              >
                Complaint Register
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/complaint/status"
                className={isExact('/complaint/status') ? 'active' : ''}
              >
                Complaint Status
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/complaint/admin"
                className={isExact('/complaint/admin') ? 'active' : ''}
              >
                Complaint View
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/debit"className={`${localStorage.getItem("customerId") ? " ": "d-none"} ${isActive('/debit') ? 'active' : ''}`}>
              Debit Cards
            </Nav.Link>
            <Nav.Link href="/profile" className={`${isActive('/profile') ? 'active' : ''} ${localStorage.getItem("customerId") ? "" : "d-none"} `}>
              Profile
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            {location.pathname !== '/profile' && location.pathname !== '/login' && (
              <Button className={`${localStorage.getItem("customerId") ? "d-none" : ""} `} variant="outline-light" href="/login">
                Login
              </Button>
            )}
            {location.pathname !== '/profile' && location.pathname !== '/register' && (
              <Button className={`${localStorage.getItem("customerId") ? "d-none" : ""} `} variant="light" href="/register">
                Register
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
