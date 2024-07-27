import { useState } from "react";
import { Button } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import getUser from "../utils/getUser";
import supabase from "../utils/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState<string>("");
  // const [password, setPassword] = useState<string>("");

  // const redirect =
  //   import.meta.env.VITE_ENVIRONMENT === "development"
  //     ? "http://localhost:5173"
  //     : "https://business-events-platform.netlify.app";

  // async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   });
  //   console.log(data);
  //   if (error) {
  //     alert("That didn't quite work!");
  //   } else {
  //     return data.user.id;
  //   }
  // }

  // async function signInWithGoogle() {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       scopes: "https://www.googleapis.com/auth/calendar",
  //       redirectTo: redirect,
  //       queryParams: {
  //         access_type: "offline",
  //         prompt: "consent",
  //       },
  //     },
  //   });

  //   if (error) {
  //     alert("There was an error loging in with Google");
  //     console.log(error);
  //   }
  // }

  supabase.auth.onAuthStateChange(async (event) => {
    if(event === 'SIGNED_IN'){
      navigate('/')
    } else {
      console.log(event)
    }
  })
  return (
    // <form
    //   className="login-form"
    //   onSubmit={(event) => {
    //     signInWithEmail(event)
    //       .then((id) => {
    //         if (id) {
    //           return getUser(id);
    //         }
    //       })
    //       .then((user) => {
    //         if (user) {
    //           if (user.type === "admin") {
    //             navigate("/admin");
    //           } else {
    //             navigate("/home");
    //           }
    //         }
    //       });
    //   }}
    // >
    //   <label className="login-item">
    //     Email:
    //     <input
    //       type="text"
    //       name="email"
    //       onChange={(event) => {
    //         setEmail(event.target.value);
    //       }}
    //       value={email}
    //     />
    //   </label>
    //   <label className="login-item">
    //     Password:
    //     <input
    //       type="password"
    //       name="password"
    //       onChange={(event) => {
    //         setPassword(event.target.value);
    //       }}
    //       value={password}
    //     />
    //   </label>
    //   <div className="bottom-wrapper">
    //     <Button type="submit" value="signup" className="custom-btn">
    //       Login
    //     </Button>
    //     <label
    //       className="signup-link"
    //       onClick={() => {
    //         navigate("/signup");
    //       }}
    //     >
    //       Don't have an account?
    //     </label>
    //   </div>
    //   <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    // </form>

    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google"]}
    />
  );
};

export default Login;
