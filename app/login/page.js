"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/app/_utils/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/app/_utils/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const { currentUser } = useAuth();
  const router = useRouter();

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      // Wait briefly to ensure auth state is properly determined
      if (currentUser === undefined) return;

      if (currentUser) {
        // User is logged in, check their role before redirect
        try {
          const userDocRef = doc(db, "Accounts", currentUser.email);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().Admin) {
            router.push("/admin");
          } else {
            router.push("/inventory");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          router.push("/inventory"); // Default to inventory on error
        }
      } else {
        // User is not logged in, stay on login page
        setAuthChecking(false);
      }
    };

    checkAuth();
  }, [currentUser, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Login with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check user role in Firestore
      const userDocRef = doc(db, "Accounts", user.email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Redirect based on role
        if (userData.Admin) {
          router.push("/admin"); // Use absolute path
        } else {
          router.push("/inventory"); // Use absolute path
        }
      } else {
        // No user document, treat as regular user
        router.push("/inventory"); // Use absolute path
      }
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Login error:", error);
      setLoading(false); // Only set loading to false on error
    }
  };

  // Show loading spinner while checking auth status
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="w-5 h-5 mr-2 border-t-2 border-r-2 border-white rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
