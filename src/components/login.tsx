import { useState } from "react";
import supabase from "../utils/supabase";
import { Button } from "react-bootstrap";
import "./signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("That didn't quite work!");
    } else {
      navigate("/home");
    }
  }

  return (
    <form
      className="signup-form"
      onSubmit={(event) => {
        signInWithEmail(event);
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
      <Button type="submit" value="signup">
        Login
      </Button>
    </form>
  );
};

export default Signup;
