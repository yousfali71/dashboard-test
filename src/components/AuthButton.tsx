// // components/AuthButton.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AuthButton() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     // Check auth state from localStorage or cookies
//     const authState = localStorage.getItem("isAuthenticated");
//     setIsAuthenticated(authState === "true");
//     setIsLoading(false);
//   }, []);

//   const handleAuth = () => {
//     if (isAuthenticated) {
//       // Logout logic
//       localStorage.removeItem("isAuthenticated");
//       setIsAuthenticated(false);
//     } else {
//       // Login logic
//       localStorage.setItem("isAuthenticated", "true");
//       setIsAuthenticated(true);
//       router.push("/dashboard");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="px-6 py-3 bg-gray-200 text-gray-200 rounded-lg animate-pulse">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <button
//       onClick={handleAuth}
//       className={`px-6 py-3 text-white font-medium rounded-lg shadow-md transition-colors ${
//         isAuthenticated
//           ? "bg-red-600 hover:bg-red-700"
//           : "bg-indigo-600 hover:bg-indigo-700"
//       }`}
//     >
//       {isAuthenticated ? "Sign Out" : "Sign In"}
//     </button>
//   );
// }
