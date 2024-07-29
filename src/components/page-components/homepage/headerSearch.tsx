import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchField, SearchFieldSchema } from "@/models/search";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

const HeaderSearch = () => {

  const form = useForm<SearchField>({
    mode: "all",
    defaultValues: {
      eventName: "",
    },
    resolver: yupResolver(SearchFieldSchema),
  });

  const onSubmit = useCallback(async (payload: SearchField) => {
    console.log(payload);
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 my-5"
        >
          <div className="flex items-start gap-4">
            <FormItem className="w-full">
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Event name"
                        type="text"
                        autoCorrect="off"
                        className="w-full bg-white"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormItem>
            <button type="submit" className="bg-[#D9302A] rounded-full p-2">
                <Search size={24} color="#fff"/>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HeaderSearch;
