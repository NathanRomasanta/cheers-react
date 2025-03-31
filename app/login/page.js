"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "/app/_utils/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "/app/_utils/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Redirect based on role
            if (userData.accountType === "Super Admin") {
              router.push("/admin");
            } else if (userData.accountType === "Cashout Admin") {
              router.push("/cashout");
            } else if (userData.accountType === "Inventory Admin") {
              router.push("/inventory");
            } else {
              router.push("/denied");
            }
          } else {
            // No user document, treat as regular user
            router.push("/denied"); // Use absolute path
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          router.push("/denied"); // Default to 404 on error
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
        if (userData.accountType === "Super Admin") {
          router.push("/admin"); // Use absolute path
        } else if (userData.accountType === "Cashout Admin") {
          router.push("/cashout");
        } else if (userData.accountType === "Inventory Admin") {
          router.push("/inventory");
        } else {
          router.push("/denied"); // Use absolute path
        }
      } else {
        // No user document, treat as regular user
        router.push("/denied"); // Use absolute path
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
    <div className="flex h-screen">
      <div className="relative flex-1">
        <Image
          src="/images/stampede.png"
          alt="Your image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex-1 p-8 flex items-center justify-start bg-white">
        <div>
          <div className="w-max space-y-8  p-16">
            <div>
              <h2 className="mt-6 text-4xl font-bold text-gray-900">
                Welcome to Cheers!
              </h2>
              <label className="text-gray-400 text-xl font-bold">
                Login to your Account
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>
            )}

            <form className="mt-8  space-y-9" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email-address" className=" text-black">
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
                    className="appearance-none relative block w-[500px] px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email-address" className=" text-black">
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
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="w-5 h-5 mr-2 border-t-2 border-r-2 border-white rounded-full animate-spin"></span>
                      Logging In...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
