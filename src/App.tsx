// import { useEffect, useState } from "react";
import "./App.css";
// import supabase from "./utils/supabase";
import AdminScreen from "./screens/admin";
import { Navigate, Route, Routes } from "react-router-dom";
import UserScreen from "./screens/user";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={"/admin"} />} />
      <Route path={"/admin"} element={<AdminScreen />} />
      <Route path={"/home"} element={<UserScreen/>}/>
    </Routes>
  );
}

export default App;
