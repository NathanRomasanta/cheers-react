"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "/app/_utils/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "/app/_utils/AuthContext";
import { useRouter } from "next/navigation";
import { ShieldX } from "lucide-react";
import { LogOut } from "lucide-react";

import { getAuth, signOut } from "firebase/auth";
export default function AccessDenied() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const { currentUser } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <button
            name="signout"
            onClick={handleSignOut}
            className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
