import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { FiShare } from "react-icons/fi";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setError, selectError } from "../reducers/error";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function View() {
  let navigate = useNavigate();
  const [data, setData] = useState(" ");

  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const { docId } = useParams();
  let firestoreDoc = doc(db, "prod", docId);
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
        setError({ errorType: "warning", errorMessage: "The document you were trying to access has expired" })
      );
      navigate("/welcome");
    }
    setData(doc.data()?.data);
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
  const errorMessage = error.errorMessage;

  return errorType !== "" ? (
    <div className="flex h-screen">
      <Loading />
    </div>
  ) : (
    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:content-center h-screen bg-fuchsia-300">
      <div className="col-span-2 lg:h-screen flex">
        <div className="m-auto w-1/2 min-h-[24px] bg-fuchsia-200 border border-black">
          {data}
        </div>
      </div>
      <div className="lg:grid lg:h-screen lg:place-items-center">
        <div className="lg:grid lg:grid-rows-6 ">
          <div className="lg:row-span-5">
            <QRCode value="https://quick-share.net/" size={300} />
          </div>
          <div className="lg:w-full my-1">
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
  );
}

export default View;
