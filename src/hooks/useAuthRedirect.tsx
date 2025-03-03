import { setCookie } from "@/lib/cookies";
import { getToken } from "@/lib/token";
import { useRouter } from "next/router";

export const useAuthRedirect = () => {
  const token = getToken();
  const router = useRouter();

  const handleProtectedNavigation = (destination: string) => {
    if (!token) {
      setCookie("redirectAfterLogin", destination);
        router.push("/login");
    } else {
        router.push(destination);
    }
  };

  return { handleProtectedNavigation };
};
