import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

function ClusterMap({ data }) {
  if (!data.length) return <p>No map data available.</p>;

  // Custom marker icon to fix default Leaflet icon issue
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={[18.5204, 73.8567]} // Centered on Pune
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '500px', width: '100%', marginTop: '1rem' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {data.map((point, i) => (
        <Marker
          key={i}
          position={[point.lat, point.lng]}
        >
          <Popup>
            Cluster: {point.cluster}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ClusterMap;
