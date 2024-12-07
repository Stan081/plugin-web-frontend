"use client";
import { Separator } from "@/components/ui/separator";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { TargetAudienceForm, TargetAudienceSchema } from "@/models/campaign";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { RiCloseFill } from "react-icons/ri";

const TargetAudience = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { handleIsChecked, setCurrentStep, setMediaCampaignData } =
    useOrganiserDashContext();

  const form = useForm<TargetAudienceForm>({
    mode: "all",
    defaultValues: {
      audience_interest: [],
      audience_gender: "",
      min_age: null,
      max_age: null,
      location: "",
    },
    resolver: yupResolver(TargetAudienceSchema),
  });

  useEffect(() => {
    form.setValue("audience_interest", selectedCategories);
  }, [selectedCategories, form.setValue]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  // Function to handle deleting a selected category
  const handleDeleteSelected = (categoryToDelete: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((category) => category !== categoryToDelete)
    );
  };

  const onSubmit = useCallback((payload: TargetAudienceForm) => {
    console.log(payload);
    setMediaCampaignData((prevData) => ({
      ...prevData,
      audienceData: payload,
    }));
    setCurrentStep(2.2);
    handleIsChecked("chooseAudience");
  }, []);
  return (
    <div className="w-full lg:w-3/5 pt-10 lg:px-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div className="h-full">
        <div className="space-y-2 lg:space-y-4">
          <h2 className="text-2xl font-pally-medium">Choose an Audience</h2>
          <p className="text-[#475367] font-pally-regular text-sm lg:text-lg">
            Decide the right audience for your event.
          </p>
          <Separator />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 flex flex-col justify-between gap-5 w-full h-full "
          >
            <div className="flex flex-col gap-5">
              <FormItem>
                <FormLabel>Audience interest</FormLabel>
                <div className="my-4 flex gap-3">
                  {selectedCategories.length > 0 &&
                    selectedCategories.map((cat) => (
                      <p
                        key={cat}
                        className="flex border border-gray-500 rounded py-0.5 px-1.5 items-center gap-3"
                      >
                        {cat}
                        <span
                          onClick={() => handleDeleteSelected(cat)}
                          className="cursor-pointer text-red-500 p-0.5 border-red-500"
                        >
                          <RiCloseFill size={16} />
                        </span>
                      </p>
                    ))}
                </div>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                    <SelectValue placeholder="Pick a category" />
                  </SelectTrigger>
                  <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                    {["event", "ceremony"].map((category, index) => (
                      <SelectItem key={index} value={category}>
                        <div className="flex items-center gap-2">
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="audience_gender">Audience Gender</FormLabel>
                <FormField
                  control={form.control}
                  name="audience_gender"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={String(field.value)}
                          >
                            <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                              {["Male", "female", "Others"].map(
                                (state, index) => {
                                  return (
                                    <SelectItem key={index} value={state}>
                                      <div className="flex items-center gap-2">
                                        {state}
                                      </div>
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <div className="flex items-start gap-5">
                <FormItem className="w-1/2">
                  <FormLabel htmlFor="minAge">Minimum Age</FormLabel>
                  <FormField
                    control={form.control}
                    name="min_age"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter Minimum age..."
                            type="number"
                            id="minAge"
                            className="w-full bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>
                <FormItem className="w-1/2">
                  <FormLabel htmlFor="maxAge">Maximum Age</FormLabel>
                  <FormField
                    control={form.control}
                    name="max_age"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter Maximum age..."
                            type="number"
                            id="maxAge"
                            className="w-full bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>
              </div>
              <FormItem className="col-span-2">
                <FormLabel htmlFor="location">Address</FormLabel>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter location"
                            type="text"
                            id="location"
                            className="bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
            </div>
            <div className="sticky z-50 bottom-0 bg-white">
              <Separator />
              <div className="py-5 flex justify-between items-center">
                <Button
                  onClick={() => setCurrentStep(1)}
                  type="button"
                  variant="outline"
                >
                  Back
                </Button>
                <Button type="submit" variant="destructive">
                  {false ? <Spinner /> : "Next"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TargetAudience;
