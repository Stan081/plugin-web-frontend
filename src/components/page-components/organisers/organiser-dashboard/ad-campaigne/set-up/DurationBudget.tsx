import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { BudgetDurationForm, BudgetDurationSchema } from "@/models/campaign";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";

const DurationBudget: FC<{ minPrice: number }> = ({ minPrice }) => {
  const [value, setValue] = useState(minPrice);
  const { handleIsChecked, setCurrentStep, setMediaCampaignData } =
    useOrganiserDashContext();

  const form = useForm<BudgetDurationForm>({
    mode: "all",
    defaultValues: {
      start_date: null,
      end_date: null,
      duration: 1,
      budget: value,
    },
    resolver: yupResolver(BudgetDurationSchema),
  });

  useEffect(() => {
    form.setValue("budget", value);
  }, [value, form.setValue]);

  const handleSliderChange = (values: number[]) => {
    setValue(values[0]);
  };

  const onSubmit = useCallback((payload: BudgetDurationForm) => {
    console.log(payload);
    setMediaCampaignData((prevData) => ({
      ...prevData,
      budgetData: payload,
    }));
    setCurrentStep(2.3);
    handleIsChecked("durationBudget");
  }, []);
  return (
    <div className="w-full lg:w-3/5 pt-10 lg:px-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div className="lg:h-[85vh]">
        <div className="space-y-2 lg:space-y-4">
          <h2 className="text-2xl font-pally-medium">Duration And Budget</h2>
          <p className="text-[#475367] font-pally-regular text-sm lg:text-lg">
            Choose a flexible duration with a budget at no cost
          </p>
          <Separator />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" relative mt-5 flex flex-col justify-between gap-6 w-full h-full "
          >
            <div className="flex flex-col gap-6">
              <div>
                <RangeSlider
                  value={[value, 100000]}
                  onInput={handleSliderChange}
                  min={0}
                  max={100000}
                  thumbsDisabled={[false, true]} // Disable the second thumb
                  rangeSlideDisabled={true} // Disable range sliding
                />
                <p className="mt-2 font-pally-regular text-sm flex justify-between">
                  <span>{toFiat(minPrice)}</span>
                  <span>{toFiat(100000)}</span>
                </p>
              </div>
              <div className=" flex items-start gap-5">
                <FormItem className="">
                  <FormLabel htmlFor="duration">Duration</FormLabel>
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              placeholder="Enter duration"
                              type="number"
                              id="duration"
                              className="w-full bg-white text-black font-pally-regular"
                              {...field}
                            />
                          </FormControl>
                          <p className="font-pally-regular text-base">days</p>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>
                <div className="flex flex-col gap-3 w-full max-w-40 mt-2">
                  <FormLabel htmlFor="duration">Campaign Name</FormLabel>
                  <div className="mt h-10 w-full p-1 font-pally-regular flex justify-between items-center bg-gray-300 rounded-md">
                    {toFiat(value)}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="mt-4 flex items-start gap-5">
                <FormItem className="w-full">
                  <FormLabel htmlFor="start_date">
                    Campaign starts on *
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => {
                      const formattedDate = field.value
                        ? field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : ""
                        : "";

                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="DD/MM/YY"
                              type="date"
                              id="start_date"
                              className="bg-white text-black font-pally-regular"
                              {...field}
                              value={formattedDate}
                              onChange={(e) => {
                                field.onChange(new Date(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </FormItem>
                <FormItem className="w-full">
                  <FormLabel htmlFor="end_date">Campaign end on*</FormLabel>
                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => {
                      const formattedDate = field.value
                        ? field.value instanceof Date
                          ? field.value.toISOString().split("T")[0]
                          : ""
                        : "";

                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="DD/MM/YY"
                              type="date"
                              id="end_date"
                              className="bg-white text-black font-pally-regular"
                              {...field}
                              value={formattedDate}
                              onChange={(e) => {
                                field.onChange(new Date(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </FormItem>
              </div>
            </div>

            <div className="sticky z-50 bottom-0 bg-white">
              <Separator />
              <div className="py-5 flex justify-between items-center">
                <Button
                  // onClick={previousSetUpStep}
                  type="button"
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  // disabled={isPending || isUpdatePending}
                  variant="destructive"
                >
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

export default DurationBudget;
