import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import getSession from "../utils/getSession";
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
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Events</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="collapse-show-menu">
          <Nav className="me-auto">
            {user?.type === "admin" && (
              <Nav.Link
                onClick={() => {
                  navigate("/admin");
                }}
                className="dropdown-content"
              >
                Admin
              </Nav.Link>
            )}
            <Nav.Link
              onClick={() => {
                navigate("/home");
              }}
              className="dropdown-content"
            >
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {session !== null && (
              <Nav.Link
                onClick={() => navigate("/my-events")}
                className="dropdown-content"
              >
                My Events
              </Nav.Link>
            )}
            <Nav.Link
              className="dropdown-content"
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
