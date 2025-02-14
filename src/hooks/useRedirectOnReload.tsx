import { useEffect } from "react";
import { useRouter } from "next/router";

const useRedirectOnReload = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("previousRoute", window.location.pathname);

      // Detect if the page was reloaded
      const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const wasReloaded = navigationEntry?.type === "reload";

      if (wasReloaded) {
        const previousRoute = sessionStorage.getItem("previousRoute");
        if (previousRoute && previousRoute !== window.location.pathname) {
          router.replace(previousRoute);
        }
      }
    }
  }, [router]);
};

export default useRedirectOnReload;
