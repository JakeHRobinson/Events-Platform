import { useEffect, useState } from "react";
import getSession from "../utils/getSession";
import getUser from "../utils/getUser";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  created_at: Date;
  email: string;
  id: number;
  type: string;
  username: string;
  uuid: string;
}

function AccountScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    } else {
      console.log("Successful signout");
    }
  };

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session !== null && session.id !== undefined) {
          return getUser(session.id);
        }
      })
      .then((user) => {
        if (user !== null) {
          setUser(user);
        }
      });
  }, []);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{user?.username}</Card.Title>
        <Card.Title>{user?.email}</Card.Title>
        <Card.Text>
          Joined {new Date(user?.created_at || "").toDateString()}
        </Card.Text>
      </Card.Body>
      <Button
        className="primary-btn"
        onClick={() => {
          handleSignOut().then(() => {
            navigate("/home");
          });
        }}
      >
        Logout
      </Button>
    </Card>
  );
}

export default AccountScreen;
