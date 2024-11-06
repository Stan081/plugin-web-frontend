import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AttendeeSchema,
  AttendeeSearchForm,
  SearchFields,
  SearchFieldSchema,
} from "@/models/search";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RiSearchLine } from "react-icons/ri";

const SearchAttendee = () => {
  const form = useForm<AttendeeSearchForm>({
    mode: "all",
    defaultValues: {
      attendee_email: "",
    },
    resolver: yupResolver(AttendeeSchema),
  });

  const onSubmit = useCallback(async (payload: AttendeeSearchForm) => {
    console.log(payload);
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 my-5"
        >
          <div className="flex items-center gap-4">
            <FormItem className="w-full">
              <FormField
                control={form.control}
                name="attendee_email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Event name"
                        type="text"
                        autoCorrect="off"
                        className="w-full bg-white font-pally-regular"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormItem>

            <button type="submit" className="bg-[#D9302A] rounded-full p-2">
              <RiSearchLine size={24} color="#fff" />
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchAttendee;
