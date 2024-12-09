import { useState } from "react";

export default function AddressSearch() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");

  const fetchCoordinates = async () => {
    try {
      if (!address) {
        setError("Please enter a valid address");
        return;
      }

      const apiKey = "AIzaSyBB32N6G4eSkIPwf5XV01n6mkLoXCHJCQQ";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setCoordinates({ lat: location.lat, lng: location.lng });
        setError("");
      } else {
        setError(`Geocoding failed: ${data.status}`);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching coordinates");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCoordinates();
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Coordinates
        </button>
      </form>

      {coordinates.lat && coordinates.lng && (
        <div className="mt-4">
          <h3 className="font-semibold">Coordinates:</h3>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
