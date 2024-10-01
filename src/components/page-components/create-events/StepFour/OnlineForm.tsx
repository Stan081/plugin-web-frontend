import { StepsProps } from "@/pages/create-event";
import React, { useCallback, useMemo } from "react";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  OnlineVenueLink,
  OnlineVenueLinkSchema,
} from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const OnlineForm: React.FC<StepsProps> = ({ next, previous }) => {
  const form = useForm<OnlineVenueLink>({
    mode: "all",
    defaultValues: {
      venue_platform: "",
      venue_link: "",
    },
    resolver: yupResolver(OnlineVenueLinkSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(async (payload: OnlineVenueLink) => {
    console.log(payload);
    next();
  }, []);
  return (
    <div>
      <h4 className="font-pally-medium md:text-lg">Virtual Address</h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="pb-10 h-[50vh] whitespace-normal overflow-y-auto">
            <div className="grid grid-cols-3 gap-5">
              <FormItem className="col-span-1">
                <FormLabel className="text-white">Online Venue</FormLabel>
                <FormField
                  control={form.control}
                  name="venue_platform"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={String(field.value)}
                          >
                            <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                              <SelectValue placeholder="Select venue" />
                            </SelectTrigger>
                            <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                              {["Google Meet", "Zoom"].map((state, index) => {
                                return (
                                  <SelectItem key={index} value={state}>
                                    <div className="flex items-center gap-2">
                                      {state}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </FormItem>
              <FormItem className="col-span-2">
                <FormLabel className="text-white" htmlFor="venue_link">
                  Venue Link
                </FormLabel>
                <FormField
                  control={form.control}
                  name="venue_link"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="https://example.com"
                            type="text"
                            id="physical_location"
                            disabled={isLoading}
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
          </div>
          <div className="sticky z-50 bottom-0 bg-[#281E17]">
            <Separator />
            <div className="py-5 flex justify-between items-center">
              <Button
                onClick={() => {}}
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
                  disabled={isLoading}
                  variant="destructive"
                >
                  {isLoading ? "Submitting..." : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OnlineForm;
