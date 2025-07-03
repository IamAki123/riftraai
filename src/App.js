import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";

function Home() {
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
          {/* Replace with actual ad code */}
          <div className="ad-placeholder">Your Ad Here</div>
        </aside>
      </div>

      <footer className="app-footer">
        &copy; {new Date().getFullYear()} RiftraAI. All rights reserved.{" "}
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h2>Privacy Policy</h2>
      <p>
        {/* Paste your full privacy policy here */}
        This Privacy Policy explains how RiftraAI collects, uses, and protects your information. 
        For questions, contact us at <a href="mailto:akashvijayaradhya@gmail.com">akashvijayaradhya@gmail.com</a>.
      </p>
      {/* Add the rest of your privacy policy here */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
