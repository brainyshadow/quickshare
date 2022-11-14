import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { FiShare } from "react-icons/fi";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setError, selectError } from "../reducers/error";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";
import * as DOMPurify from "dompurify";

function View() {
  let navigate = useNavigate();
  const [data, setData] = useState(" ");
  const [expiryTime, setExpiryTime] = useState(null);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const { docId } = useParams();
  let firestoreDoc = doc(db, process.env.REACT_APP_enviroment, docId);

  async function clearDoc() {
    await updateDoc(firestoreDoc, {
      data: "",
    });
  }

  const unsub = onSnapshot(firestoreDoc, (doc) => {
    if (doc.data()?.data === undefined) {
      dispatch(
        setError({ errorType: "warning", errorMessage: "There was an error" })
      );
      navigate("/welcome");
    }
    if (doc.data()?.expiryTime?.seconds < new Date().valueOf() / 1000) {
      console.log("Expired");
      dispatch(
        setError({
          errorType: "warning",
          errorMessage: "The document you were trying to access has expired",
        })
      );
      navigate("/welcome");
    }
    setData(DOMPurify.sanitize(doc.data()?.data));
    setExpiryTime(doc.data()?.expiryTime?.seconds);
  });
  useEffect(() => {
    return () => {
      unsub();
    };
  }, []);

  const share = () => {
    navigator
      .share({
        title: document.title,
        text: "Check this out",
        url: window.location.href,
      })
      .then(() => console.log("Successful share! 🎉"))
      .catch((err) => console.error(err));
  };

  const errorType = error.errorType;

  return errorType !== "" ? (
    <div className="flex h-screen">
      <Loading />
    </div>
  ) : (
    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:content-center h-screen bg-fuchsia-300">
      <div className="col-span-2 lg:h-screen flex break-words">
        <div
          className="m-auto w-1/2 min-h-[24px] bg-fuchsia-200 border border-black"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
      <div className="lg:grid lg:h-screen lg:place-items-center mt-3">
        <div className="lg:grid lg:grid-rows-6 m-auto">
          <Countdown expiryTime={expiryTime} clearDoc={clearDoc} />
          <div className="lg:row-span-5">
            <QRCode value="https://quick-share.net/" size={300} />
          </div>
          <div className="lg:w-full my-2 flex">
            <div className="m-auto">
              <button
                type="button"
                className="flex bg-white hover:ring-2 font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800 lg:w-full"
                onClick={share}
              >
                <div className="mx-auto flex">
                  <p className="mx-1">Share</p>
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

export default View;
