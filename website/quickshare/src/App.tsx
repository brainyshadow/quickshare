import React from "react";
import logo from "./logo.svg";
import "./App.css";
import View from "./pages/View";
import Welcome from "./pages/Welcome";
import Edit from "./pages/Edit";

function checkRoute(path: string, subStr: string) {
  return path.substr(0, subStr.length) === subStr;
}

function routePage() {
  if (checkRoute(window.location.pathname, "/view")) {
    return <View />;
  } else if (checkRoute(window.location.pathname, "/edit")) {
    return <Edit />;
  } else if (checkRoute(window.location.pathname, "/welcome")) {
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
