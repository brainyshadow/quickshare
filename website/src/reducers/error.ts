import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorType: "",
  errorMessage: "",
};

export const slice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorType = action.payload.errorType;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { setError } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectError = (state) => state.counter;

export default slice.reducer;
