import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Default map container style
const containerStyle = {
  width: "100%",
  height: "800px",
};

// Default center location (initial map view)
const defaultCenter = {
  lat: 5.0106246, // Example latitude
  lng: 7.9532325, // Example longitude
};

interface MapComponentProps {
  lat: number;
  lng: number;
  address: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, address }) => {
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAcp_C3w1_jDg2YZVv86mJ23cq_oPvQj1I",
  });

  // Track the center of the map
  const [mapCenter, setMapCenter] = useState({ lat, lng });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log('lat', lat)
  console.log('lng', lng)

  return (
    <div>
      <h3 className="text-lg font-bold">{address}</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={45} // Adjust zoom level as needed
      >
        {/* Add a marker at the specified location */}
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
