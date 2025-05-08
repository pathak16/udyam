function Results({ data }) {
    if (!data || !data.length) return <p>No results yet.</p>;
    console.log("Results data:", data);
    return (
      <ul>
        {data.map((point, i) => (
          <li key={i} style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
            {/* <p>{point}</p> */}
            <strong>{point.name || "Unnamed Place"}</strong><br />
            📍 {point.address || "Address not available"}<br />
            ⭐ {point.rating ?? "N/A"} ({point.user_ratings_total ?? 0} reviews)<br />
            🧠 Cluster: {point.cluster}<br />
            <a
              href={point.map_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              Get Directions
            </a>
          </li>
        ))}
      </ul>
    );
  }
  
  export default Results;
  