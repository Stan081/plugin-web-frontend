"use client";
import React, { useCallback, useState } from "react";
import { OtpBox } from "@/components/OtpBox";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VerifyCode } from "@/pages/api/mutate/SignUp";
import { VerifyCodeType } from "@/lib/types/AuthType";
import { useToast } from "@/components/ui/use-toast";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { setToken } from "@/lib/token";
import { getCookie, removeCookie } from "@/lib/cookies";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>("");
  const { setShouldRedirect } = useUserDashContext();

  const router = useRouter();

  const email = getCookie("email");

  const { toast } = useToast();

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerifyCodeType) => VerifyCode(data),
    onSuccess: (response) => {
      client.invalidateQueries({ queryKey: ["me"] });
      toast({
        variant: "success",
        title: "Verified",
        description: `${response?.message}`,
      });

      // Set token first
      setToken(response?.token);
      setShouldRedirect(true);
      removeCookie("email");

      // Get and remove redirect cookie before pushing
      const redirectTo = getCookie("redirectAfterLogin");
      console.log("Redirecting to:", redirectTo);

      if (redirectTo) {
        removeCookie("redirectAfterLogin");
        router.push(redirectTo as string);
        return;
      } else {
        router.replace("/");
      }
    },
    onError: (error: any) => {
      // Handle error here
      toast({
        variant: "destructive",
        title: "Wrong OTP",
        description: error?.message,
      });
    },
  });

  const handleOtpComplete = (otp: string) => {
    setOtp(otp);
  };

  const handleSubmit = () => {
    const data = {
      email,
      code: otp,
    };
    mutate(data);

  };

  return (
    <div className="mt-6">
      <p className="text-sm font-pally-regular mb-2 text-[#98A2B3]">
        Verification Code
      </p>
      <div className="mt-3 flex flex-col justify-center gap-8">
        <OtpBox numDigits={5} onComplete={handleOtpComplete} />
        <Button
          onClick={handleSubmit}
          variant="destructive"
          disabled={isPending}
          className="w-full max-w-sm"
        >
          {isPending ? <Spinner /> : "Verify"}
        </Button>
      </div>
      <div className="flex mt-10 text-sm md:text-base text-[#98A2B3]">
        <p>Didn’t get the code?</p>
        {/* <p>Resend in 4:59</p> */}
      </div>
    </div>
  );
};

export default OTPVerification;
