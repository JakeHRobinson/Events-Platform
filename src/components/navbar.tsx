import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import getSession from "../utils/getSession";
import "./navbarStyling.css";
import getUser from "../utils/getUser";

interface User {
  email?: string;
  id?: string;
  user_metadata?: {
    username?: string;
  };
}

interface UserProfile {
  created_at: Date;
  email: string;
  id: number;
  type: string;
  username: string;
  uuid: string;
}

function NavBar() {

  const [session, setSession] = useState<User | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    getSession()
      .then((userSession) => {
        setSession(userSession);
        if (userSession !== null && userSession.id !== undefined) {
          return getUser(userSession.id);
        }
      })
      .then((user) => {
        setUser(user);
      });
  }, [location]);

  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="navbar-centered bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Events</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user?.type === "admin" && (
              <Nav.Link
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Admin
              </Nav.Link>
            )}
            <Nav.Link
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link>Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item>placeholder</NavDropdown.Item>
              <NavDropdown.Item>placeholder 2</NavDropdown.Item>
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
              {session === null ? "Login" : "Account"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
