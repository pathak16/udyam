import { useState } from 'react';
import SearchForm from './SearchForm';
import Results from './Results';
import ClusterMap from './clustermap';
import Insights from './Insights';
import ChatBox from './ChatBox.jsx';
import "./App.css"; // Assuming you have some styles in App.css


function App() {
  const [results, setResults] = useState([]);
  const [insights, setInsights] = useState([]);
  const [clusteredData, setClusteredData] = useState([]);
  
  

      {/* <div className='header'>
        {/* <img src="/logo.png" alt="Udyam.AI Logo" className='logo' /> */}
        {/* <h1>Udyam.AI</h1>
        <p className='tagline'>Empowering Small Businesses with AI</p> */}
      {/* </div> */} 
        

        return (

              <div className="app-wrapper">

  <div style={{
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#121212",
    color: "#fff",
    padding: "2rem"
  }}>
    <h1 style={{ fontSize: "2.5rem", color: "#ff3c3c", marginBottom: "0.5rem" }}>Udyam.AI</h1>
    <p style={{ fontSize: "1rem", color: "#aaa", marginBottom: "2rem", textAlign: "center", maxWidth: "500px" }}>
      Discover high-potential business zones with AI-powered insights.
    </p>

    <div style={{
      backgroundColor: "#000",
      padding: "1rem 2rem",
      borderRadius: "10px",
      maxWidth: "600px",
      width: "100%",
      textAlign: "center",
      marginBottom: "2rem"
    }}>
      <p style={{ marginBottom: "1rem", fontSize: "0.95rem", color: "#ccc" }}>
        Enter your business type and location to explore insights powered by Udyam.AI
      </p>
      <SearchForm onSearch={setResults} onCluster={setClusteredData} />
    </div>

    <div style={{ width: "100%", maxWidth: "700px", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Insights</h2>
      <p style={{ fontSize: "0.95rem", color: "#bbb", marginBottom: "1.5rem" }}>
        Click below to generate insights based on search results.
      </p>
      <Insights data={results} onSummaryGenerated={setInsights} />
    </div>
  </div>
  </div>
);

      
}

export default App;
