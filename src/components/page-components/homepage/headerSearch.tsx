import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchFields, SearchFieldSchema } from "@/models/search";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RiSearchLine } from "react-icons/ri";

const HeaderSearch = () => {
  const form = useForm<SearchFields>({
    mode: "all",
    defaultValues: {
      event_name: "",
      event_location: "",
    },
    resolver: yupResolver(SearchFieldSchema),
  });

  const onSubmit = useCallback(async (payload: SearchFields) => {
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
                name="event_name"
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
            <div className="border border-gray-500 rotate-0 h-5 hidden lg:block" />
            <FormItem className="w-full hidden lg:block">
              <FormField
                control={form.control}
                name="event_location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Pick location"
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

export default HeaderSearch;
