import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import getSession from "../utils/getSession";

interface User {
  email?: string;
  id?: string;
  user_metadata?: {
    username?: string;
  };
}

function NavBar() {
  const [session, setSession] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, [location]);

  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Events</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link>Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={() => {
                session === null ? navigate("/login") : navigate("account");
              }}
            >
              {session === null ? "login" : "account"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
