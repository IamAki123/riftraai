export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=9c22528c&format=json&limit=10&namesearch=${encodeURIComponent(q)}&include=musicinfo+licenses&audioformat=mp32`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch from Jamendo" });
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      return res.status(404).json({ error: "No tracks found" });
    }

    const tracks = data.results.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      url: track.shareurl,
      genre: track.musicinfo ? track.musicinfo.genre : "Unknown",
      license: track.license_ccurl,
      audio_url: track.audio,
    }));

    res.status(200).json(tracks);
  } catch (error) {
    console.error("Jamendo fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
