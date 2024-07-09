import { useState } from "react";
import supabase from "../utils/supabase";
import { Button } from "react-bootstrap";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

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
      console.log(error);
    } else if (!session) {
      console.log("you made it here");
    }
  }

  return (
    <form
      className="signup-form"
      onSubmit={(event) => {
        signUpWithEmail(event);
      }}
    >
      <label className="login-item">
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
      <label className="login-item">
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
      <label className="login-item">
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
      <Button type="submit" value="signup">
        Submit
      </Button>
    </form>
  );
};

export default Signup;
