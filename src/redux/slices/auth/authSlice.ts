// lib/features/auth/authSlice.ts
import { AuthUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Load initial state from localStorage
const loadInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    };
  }

  const savedAuth = localStorage.getItem("firebaseAuth");
  return savedAuth
    ? JSON.parse(savedAuth)
    : {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

// Save to localStorage on state changes
export const saveAuthState = (state: AuthState) => {
  if (typeof window !== "undefined") {
    console.log(state.user?.email);
    localStorage.setItem(
      "firebaseAuth",
      JSON.stringify({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
      })
    );
  }
};

export default authSlice.reducer;
