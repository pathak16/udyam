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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Business Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
