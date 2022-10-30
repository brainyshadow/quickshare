import React from "react";
import logo from "./logo.svg";
import "./App.css";
import View from "./pages/View";
import Welcome from "./pages/Welcome";
import Edit from "./pages/Edit";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function checkRoute(path: string, subStr: string) {
  return path.substr(0, subStr.length) === subStr;
}

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/view" element={<View />} />
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
}

export default App;
