import { useState } from 'react';
import SearchForm from './SearchForm';
import Results from './Results';
import ClusterMap from './clustermap';
import Insights from './Insights';
import ChatBox from './ChatBox.jsx';

function App() {
  const [results, setResults] = useState([]);
  const [insights, setInsights] = useState([]);

  const [clusteredData, setClusteredData] = useState([]);
  
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Udyam.AI Demo</h1>
      <SearchForm onSearch={setResults} onCluster={setClusteredData} />
      <Results data={results} />
      <Insights data={results} onSummaryGenerated={setInsights}/>
      {/*<ChatBox insights={insights} />*/} 

      <h2>Cluster Map</h2>
      <p>Click on the map to see the clusters.</p>
      <p>Clusters are based on the coordinates of the businesses.</p>
      <p>Hover over the markers to see the cluster number.</p>
      <ClusterMap data={clusteredData} />

    </div>
  );
}

export default App;
