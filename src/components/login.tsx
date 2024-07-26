import { useState } from "react";
import { Button } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import getUser from "../utils/getUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Login = () => {
  const supabase = useSupabaseClient();

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("That didn't quite work!");
    } else {
      return data.user.id;
    }
  }

  async function signInWithGoogle() {
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    })

    if(error){
      alert("There was an error loging in with Google")
      console.log(error)
    }
  }

  return (
    <form
      className="login-form"
      onSubmit={(event) => {
        signInWithEmail(event)
          .then((id) => {
            if (id) {
              return getUser(id);
            }
          })
          .then((user) => {
            if (user) {
              if (user.type === "admin") {
                navigate("/admin");
              } else {
                navigate("/home");
              }
            }
          });
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
      <div className="bottom-wrapper">
        <Button type="submit" value="signup" className="custom-btn">
          Login
        </Button>
        <label
          className="signup-link"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Don't have an account?
        </label>
      </div>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </form>
  );
};

export default Login;
