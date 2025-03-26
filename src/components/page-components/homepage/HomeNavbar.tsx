import Link from "next/link";
import Logo from "@/components/Logo";
import { NavigationDialog } from "@/components/NavigationDialog";
import ListEventCard from "@/components/ListEventLinks";
import { getToken } from "@/lib/token";
import { Button } from "@/components/ui/button";
import MenuLinks from "@/components/Menu";
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
import Image from "next/image";

const HeaderSearchBar = () => {
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
        `/explore-events?eventName=${encodeURIComponent(event_name)}`
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
                        className="w-full border-2 bg-transparent border-white text-white font-pally-regular"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormItem>
            <button type="submit" className=" rounded-full p-2">
              <RiSearchLine size={30} color="#fff" />
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const HomeNavbar = () => {
  const token = getToken();
  return (
    <nav className="lg:py-0 py-3">
      <div className="flex justify-between items-center gap-5">
        <div className="md:space-x-0 flex gap-4 md:gap-6 items-center">
          <NavigationDialog white />
          <Link href={"/"} className="w-[100px] lg:w-[120px]">
            <span className="sr-only">Plugin</span>

            <Image
              src="https://res.cloudinary.com/dbhbyikta/image/upload/v1742940035/Medium_-_White_nug0e0.png"
              alt="Plugin Logo"
              width={128}
              height={32}
              className="w-[110px] h-10 lg:h-11 pointer-events-auto"
            />
          </Link>
          <div className="hidden lg:block w-60">
            <HeaderSearchBar />
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href={"/explore-events"}
            className="text-white font-pally-regular text-base md:text-lg hover:underline whitespace-nowrap cursor-pointer"
          >
            Explore Events
          </Link>

          <ListEventCard white />

          {!token ? (
            <Link href={"/signup"}>
              <Button variant="outline" className=" border border-white text-white">
                Get Started
              </Button>
            </Link>
          ) : (
            <MenuLinks white />
          )}
        </div>
        <div className="lg:hidden block">
          {!token ? (
            <Link href={"/signup"}>
              <Button variant="outline" className=" border border-white text-white">
                Get Started
              </Button>
            </Link>
          ) : (
            <MenuLinks white />
          )}
        </div>
      </div>
      <div className="lg:hidden block w-full pb-2 md:pb-0 px-4">
        <HeaderSearchBar />
      </div>
    </nav>
  );
};

export default HomeNavbar;
