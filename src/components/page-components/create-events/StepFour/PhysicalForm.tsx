"use client";

import React, { useCallback, useEffect, useRef } from "react";
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

interface PhysicalFormProps {
  locationType: string;
}

const PhysicalForm: React.FC<PhysicalFormProps> = ({ locationType }) => {
  const {
    nextStep: next,
    previousStep: previous,
    saveToDraft,
  } = useCreateEventContext();

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
          form.setValue("state", getAddressComponent("administrative_area_level_1"));
          form.setValue("country", getAddressComponent("country"));
          form.setValue("zipcode", parseInt(getAddressComponent("postal_code")) || 0);
        }
      });
    }
  }, [form]);

  const onSubmit = useCallback(
    (payload: PhysicalLocation) => {
      const data = {
        locationType,
        physicalLocation: {
          address: payload?.address,
          city: payload?.city,
          state: payload?.state,
          country: payload?.country,
          zipcode: String(payload?.zipcode),
        },
      };
      mutate(data);
    },
    [locationType, mutate]
  );

  return (
    <div>
      <h4 className="font-pally-medium md:text-lg">Location Address</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="mt-8 pb-10 h-[45vh] whitespace-normal overflow-y-auto">
            <div className="grid grid-cols-2 gap-5 h-auto w-auto">
              {/* Address Field with Google Places */}
              <FormItem className="col-span-2">
                <FormLabel className="text-white" htmlFor="physical_location">
                  Address
                </FormLabel>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          ref={addressInputRef}
                          placeholder="Search for location or address"
                          type="text"
                          id="physical_location"
                          className="bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>

              {/* Other Form Fields */}
              <FormItem>
                <FormLabel className="text-white">City</FormLabel>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="City"
                          type="text"
                          className="bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <FormItem>
                <FormLabel className="text-white">State</FormLabel>
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="State"
                          type="text"
                          className="bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <FormItem>
                <FormLabel className="text-white">Country</FormLabel>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Country"
                          type="text"
                          className="bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <FormItem>
                <FormLabel className="text-white" htmlFor="zipcode">
                  Zipcode
                </FormLabel>
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter zipcode"
                          type="number"
                          id="zipcode"
                          className="bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
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
                  type="submit"
                  disabled={isPending}
                  variant="destructive"
                >
                  {isPending ? <Spinner /> : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PhysicalForm;
