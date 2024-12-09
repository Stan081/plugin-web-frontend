"use client";
import React, { useCallback, useState } from "react";
import { OtpBox } from "@/components/OtpBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VerifyCodeType } from "@/lib/types/AuthType";
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/lib/token";
import { VerifyLoginCode } from "@/pages/api/mutate/Login";
import { getCookie } from "@/lib/cookies";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/tw-components/spinner";

const OTPLoginVerification = () => {
  const [otp, setOtp] = useState<string>("");
  const { setShouldRedirect } = useUserDashContext();

  const router = useRouter();

  const { toast } = useToast();
  const email = getCookie("email");

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerifyCodeType) => VerifyLoginCode(data),
    onSuccess: (response) => {
      client.invalidateQueries({ queryKey: ["me"] });
      setShouldRedirect(true);
      router.push("/");
      toast({
        variant: "success",
        title: "Verified",
        description: `${response?.message}`,
      });
      setToken(response?.token);
    },
    onError: (error: any) => {
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

export default OTPLoginVerification;
