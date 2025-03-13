"use client";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./_utils/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./_utils/LoadingScreen";
function App() {
  // Use this state to determine if the component is mounted in the browser
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect will only run in the browser
    setIsMounted(true);
  }, []);

  // Render nothing or a loading screen until the component is mounted in the browser
  if (!isMounted) {
    return <LoadingScreen />;
  }

  // Once mounted in the browser, render the full app with React Router
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
