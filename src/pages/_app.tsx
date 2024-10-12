import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/test.css";
import {
  UserDashboardProvider,
} from "@/providers/user_dashboard.provider";
import { EventsProvider } from "@/providers/events.provider";
import { CreateEventProvider } from "@/providers/create_event.provider";
import { OrganiserDashboardProvider } from "@/providers/organiser_dashboard.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserDashboardProvider>
        <CreateEventProvider>
          <EventsProvider>
            <OrganiserDashboardProvider>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster />
            </OrganiserDashboardProvider>
          </EventsProvider>
        </CreateEventProvider>
      </UserDashboardProvider>
    </QueryClientProvider>
  );
}
