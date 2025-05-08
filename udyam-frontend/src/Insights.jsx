function Insights({ data, onSummaryGenerated }) {
    if (!data.length) return null;
  
    const clusters = {};
  
    data.forEach((place) => {
      const { cluster, rating, user_ratings_total } = place;
      if (!clusters[cluster]) {
        clusters[cluster] = {
          places: [],
          totalRating: 0,
          totalReviews: 0,
        };
      }
  
      clusters[cluster].places.push(place);
      if (rating !== null && rating !== undefined) {
        clusters[cluster].totalRating += rating;
        clusters[cluster].totalReviews += user_ratings_total ?? 0;
      }
    });
  
    const summary = Object.entries(clusters).map(([clusterId, info]) => {
      const count = info.places.length;
      const avgRating = (info.totalRating / count).toFixed(2);
      const totalReviews = info.totalReviews;
  
      const label =
        count <= 3
          ? "Low saturation"
          : count <= 6
          ? "Moderate competition"
          : "Highly competitive";
  
      // Area extraction logic
      const areaCounts = {};
      info.places.forEach((p) => {
        const parts = p.address?.split(",") ?? [];
        const area = parts[2]?.trim() || parts[1]?.trim() || parts[0]?.trim() || "Unknown Area";
        areaCounts[area] = (areaCounts[area] || 0) + 1;
      });
      const mostCommonArea = Object.entries(areaCounts).sort((a, b) => b[1] - a[1])[0][0];
  
      // Recommendation logic
      let recommendation = "";
      if (count <= 3 && totalReviews > 100) {
        recommendation = "💡 High potential – Underserved but active audience.";
      } else if (count > 6 && avgRating < 3.8) {
        recommendation = "⚠️ Crowded market with poor ratings – Enter with a differentiated strategy.";
      } else if (count > 6 && avgRating >= 4.2) {
        recommendation = "🔥 Highly competitive area – Only enter if you’re exceptional.";
      } else {
        recommendation = "🟡 Balanced zone – Test with a small footprint.";
      }
  
      return {
        area: mostCommonArea,
        count,
        avgRating,
        label,
        recommendation,
      };
    });
  
    // Pass data to parent
    if (onSummaryGenerated) onSummaryGenerated(summary);
  
    return (
      <div style={{ marginTop: "2rem" }}>
        <h2>Area Insights</h2>
        <ul>
          {summary.map((item) => (
            <li key={item.area} style={{ marginBottom: "1rem" }}>
              <strong>Area: {item.area}</strong><br />
              🏪 Businesses: {item.count}<br />
              ⭐ Avg Rating: {item.avgRating}<br />
              📊 Market Status: {item.label}<br />
              💬 <em>{item.recommendation}</em>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Insights;
  