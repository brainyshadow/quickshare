import React from "react";
import logo from "./logo.svg";
import "./App.css";
import View from "./pages/View";
import Welcome from "./pages/Welcome";
import Edit from "./pages/Edit";

function routePage() {
  if (window.location.pathname === "/view") {
    return <View />;
  } else if (window.location.pathname === "/edit") {
    return <Edit />;
  } else if (window.location.pathname === "/welcome") {
    return <Welcome />;
  } else {
    window.location.pathname = "/welcome";
    return <Welcome />;
  }
}

function App() {
  return <div>{routePage()}</div>;
}

export default App;
