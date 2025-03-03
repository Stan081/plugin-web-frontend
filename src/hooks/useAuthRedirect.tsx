import { getToken } from "@/lib/token";
import { useMe } from "@/pages/api/query/me";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuthRedirect = () => {
    const token = getToken()
  const router = useRouter();

  const handleProtectedNavigation = (destination: string) => {
    if (!token) {
      // Store the intended URL
      localStorage.setItem("redirectAfterLogin", destination);
      router.push("/login"); // Redirect to login
    } else {
      router.push(destination); // Navigate to the intended page
    }
  };

  return { handleProtectedNavigation };
};