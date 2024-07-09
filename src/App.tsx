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

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/home" element={<UserScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
