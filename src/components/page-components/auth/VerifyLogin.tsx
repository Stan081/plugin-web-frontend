import React, { useCallback, useState } from "react";
import { OtpBox } from "@/components/OtpBox";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VerifyCodeType } from "@/lib/types/AuthType";
import { useToast } from "@/components/ui/use-toast";
import { useUserDashContext } from "@/providers/user_dashboard.provider";
import { setToken } from "@/lib/token";
import { VerifyLoginCode } from "@/pages/api/mutate/Login";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useMe } from "@/pages/api/query/me";

const VerifyLogin = () => {
  const [otp, setOtp] = useState<string>("");
  const { data: userData } = useMe();

  const router = useRouter();

  const { toast } = useToast();

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerifyCodeType) => VerifyLoginCode(data),
    onSuccess: (response) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      response.data;
      console.log(response);
      client.invalidateQueries({ queryKey: ["me"] });
      toast({
        variant: "success",
        title: "Verified",
        description: `${response?.message}`,
      });
      router.push("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
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
        email: userData?.data?.email,
        code: otp,
      };
      mutate(data);
    },
    [mutate]
  );

  return (
    <div className="mt-6">
      {isPending && <SpinnerOverlay />}
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

export default VerifyLogin;
