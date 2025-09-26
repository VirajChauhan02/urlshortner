import React, { useState } from "react";
import { saveShortLink, buildShortUrl } from "../utils";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    let original = url.trim();
    if (!original) return setError("Please enter a URL.");

    // Ensure protocol
    if (!/^https?:\/\//i.test(original)) original = "https://" + original;

    try {
      // validate
      new URL(original);
    } catch {
      return setError("Invalid URL. Include a valid domain, e.g. example.com");
    }

    const { code } = saveShortLink(original);
    const shortUrl = buildShortUrl(code);
    setResult({ code, shortUrl });
    setUrl("");
  };

  return (
    <div className="card">
      <form onSubmit={onSubmit}>
        <label>Paste URL to shorten</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/path"
        />
        <div className="row">
          <button type="submit">Shorten</button>
          <button
            type="button"
            className="muted"
            onClick={() => {
              setUrl("");
              setError("");
              setResult(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <p>
            Short URL:{" "}
            <a href={result.shortUrl} target="_blank" rel="noreferrer">
              {result.shortUrl}
            </a>
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(result.shortUrl)}
            title="Copy short link"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
