import "./login.css";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const navigate = useNavigate();

  //  const redirect =
  //   import.meta.env.VITE_ENVIRONMENT === "development"
  //     ? "http://localhost:5173"
  //     : "https://business-events-platform.netlify.app";

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/");
    } else {
      console.log(event);
    }
  });
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google"]}
      redirectTo='https://business-events-platform.netlify.app'
    />
  );
};

export default Login;
