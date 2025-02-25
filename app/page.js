"use client";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./_utils/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
