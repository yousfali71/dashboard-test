"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loginSuccess, logout } from "@/redux/slices/auth/authSlice";

export function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        store.dispatch(
          loginSuccess({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          })
        );
      } else {
        store.dispatch(logout());
      }
    });
    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
