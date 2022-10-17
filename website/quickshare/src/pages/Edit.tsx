import React from "react";
import QRCode from "react-qr-code";
import TextEditor from "../components/TextEditor";
import { FiShare } from "react-icons/fi";

function Edit() {
  const share = () => {
    navigator
      .share({
        title: document.title,
        text: "Hello World",
        url: window.location.href,
      })
      .then(() => console.log("Successful share! 🎉"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:content-center h-screen bg-fuchsia-300">
      <div className="col-span-2 lg:h-screen flex">
        <div className="m-auto">
          <h2 className="mt-10">
            Start Typing and when your ready, share it
            <br />
            <TextEditor />
          </h2>
        </div>
      </div>
      <div className="lg:grid lg:h-screen lg:place-items-center">
        <div className="lg:grid lg:grid-rows-6 ">
          <div className="lg:row-span-5">
            <QRCode value="https://quickshare.com/" size={300} />
          </div>
          <div className="m-auto scale-150 rounded-md bg-slate-50">
            <button onClick={share} className="flex flex-row p-1">
              <p className="mx-1">Share </p>
              <FiShare className="scale-125 stroke-black mx-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
