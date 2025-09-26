import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenForm from "./components/ShortenForm";
import LinksList from "./components/LinksList";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Main Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="container">
                <h1>Simple URL Shortener</h1>
                <p className="sub">
                  Create short links and test client-side redirection.
                </p>
                <ShortenForm />
                <LinksList />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
