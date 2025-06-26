import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, Link, NavLink } from 'react-router-dom';
import '../css/NavBar.css';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function NavBar() {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  const isActive = (path) => location.pathname.startsWith(path);
  const isExact = (path) => location.pathname === path;
  const isDropdownActive = (basePath) => location.pathname.startsWith(basePath);
  const hasCustomerId = localStorage.getItem("customerId");

  return (
    <Navbar expand="lg" className="navbar-dark py-3 px-4 custom-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 me-4">
          <img src="/logo.png" alt="Bank Logo" width="30" height="30" />
          FinSecure
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-between w-100">

          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link
              as={NavLink}
              to="/accounts"
              className={`${hasCustomerId ? "" : "d-none"}`}
            >
              Accounts
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/transfer"
              className={`${hasCustomerId ? "" : "d-none"}`}
            >
              Transfer
            </Nav.Link>

            <NavDropdown
              title="Loan"
              id="loan-nav-dropdown"
              className={`${hasCustomerId ? "" : "d-none"} ${isDropdownActive('/loan') ? 'dropdown-active' : ''}`}
            >
              <NavDropdown.Item
                as={NavLink}
                to="/loan"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Loan Type
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/loan/status"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Loan Status
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Complaint"
              id="complaint-nav-dropdown"
              className={`${hasCustomerId ? "" : "d-none"} ${isDropdownActive('/complaint') ? 'dropdown-active' : ''}`}
            >
              <NavDropdown.Item
                as={NavLink}
                to="/complaint"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Complaint Register
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/complaint/status"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Complaint Status
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/complaint/admin"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Complaint View
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              as={NavLink}
              to="/debit"
              className={`${hasCustomerId ? "" : "d-none"}`}
            >
              Debit Cards
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/profile"
              className={`${hasCustomerId ? "" : "d-none"}`}
            >
              Profile
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            {location.pathname !== '/profile' && location.pathname !== '/login' && (
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                className={`${hasCustomerId ? "d-none" : ""}`}
              >
                Login
              </Button>
            )}
            {location.pathname !== '/profile' && location.pathname !== '/register' && (
              <Button
                as={Link}
                to="/register"
                variant="light"
                className={`${hasCustomerId ? "d-none" : ""}`}
              >
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
