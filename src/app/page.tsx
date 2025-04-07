"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    setIsAuthenticated(!!user);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authUser");
      setIsAuthenticated(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push("/admin")}
                  className="px-6 py-3 bg-indigo-600 text-white cursor-pointer font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors"
                >
                  See The Analytics
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-red-600 text-white cursor-pointer font-medium rounded-lg shadow hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/sign-in")}
                  className="px-6 py-3 bg-indigo-600 text-white cursor-pointer font-medium rounded-lg shadow hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="px-6 py-3 border border-gray-300 cursor-pointer text-gray-700 font-medium rounded-lg shadow hover:bg-gray-50 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Total Users", value: "1,234", change: "+12%" },
              { name: "Active Projects", value: "56", change: "+5" },
              { name: "Completion Rate", value: "89%", change: "+3%" },
            ].map((stat) => (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg p-6"
              >
                <h3 className="text-sm font-medium text-gray-500">
                  {stat.name}
                </h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-green-600">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
