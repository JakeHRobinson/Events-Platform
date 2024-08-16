import "./login.css";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const navigate = useNavigate();

  const scopes = [
    "profile",
    "email",
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/calendar",
  ].join(" ");

  const signInWithGoogle = async () => {
    const redirect =
      import.meta.env.VITE_ENVIRONMENT === "development"
        ? "http://localhost:5173/home"
        : "https://business-events-platform.netlify.app/home";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: scopes,
        redirectTo: redirect,
      },
    });

    if (error) {
      alert("There was a problem signing you in with google");
    }
  };

  supabase.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/");
    } else {
      console.log(event);
    }
  });
  return (
    <>
      <button className="google-login" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
      />
    </>
  );
};

export default Login;
