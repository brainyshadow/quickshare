import QRCode from "react-qr-code";
import { useEffect } from "react";
import Error from "../components/Error";
import { useSelector, useDispatch } from "react-redux";
import { setError, selectError } from "../reducers/error";

function Welcome() {
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(error);
    setTimeout(
      () => dispatch(setError({ errorType: "", errorMessage: "" })),
      5000
    );
  }, [error]);

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 lg:gap-4 lg:content-center h-screen bg-fuchsia-300 z-0">
      {error.errorMessage !== "" && (
        <Error
          errorTitle={error.errorTitle}
          errorMessage={error.errorMessage}
        />
      )}
      <div className="lg:col-span-2 lg:h-screen flex">
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
      <div>
        <div className="lg:grid lg:h-screen lg:place-items-center">
          <div className="lg:grid lg:grid-rows-6 ">
            <div className="lg:row-span-4">
              <QRCode
                className="mx-auto"
                value="https://quick-share.net/"
                size={300}
              />
            </div>
            <div className="mt-2 flex">
              <div className="m-auto w-[300px]">
                <a href="/edit" className="">
                  <button
                    type="button"
                    className="w-[300px] text-black bg-white hover:ring-2 font-medium rounded-md text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800 lg:w-full"
                  >
                    Create
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
