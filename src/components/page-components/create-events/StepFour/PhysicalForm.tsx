"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { EventPhysicalLocation } from "@/pages/api/mutate/create-events/eventLocationType";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { Label } from "@/components/ui/label";
import { useGetEvent } from "@/hooks/events/useGetEvent";

interface PhysicalFormProps {
  locationType: string;
}

const PhysicalForm: React.FC<PhysicalFormProps> = ({ locationType }) => {
  const {
    nextStep: next,
    previousStep: previous,
    saveToDraft,
  } = useCreateEventContext();

  const { data: event } = useGetEvent();

  const [address, setAddress] = useState("");
  // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [formattedAddress, setFormattedAddress] = useState({
    plusCode: "",
    address: event?.data?.physicalLocation?.address || "",
    city: event?.data?.physicalLocation?.city || "",
    state: event?.data?.physicalLocation?.state || "",
    country: event?.data?.physicalLocation?.country || "",
    postalCode: event?.data?.physicalLocation?.zipcode || "",
  });
  const [error, setError] = useState("");

  const { toast } = useToast();

  const fetchCoordinates = async () => {
    try {
      if (!address) {
        setError("Please enter a valid address");
        return;
      }

      setIsLoaded(true);

      const apiKey = "AIzaSyAcp_C3w1_jDg2YZVv86mJ23cq_oPvQj1I";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        // setCoordinates({ lat: location.lat, lng: location.lng });
        extractAddressDetails(data.results[0]);
        setError("");
        setIsLoaded(false);
      } else {
        setError(`Geocoding failed: ${data.status}`);
      }
    } catch (err) {
      setIsLoaded(false);
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
      plusCode: getComponent("plus_code").long_name || "",
      address: getComponent("route").long_name || "",
      city: getComponent("locality").long_name || "",
      state: getComponent("administrative_area_level_1").long_name || "",
      country: getComponent("country").long_name || "",
      postalCode: getComponent("postal_code").long_name || "",
    };

    setFormattedAddress(addressDetails);

    return addressDetails;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventPhysicalLocation(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Uploaded Successfully",
          description: `${response?.message}`,
        });
        next();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  const onSubmit = () => {
    const data = {
      locationType,
      physicalLocation: {
        address: `${formattedAddress?.plusCode}, ${formattedAddress?.address}`,
        city: formattedAddress?.city,
        state: formattedAddress?.state,
        country: formattedAddress?.country,
        zipcode: String(formattedAddress?.postalCode) ?? 0,
      },
    };
    mutate(data);
  };

  const handleVerifyAddress = (e) => {
    e.preventDefault();
    fetchCoordinates();
  };

  return (
    <div className="overflow-y-auto h-full">
      <h4 className="font-pally-medium md:text-lg ">Location Address</h4>

      <form
        onSubmit={handleVerifyAddress}
        className="my-4 flex items-center gap-3 lg:gap-6"
      >
        <div className="w-full">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="mt-1  p-2 border bg-white text-black rounded w-full focus:outline-none"
          />
          <p className="font-pally-regular text-sm text-red-400">{error}</p>
        </div>
        <div className="block mt-7">
          <Button
            variant="destructive"
            size="sm"
            type="submit"
            className="h-10 flex items-center justify-center"
          >
            {isLoaded ? <Spinner /> : "Verify address"}
          </Button>
        </div>
      </form>

      <div className="mb-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {formattedAddress?.address && (
          <div className="space-y-2 col-span-2 mt-2">
            <div className="h-15 w-full bg-white text-black p-2 flex items-center text-sm font-pally-regular rounded">
              {formattedAddress?.address}, {formattedAddress?.plusCode}
            </div>
          </div>
        )}
        <div className="space-y-2 col-span-2">
          <p className="text-white font-pally-regular text-sm">City</p>
          <div className="h-10 w-full bg-white text-black p-2 flex items-center text-sm font-pally-regular rounded">
            {formattedAddress?.city}
          </div>
        </div>
        <div className="space-y-2 col-span-2">
          <p className="text-white font-pally-regular text-sm">State</p>
          <div className="h-10 w-full bg-white text-black p-2 flex items-center text-sm font-pally-regular rounded">
            {formattedAddress?.state}
          </div>
        </div>
        <div className="space-y-2 col-span-2">
          <p className="text-white font-pally-regular text-sm">Country</p>
          <div className="h-10 w-full bg-white text-black p-2 flex items-center text-sm font-pally-regular rounded">
            {formattedAddress?.country}
          </div>
        </div>
        <div className="space-y-2 col-span-2">
          <p className="text-white font-pally-regular text-sm">Zip code</p>
          <div className="h-10 w-full bg-white text-black p-2 flex items-center text-sm font-pally-regular rounded">
            {formattedAddress?.postalCode}
          </div>
        </div>
      </div>

      <div className="sticky z-50 bottom-0 bg-[#281E17]">
        <Separator />
        <div className="py-5 flex justify-between items-center">
          <Button
            onClick={saveToDraft}
            variant="outline"
            className="text-white border-white hover:bg-[#6c5442]"
          >
            Save progress
          </Button>

          <div className="flex items-center gap-5 lg:gap-8">
            <Button
              onClick={previous}
              className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
            >
              Back
            </Button>

            <Button
              onClick={onSubmit}
              disabled={isPending || !formattedAddress.address.length}
              variant="destructive"
            >
              {isPending ? <Spinner /> : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalForm;
