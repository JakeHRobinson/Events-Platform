import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AdminScreen from "./screens/admin";
import UserScreen from "./screens/user";
import NavBar from "./components/navbar";
import Signup from "./components/signup";
import Login from "./components/login";
import AccountScreen from "./screens/account";
import EventScreen from "./screens/eventScreen";
import PaymentScreen from "./screens/paymentScreen";
import { useSession } from "@supabase/auth-helpers-react";

function App() {
  const session = useSession()
  
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/home" element={<UserScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountScreen />} />
        <Route path="/event/:id" element={<EventScreen />} />
        <Route path="/payment/:id" element={<PaymentScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
