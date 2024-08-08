import React, { useState } from "react";
import { OtpBox } from "@/components/OtpBox";
import { useRouter } from "next/navigation";

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>("");

  const router = useRouter()

  const handleOtpComplete = (otp: string) => {
    setOtp(otp);
    console.log("OTP Entered:", otp);
    router.push('/')
  };

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

export default OTPVerification;
