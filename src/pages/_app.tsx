import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/test.css";
import { UserDashboardProvider } from "@/providers/user_dashboard.provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserDashboardProvider>
      <Component {...pageProps} />
    </UserDashboardProvider>
  );
}
