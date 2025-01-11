import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchFields, SearchFieldSchema } from "@/models/search";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RiSearchLine } from "react-icons/ri";

const HeaderSearch = () => {
  const pathname = usePathname();
  const form = useForm<SearchFields>({
    mode: "all",
    defaultValues: {
      event_name: "",
    },
    resolver: yupResolver(SearchFieldSchema),
  });

  const router = useRouter();

  const client = useQueryClient();

  const onSubmit = async (payload: SearchFields) => {
    const { event_name } = payload;

    if (pathname.startsWith("/explore-events")) {
      const params = new URLSearchParams(window.location.search);
      params.set("eventName", event_name);
      router.push(`/explore-events?${params.toString()}`);

      client.invalidateQueries({ queryKey: ["filteredEvents"] });
    } else {
      await router.push(
        `/explore-events?event_name=${encodeURIComponent(event_name)}`
      );

      client.invalidateQueries({ queryKey: ["filteredEvents"] });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
