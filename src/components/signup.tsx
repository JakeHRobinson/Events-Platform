import { useState } from "react";
import { Button } from "react-bootstrap";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Signup = () => {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  async function signUpWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });

    // console.log({ email, password, username });
    // console.log(event)

    console.log(session);

    setEmail("");
    setPassword("");
    setUsername("");

    if (error) {
      alert(error.message)
      return error;
    } else if (!session) {
      console.log("you made it here");
    }
  }

  return (
    <form
      className="signup-form"
      onSubmit={(event) => {
        signUpWithEmail(event).then((error) => {
          if (!error) {
            alert("Please check your email for a verification link");
            navigate("/login");
          }
        });
      }}
    >
      <label className="signup-item">
        Email:
        <input
          type="text"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
      </label>
      <label className="signup-item">
        Password:
        <input
          type="password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
      </label>
      <label className="signup-item">
        Username:
        <input
          type="text"
          name="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        />
      </label>
      <Button type="submit" value="signup" className="submit-button">
        Submit
      </Button>
    </form>
  );
};

export default Signup;
