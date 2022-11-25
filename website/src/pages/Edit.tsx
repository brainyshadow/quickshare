import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import TextEditor from "../components/TextEditor";
import { FiShare } from "react-icons/fi";
import { EditorState, convertToRaw } from "draft-js";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setError } from "../reducers/error";
import Countdown from "../components/Countdown";
import { stateToHTML } from "draft-js-export-html";
import * as DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

async function fetchWithTimeout(resource) {
  const timeout = 8000;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

function Edit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [docId, setDocId] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);

  async function clearDoc() {
    await updateDoc(doc(db, process.env.REACT_APP_enviroment, docId), {
      data: "",
    });
  }

  useEffect(() => {
    const html = DOMPurify.sanitize(
      stateToHTML(editorState.getCurrentContent())
    );
    const interval = setInterval(() => {
      if (docId !== "" && html.length < 5000) {
        updateDoc(doc(db, process.env.REACT_APP_enviroment, docId), {
          data: html,
        });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [editorState]);

  useEffect(() => {
    if (docId !== "") {
      let firestoreDoc = doc(db, process.env.REACT_APP_enviroment, docId);
      getDoc(firestoreDoc).then((docSnap) => {
        setExpiryTime(docSnap.data()?.expiryTime?.seconds);
      });
    }
  }, [docId]);

  useEffect(() => {
    fetchWithTimeout(
      process.env.REACT_APP_enviroment === "prod"
        ? "https://us-central1-quickshare-64fbe.cloudfunctions.net/createDocument"
        : "http://localhost:5001/quickshare-64fbe/us-central1/createDocument"
    )
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        if (response.status !== 200) {
          dispatch(
            setError({
              errorType: "warning",
              errorMessage: "There was an error creating your document",
            })
          );
          navigate("/welcome");
        } else {
          return response.text();
        }
      })
      .then((data) => setDocId(data))
      .catch(() => {
        dispatch(
          setError({
            errorType: "warning",
            errorMessage: "There was an error creating your document",
          })
        );
        navigate("/welcome");
      });
  }, []);

  const share = () => {
    navigator
      .share({
        title: document.title,
        text: "Check this out",
        url: "https://quick-share.net/view/" + docId,
      })
      .then(() => console.log("Successful share! 🎉"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:gap-4 lg:content-center h-screen bg-fuchsia-300 z-0">
      <div className="col-span-2 lg:h-screen flex">
        <div className="m-auto w-1/2">
          <h2 className="mt-10">
            Start Typing and when your ready, share it
            <br />
            <TextEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </h2>
        </div>
      </div>
      <div className="lg:grid lg:h-screen place-items-center mt-3">
        <div className="lg:grid lg:grid-rows-6 m-auto">
          <div className="m-auto w-[300px]">
            <Countdown expiryTime={expiryTime} clearDoc={clearDoc} />
          </div>
          <div className="lg:row-span-5">
            <QRCode
              className="m-auto"
              value={`https://quick-share.net/view/${docId}`}
              size={300}
            />
          </div>
          <div className="lg:w-full my-2 flex">
            <div className="m-auto w-[300px]">
              <button
                type="button"
                className="w-[300px] flex bg-white hover:ring-2 font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800 lg:w-full"
                onClick={share}
              >
                <div className="mx-auto flex">
                  <p className="mx-1">Share </p>
                  <FiShare className="scale-125 stroke-black mx-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
