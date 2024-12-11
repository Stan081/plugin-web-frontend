import MapComponent from "@/components/Map";
import { useState } from "react";

export default function AddressSearch() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [formattedAddress, setFormattedAddress] = useState("");
  const [error, setError] = useState("");

  const fetchCoordinates = async () => {
    try {
      if (!address) {
        setError("Please enter a valid address");
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setCoordinates({ lat: location.lat, lng: location.lng });
        setFormattedAddress(data?.results[0].formatted_address);
        extractAddressDetails(data.results[0]);
        setError("");
      } else {
        setError(`Geocoding failed: ${data.status}`);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching coordinates");
    }
  };

  function extractAddressDetails(result) {
    if (!result || !result.address_components) {
      return null;
    }

    const components = result.address_components;

    const getComponent = (type) =>
      components.find((component) => component.types.includes(type)) || {};

    const addressDetails = {
      address: result.formatted_address || "",
      city: getComponent("locality").long_name || "",
      state: getComponent("administrative_area_level_1").long_name || "",
      country: getComponent("country").long_name || "",
      postalCode: getComponent("postal_code").long_name || "",
    };

    console.log(addressDetails);

    return addressDetails;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCoordinates();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
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

      {(coordinates.lat as number) && coordinates.lng && (
        <div className="mt-4">
          <h3 className="font-semibold">Coordinates:</h3>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}

      {formattedAddress && <p className="mt-5">{formattedAddress}</p>}

      {error && (
        <div className="mt-4 text-red-600">
          <p>{error}</p>
        </div>
      )}

      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Location Viewer</h1>
        <MapComponent
          lat={Number(coordinates.lat)}
          lng={Number(coordinates.lng)}
          address={formattedAddress}
        />
      </div>
    </div>
  );
}
