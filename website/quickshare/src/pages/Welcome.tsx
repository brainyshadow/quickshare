import React from "react";
import logo from "./logo.svg";
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";

function Welcome() {
  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:content-center h-screen bg-fuchsia-300 ">
      <div className="col-span-2 lg:h-screen flex">
        <div className="m-auto">
          <h1 className="md:text-9xl text-8xl font-sans mb-10">quickshare</h1>
          <h2 className="mt-10">
            The easiest to share formatted text between two devices.
            <br />
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://github.com/brainyshadow/quickshare"
            >
              Open source
            </a>
            . Simple. Easy.
          </h2>
        </div>
      </div>
      <div className="lg:grid lg:h-screen lg:place-items-center">
        <div className="lg:grid lg:grid-rows-6 ">
          <div className="lg:row-span-5">
            <QRCode value="https://quickshare.com/" size={300} />
          </div>
          <div className="lg:w-full my-1">
            <a href="/edit">
              <button
                type="button"
                className="text-black bg-white hover:ring-2 font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800 lg:w-full"
              >
                Create
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
