import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setError,
  selectError,
} from "../reducers/error";

function Test() {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(setError({errorType: "warning - ", errorMessage: "Tetsatdasd -"}))}
        >
          -
        </button>
        <span>{error.errorType}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(setError({errorType: "warning +", errorMessage: "Tetsatdasd +"}))}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Test;
