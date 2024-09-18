import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SlotWithoutHostForm,
  SlotWithoutHostSchema,
} from "@/models/create-event-schema";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineTrash } from "react-icons/hi2";
import { isHostTypes } from "./SlotWithHost";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SlotWithoutHost = () => {
  const { setIsHost, isHost, handleIsChecked } = useCreateEventContext();

  const form = useForm<SlotWithoutHostForm>({
    mode: "all",
    defaultValues: {
      isHost: isHost,
      agenda_title: "",
      agenda_description: "",
      start_time: "",
      end_time: "",
    },
    resolver: yupResolver(SlotWithoutHostSchema),
  });

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(
    async (payload: SlotWithoutHostForm) => {
      console.log(payload);

      handleIsChecked("addVendors");

      // Reset form back to default values
      form.reset({
        start_time: "",
        end_time: "",
        isHost: isHost,
        agenda_title: "",
        agenda_description: "",
      });
    },
    [form]
  );
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="w-full">
            <div className="flex justify-start items-baseline gap-4">
              <p className="font-pally-regular text-base md:text-lg">
                Do you have a Host?
              </p>
              <div className="flex flex-wrap gap-4 text-white">
                {isHostTypes.map(
                  (type: { id: boolean; name: string }, index) => (
                    <button
                      key={index}
                      onClick={() => setIsHost(!isHost)}
                      className={`py-2 px-4 rounded-full border ${
                        isHost === type.id
                          ? "bg-white text-black"
                          : "border-white"
                      }`}
                    >
                      {type.name}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="space-y-4 mt-5">
              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="agenda_title">
                  Agenda Title
                </FormLabel>
                <FormField
                  control={form.control}
                  name="agenda_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter session title"
                          type="text"
                          id="agenda_title"
                          disabled={isLoading}
                          className="w-full bg-white text-black font-pally-regular"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>

              <FormItem className="w-full">
                <FormLabel className="text-white" htmlFor="agenda_description">
                  Agenda description ( Optional )
                </FormLabel>
                <FormField
                  control={form.control}
                  name="agenda_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Max  char - 200 Words"
                          id="agenda_description"
                          disabled={isLoading}
                          className="w-full bg-white text-black font-pally-regular h-32 md:h-56"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormItem>
              <div className="flex gap-6">
                <FormItem>
                  <FormLabel className="text-white" htmlFor="start_time">
                    Start Time
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="0:00"
                              type="time"
                              id="start_time"
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
                <FormItem>
                  <FormLabel className="text-white" htmlFor="start_time">
                    End Time
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="end_time"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="0:00"
                              type="time"
                              id="start_time"
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
          </div>
          <div className="flex gap-4 my-4">
            <div
              //   onClick={handleReturnToList}
              className="p-2 rounded flex justify-center items-center bg-[#463B34] w-12 cursor-pointer"
            >
              <HiOutlineTrash size={20} color="#F9B6B1" />
            </div>
            <button
              type="submit"
              className="p-2.5 rounded-lg w-full border border-white text-white hover:bg-[#463B34]"
            >
              Save Session
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SlotWithoutHost;
