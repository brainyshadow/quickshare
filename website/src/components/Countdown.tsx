import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../reducers/error";

interface props {
  expiryTime: any;
}

function Countdown(props: props) {
  let navigate = useNavigate();
  const { expiryTime } = props;
  const dispatch = useDispatch();
  const [secondsLeft, setSecondsLeft] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof expiryTime === "number") {
        setSecondsLeft(expiryTime - Date.now() / 1000);
      }
      if (secondsLeft < 1 && secondsLeft !== null) {
        dispatch(
          setError({
            errorType: "warning",
            errorMessage: "The document you were trying to access has expired",
          })
        );
        navigate("/welcome");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="flex bg-white font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800 lg:w-full mb-1 rounded-md">
      <div className="m-auto">
        <h2>
          {secondsLeft === 0
            ? ""
            : Math.round(secondsLeft / 60) <= 1
            ? `${Math.round(secondsLeft / 60)} minutes and ${
                Math.round(secondsLeft) - Math.round(secondsLeft / 60)
              } seconds left`
            : Math.round(secondsLeft / 60) + ` minutes until expiry`}
        </h2>
      </div>
    </div>
  );
}

export default Countdown;
