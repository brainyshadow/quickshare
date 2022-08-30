import React from "react";
import logo from "./logo.svg";
import QRCode from "react-qr-code";

function Welcome() {
  return (
    <div className="xl:grid xl:grid-cols-3 xl:gap-4 xl:content-center bg-fuchsia-300 ">
      <div className="col-span-2 h-screen flex">
        <div className="m-auto">
          <h1 className="text-9xl font-sans mb-10">quickshare</h1>
          <h2 className="mt-10">
            The easiest to share text between two devices
          </h2>
        </div>
      </div>
      <div className="grid h-screen place-items-center">
        <div className="grid grid-rows-6">
          <div className="w-full">
            <button
              type="button"
              className="text-black bg-white hover:ring-2 font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800 w-full"
            >
              Create
            </button>
          </div>
          <div className="row-span-5">
            <QRCode value="https://quickshare.com/" size={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
