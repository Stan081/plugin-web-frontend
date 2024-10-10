import React, { useCallback, useState } from "react";
import { OtpBox } from "@/components/OtpBox";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { VerifyCode } from "@/pages/api/mutate/SignUp";
import { VerifyCodeType } from "@/lib/types/AuthType";
import { useToast } from "@/components/ui/use-toast";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";
import { setToken } from "@/lib/token";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>("");
  const { user } = useUserDashContext();

  const router = useRouter();

  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (data: VerifyCodeType) => VerifyCode(data),
    onSuccess: (response) => {
      response.data;
      setToken(response?.token);
      console.log(response);
      // client.invalidateQueries(["me"]);
      toast({
        variant: "success",
        title: "Verified",
        description: `${response?.message}`,
      });
      router.push("/");
    },
    onError: (error: any) => {
      // Handle error here
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  const handleOtpComplete = useCallback(
    (otp: string) => {
      setOtp(otp);
      console.log("OTP Entered:", otp);
      const data = {
        email: user?.email,
        code: otp,
      };
      console.log(data);
      mutate(data);
    },
    [mutate]
  );

  return (
    <div className="mt-6">
      <p className="text-sm font-pally-regular mb-2 text-[#98A2B3]">
        Verification Code
      </p>
      <OtpBox numDigits={6} onComplete={handleOtpComplete} />
      <div className="border w-full mt-5 border-[#98A2B333]/20" />
      <div className="flex mt-10 text-sm md:text-base text-[#98A2B3]">
        <p>Didn’t get the code?</p>
        {/* <p>Resend in 4:59</p> */}
      </div>
    </div>
  );
};

export default OTPVerification;
