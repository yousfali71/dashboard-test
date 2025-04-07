
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { saveAuthState } from "./slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  const { auth } = store.getState();
  saveAuthState(auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
