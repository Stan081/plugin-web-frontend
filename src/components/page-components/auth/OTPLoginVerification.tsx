import React, { useCallback, useState } from "react";
import { OtpBox } from "@/components/OtpBox";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VerifyCodeType } from "@/lib/types/AuthType";
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/lib/token";
import { VerifyLoginCode } from "@/pages/api/mutate/Login";
import { getCookie } from "@/lib/cookies";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

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
      toast({
        variant: "success",
        title: "Verified",
        description: `${response?.message}`,
      });
      client.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
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
    const data = {
      email,
      code: otp,
    };
    mutate(data);
    setShouldRedirect(true);
  };

  if(isPending){
    return <SpinnerOverlay/>
  }

  return (
    <div className="mt-6">
      <p className="text-sm font-pally-regular mb-2 text-[#98A2B3]">
        Verification Code
      </p>
      <OtpBox numDigits={5} onComplete={handleOtpComplete} />
      <div className="border w-full mt-5 border-[#98A2B333]/20" />
      <div className="flex mt-10 text-sm md:text-base text-[#98A2B3]">
        <p>Didn’t get the code?</p>
        {/* <p>Resend in 4:59</p> */}
      </div>
    </div>
  );
};

export default OTPLoginVerification;
