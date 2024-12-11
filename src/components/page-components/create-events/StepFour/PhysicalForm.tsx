"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  PhysicalLocation,
  PhysicalLocationSchema,
} from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { EventPhysicalLocation } from "@/pages/api/mutate/create-events/eventLocationType";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { Label } from "@/components/ui/label";

interface PhysicalFormProps {
  locationType: string;
}

const PhysicalForm: React.FC<PhysicalFormProps> = ({ locationType }) => {
  const {
    nextStep: next,
    previousStep: previous,
    saveToDraft,
  } = useCreateEventContext();

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [formattedAddress, setFormattedAddress] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [error, setError] = useState("");

  const form = useForm<PhysicalLocation>({
    mode: "all",
    defaultValues: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: 0,
    },
    resolver: yupResolver(PhysicalLocationSchema),
  });

  const { toast } = useToast();

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

  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      const autocomplete = new google.maps.places.Autocomplete(
        addressInputRef.current!,
        {
          fields: ["formatted_address", "geometry", "address_components"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place.address_components) {
          const components = place.address_components;

          // Helper function to extract specific component
          const getAddressComponent = (type: string) =>
            components.find((component) => component.types.includes(type))
              ?.long_name || "";

          // Update form values based on extracted data
          form.setValue("address", place.formatted_address || "");
          form.setValue("city", getAddressComponent("locality"));
          form.setValue(
            "state",
            getAddressComponent("administrative_area_level_1")
          );
          form.setValue("country", getAddressComponent("country"));
          form.setValue(
            "zipcode",
            parseInt(getAddressComponent("postal_code")) || 0
          );
        }
      });
    }
  }, [form]);

  const onSubmit = () => {
    // const data = {
    //   locationType,
    //   physicalLocation: {
    //     address: payload?.address,
    //     city: payload?.city,
    //     state: payload?.state,
    //     country: payload?.country,
    //     zipcode: String(payload?.zipcode),
    //   },
    // };
    // mutate(data);
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
        className="mb-5 flex items-center gap-6"
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
        </div>
        <div className="block mt-7">
          <Button variant="destructive" type="submit">
            Verify address
          </Button>
        </div>
      </form>

      <div className="mb-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2 col-span-2">
          <div className="h-10 w-full bg-white text-black p-2 flex items-center text-sm font-pally-regular rounded">
            {formattedAddress?.address}
          </div>
        </div>
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
            Save Progress
          </Button>

          <div className="flex items-center gap-8">
            <Button
              onClick={previous}
              className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
            >
              Back
            </Button>

            <Button
              onClick={onSubmit}
              disabled={isPending || !address.length}
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
