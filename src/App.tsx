import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminScreen from "./screens/admin";
import UserScreen from "./screens/user";
import NavBar from "./components/navbar";
import Signup from "./components/signup";
import Login from "./components/login";
import AccountScreen from "./screens/account";
import EventScreen from "./screens/eventScreen";
import PrivacyPolicy from "./components/privacyPolicy";
import MyEvents from "./screens/myEvents";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/home" element={<UserScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<AccountScreen />} />
        <Route path="/event/:id" element={<EventScreen />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
