import React, { useCallback, useState } from "react";
import { OtpBox } from "@/components/OtpBox";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VerifyCode } from "@/pages/api/mutate/SignUp";
import { VerifyCodeType } from "@/lib/types/AuthType";
import { useToast } from "@/components/ui/use-toast";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { setToken } from "@/lib/token";
import { getCookie } from "@/lib/cookies";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>("");
  const {setShouldRedirect} = useUserDashContext()
  const router = useRouter();

  const email = getCookie("email");

  const { toast } = useToast();

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerifyCodeType) => VerifyCode(data),
    onSuccess: (response) => {
      setToken(response?.token);
      client.invalidateQueries({ queryKey: ["me"] });
      client.refetchQueries({ queryKey: ["me"] });
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
        title: "Wrong OTP",
        description: error?.message,
      });
    },
  });

  const handleOtpComplete = useCallback(
    (otp: string) => {
      setOtp(otp);
      const data = {
        email,
        code: otp,
      };
      mutate(data);
      setShouldRedirect(true)
    },
    [mutate]
  );

  return (
    <div className="mt-6">
      {isPending && <SpinnerOverlay/>}
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

export default OTPVerification;
