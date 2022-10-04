import React from "react";
import QRCode from "react-qr-code";
import TextEditor from "../components/TextEditor";

function Edit() {
  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:content-center h-screen bg-fuchsia-300 ">
      <div className="col-span-2 lg:h-screen flex">
        <div className="m-auto">
          <h2 className="mt-10">
            Start Typing and when your ready, share it
            <br />
            <TextEditor/>
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
          <div className="lg:w-full">
            <a href="/edit">
              <button
                type="button"
                className="text-black bg-white hover:ring-2 font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800 lg:w-full"
              >
                Create
              </button>
            </a>
          </div>
          <div className="lg:row-span-5">
            <QRCode value="https://quickshare.com/" size={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
