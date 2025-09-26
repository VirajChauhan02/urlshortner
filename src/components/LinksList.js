import React, { useEffect, useState } from "react";
import { getAllLinks, deleteLink } from "../utils";
import "/src/styles.css";

export default function LinksList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(getAllLinks());
    // listen to storage changes if user opens multiple tabs
    const onStorage = () => setLinks(getAllLinks());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleDelete = (code) => {
    if (!confirm("Delete this short link?")) return;
    deleteLink(code);
    setLinks(getAllLinks());
  };

  const handleCopy = (short) => navigator.clipboard.writeText(short);

  return (
    <div className="card">
      <h3>Your shortened links</h3>
      {links.length > 0 && (
        <ul className="links">
          {links.map((l) => (
            <li key={l.code}>
              <div className="orig">
                <a href={l.url} target="_blank" rel="noreferrer">
                  {l.url}
                </a>
              </div>
              <div className="short">
                <a href={l.shortUrl} target="_blank" rel="noreferrer">
                  {l.shortUrl}
                </a>
              </div>
              <div className="actions">
                <button onClick={() => handleCopy(l.shortUrl)}>Copy</button>
                <button className="danger" onClick={() => handleDelete(l.code)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
