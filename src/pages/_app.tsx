import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/test.css";
import { UserDashboardProvider } from "@/providers/user_dashboard.provider";
import { EventsProvider } from "@/providers/events.provider";
import { CreateEventProvider } from "@/providers/create_event.provider";
import { OrganiserDashboardProvider } from "@/providers/organiser_dashboard.provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CreateEventProvider>
      <UserDashboardProvider>
        <EventsProvider>
          <OrganiserDashboardProvider>
            <Component {...pageProps} />
          </OrganiserDashboardProvider>
        </EventsProvider>
      </UserDashboardProvider>
    </CreateEventProvider>
  );
}
