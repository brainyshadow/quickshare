import React from "react";
import logo from "./logo.svg";

function Welcome() {
  return (
    <div className="grid grid-cols-2 gap-4 bg-fuchsia-300 content-center ">
      <div className="h-screen flex">
        <div className="m-auto">
          <h1 className="text-9xl font-sans mb-10">quickshare</h1>
          <h2 className="mt-10">The easiest to share text between two devices</h2>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Welcome;
