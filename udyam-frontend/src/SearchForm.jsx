import { useState } from 'react';

function SearchForm({ onSearch, onCluster }) {
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/fetch_places?business_type=${type}&location=${location}`);
    const data = await res.json();
    onSearch(data.places);

    const coords = data.places.map((place) => ({
      lat: place.lat,
      lng: place.lng,
    }));

    const clusterRes = await fetch('http://localhost:8000/cluster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coords),
    });

    const clusterData = await clusterRes.json();
    onCluster(clusterData.clusters);
    console.log("Fetched places:", data.places);

  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
  <input
    type="text"
    placeholder="Business Type (e.g., cafe)"
    value={type}
    onChange={(e) => setType(e.target.value)}
    required
    style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
  />
  <input
    type="text"
    placeholder="Location (e.g., Baner)"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    required
    style={{ flex: 1, padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}
  />
  <button
    type="submit"
    style={{
      padding: "0.5rem 1rem",
      backgroundColor: "#2a7ade",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Search
  </button>
</form>

  );
}

export default SearchForm;
