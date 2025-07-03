import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";

function NativeAd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27068108.profitableratecpm.com/3f6410faeea12eaa2856eaaed15f74a5/invoke.js";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-3f6410faeea12eaa2856eaaed15f74a5"></div>;
}

function App() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/music?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setTracks(data);
      } else {
        setError(data.error || "Failed to fetch tracks");
      }
    } catch (err) {
      setError("Error fetching data");
    }
    setLoading(false);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <img src={logo} alt="RiftraAI Logo" className="app-logo" />
          <h1 className="app-title">RiftraAI</h1>
        </div>
        <form onSubmit={handleSearch} className="search-form-header">
          <input
            type="text"
            placeholder="Search for free music..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input-header"
          />
          <button
            type="submit"
            disabled={loading}
            className="search-button-header"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </header>

      <div className="content-area">
        <section className="tracks-list">
          {error && <div className="error-message">{error}</div>}

          {tracks.length === 0 && !loading && (
            <p>No results yet. Try searching!</p>
          )}

          {tracks.map((track) => (
            <div key={track.id} className="track-item">
              <div>
                <strong>{track.title}</strong> by {track.artist}
              </div>
              <audio controls src={track.audio_url} preload="none" />
              <div className="track-links">
                <a href={track.url} target="_blank" rel="noopener noreferrer">
                  More info
                </a>
                {" | "}
                <a href={track.audio_url} download>
                  Download
                </a>
              </div>
            </div>
          ))}
        </section>

        <aside className="ad-spot">
          <NativeAd />
        </aside>
      </div>

      <footer className="app-footer">
        &copy; {new Date().getFullYear()} RiftraAI. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
