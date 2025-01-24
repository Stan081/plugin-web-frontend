import { Input } from "@/components/ui/input";
import { SavedEvents, SavedEventsSchema } from "@/models/search";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";
import { RiSearchLine } from "react-icons/ri";

type Props = {
  placeholder: string;
};

const SearchComponent: React.FC<Props> = ({ placeholder }) => {
  const form = useForm<SavedEvents>({
    mode: "all",
    defaultValues: {
      event_name: "",
    },
    resolver: yupResolver(SavedEventsSchema),
  });

  //  initialise router
  const router = useRouter();

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  const onSubmit = useCallback(async (payload: SavedEvents) => {
    
    console.log(payload);
    // router.push("/");
  }, []);
  return (
    <Form {...form}>
      <form
        onClick={form.handleSubmit(onSubmit)}
        className="flex items-start gap-4 my-5 w-full md:max-w-sm"
      >
        <FormItem className="w-full">
          <FormField
            control={form.control}
            name="event_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    type="text"
                    autoCorrect="off"
                    id="email_address"
                    disabled={isLoading}
                    className="w-full bg-white font-pally-regular"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormItem>
        <button type="submit" className="bg-[#D9302A] rounded-full p-2">
          <RiSearchLine size={24} color="#fff" />
        </button>
      </form>
    </Form>
  );
};

export default SearchComponent;
