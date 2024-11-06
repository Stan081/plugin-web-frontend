import { OtpBox } from "@/components/OtpBox";
import { StepsProps } from "@/pages/create-event";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC, useCallback, useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface WithdrawalOTPProps extends StepsProps {
  close: () => void;
  open: boolean;
}

const WithdrawalOTP: FC<WithdrawalOTPProps> = ({ close, open, next }) => {
  const [otp, setOtp] = useState<string>("");

  const handleOtpComplete = useCallback((otp: string) => {
    setOtp(otp);
    next();
  }, []);
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium flex justify-between items-start pb-3"
            >
              <div className="">
                <p className=" font-pally-medium text-2xl">
                  Enter OTP to approve withdrawal <br />{" "}
                  <span className="font-pally-regular text-sm">
                    Enter code sent to email address
                  </span>
                </p>
              </div>

              <div onClick={close} className="p-1.5 rounded-full bg-gray-200 cursor-pointer">
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawalOTP;
