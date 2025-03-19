import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Default map container style
const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MapComponentProps {
  lat: number;
  lng: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
  // Load the Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  // Track the center of the map
  const [mapCenter, setMapCenter] = useState({ lat, lng });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isNaN(lat) || isNaN(lng) ? (
        <div className="border p-5 rounded-xl">
          <p className="text-center text-sm text-gray-400">Can't generate Google map</p>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={45} // Adjust zoom level as needed
        >
          {/* Add a marker at the specified location */}
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapComponent;
