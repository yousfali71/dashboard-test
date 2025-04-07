"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const res: UserCredential | undefined =
        await createUserWithEmailAndPassword(email, password);

      if (res) {
        console.log({ user: res.user });
        localStorage.setItem("isAuthenticated", "true");
        setEmail("");
        setPassword("");
        router.push("/"); // Redirect after successful signup
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>

        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-500">
            {error.message.includes("weak-password")
              ? "Password should be at least 6 characters"
              : error.message.includes("email-already-in-use")
              ? "Email already exists"
              : "Signup failed. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
