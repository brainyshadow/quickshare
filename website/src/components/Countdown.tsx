import { useEffect, useState } from "react";

interface props {
  expiryTime: any;
}

function Countdown(props: props) {
  const { expiryTime } = props;
  console.log(expiryTime);
  const [secondsLeft, setSecondsLeft] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof expiryTime === "number") {
        setSecondsLeft(expiryTime - Date.now() / 1000);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const minutesLeft = 10;
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
