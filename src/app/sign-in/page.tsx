"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/slices/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => router.push("/admin"))
      .catch((err) => console.error("Login failed:", err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-white text-2xl mb-6 text-center">Sign In</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 bg-gray-700 rounded text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {error && (
          <div className="mb-4">
            <p className="text-gray-300 text-sm mt-4 text-center">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-blue-400 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
