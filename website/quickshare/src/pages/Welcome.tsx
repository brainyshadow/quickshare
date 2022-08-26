import React from "react";
import logo from "./logo.svg";
import QRCode from "react-qr-code";

function Welcome() {
  return (
    <div className="grid grid-cols-3 gap-4 bg-fuchsia-300 content-center ">
      <div className="col-span-2 h-screen flex">
        <div className="m-auto">
          <h1 className="text-9xl font-sans mb-10">quickshare</h1>
          <h2 className="mt-10">
            The easiest to share text between two devices
          </h2>
        </div>
      </div>
      <div className="m-auto">
        <button
          type="button"
          className="text-black bg-white hover:ring-2 focus:ring-blue-300 font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800"
        >
          Create
        </button>
        <div>

        </div>
        <QRCode value="https://quickshare.com/" size={300} />
      </div>
    </div>
  );
}

export default Welcome;
