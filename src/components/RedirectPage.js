import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { findOriginalUrl } from "../utils";

export default function RedirectPage() {
  const { code } = useParams();
  const [status, setStatus] = useState("Checking link...");

  useEffect(() => {
    const original = findOriginalUrl(code);
    if (original) {
      setStatus("Redirecting...");
      // short delay so user sees a message
      const t = setTimeout(() => (window.location.href = original), 800);
      return () => clearTimeout(t);
    } else {
      setStatus("Not found");
    }
  }, [code]);

  return (
    <div className="container">
      <h2>{status}</h2>
      {status === "Not found" && (
        <>
          <p>This short link does not exist or has been removed.</p>
          <p>
            <Link to="/">Return home</Link>
          </p>
        </>
      )}
    </div>
  );
}
