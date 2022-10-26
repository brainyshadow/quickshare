import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorType: "warning",
  errorMessage: "Document fetching failed",
};

export const slice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setError: (state, action) => {
      console.log(action.payload);
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
