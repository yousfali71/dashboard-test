
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { AppDispatch } from "../../store";
import { loginStart, loginSuccess, loginFailure, logout } from "./authSlice";

export const loginWithGoogle = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loginStart());
    const result = await signInWithPopup(auth, googleProvider);
    dispatch(loginSuccess(result.user));
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
    if (typeof window !== "undefined") {
      localStorage.removeItem("firebaseAuth");
    }
  } catch (error: any) {
    console.error("Logout error:", error);
  }
};
