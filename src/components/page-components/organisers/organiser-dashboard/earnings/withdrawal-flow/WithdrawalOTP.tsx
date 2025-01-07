import { OtpBox } from "@/components/OtpBox";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC, useCallback, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { StepsProps } from "../AvailableBalance";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { WithdrawalOTP } from "@/pages/api/mutate/organiser/earnings/withdrawalOTP";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";

interface WithdrawalOTPProps extends StepsProps {
  close: () => void;
  open: boolean;
}

const WithdrawalOTPComponent: FC<WithdrawalOTPProps> = ({
  close,
  open,
  next,
}) => {
  const [otp, setOtp] = useState<string>("");
  const {setWithdrawalReceiptState} = useOrganiserDashContext()

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => WithdrawalOTP(data),
    onSuccess: (response) => {
      if (response?.message) {
        setWithdrawalReceiptState(response?.data)
        toast({
          variant: "success",
          title: "OTP verified",
          description: `${response?.message}`,
        });
        next();
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error?.message,
      });
    },
  });

  const handleOtpComplete = useCallback((otp: string) => {
    setOtp(otp);
  }, []);

  const handleSubmit = () => {
    const data = {
      'otp': otp
    }
    mutate(data);
  };
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

              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-200 cursor-pointer"
              >
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div className="mt-6 space-y-5">
              <p className="text-sm font-pally-regular mb-2 text-[#98A2B3]">
                Verification Code
              </p>
              <OtpBox numDigits={5} onComplete={handleOtpComplete} />
              <div>
                <Button
                  onClick={handleSubmit}
                  variant="destructive"
                  disabled={isPending || !otp}
                  className="w-full max-w-sm"
                >
                  {isPending ? <Spinner /> : "Verify"}
                </Button>
              </div>
              {/* <div>
                <div className="border w-full mt-5 border-[#98A2B333]/20" />
                <div className="flex mt-10 text-sm md:text-base text-[#98A2B3]">
                  <p>Didn’t get the code?</p>
                  <p>Resend in 4:59</p>
                </div>
              </div> */}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawalOTPComponent;
