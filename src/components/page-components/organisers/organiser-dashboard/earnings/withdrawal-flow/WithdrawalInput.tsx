import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { RxInfoCircled } from "react-icons/rx";
import { StepsProps } from "../AvailableBalance";
import { useGetWithdrawalStats } from "@/hooks/organiser/organiser-earnings/useGetWithdrawalStats";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { InitiateWithdrawal } from "@/pages/api/mutate/organiser/earnings/initiateWithdrawal";
import Spinner from "@/tw-components/spinner";

interface WithdrawalInputProps extends StepsProps {
  close: () => void;
  open: boolean;
}

const WithdrawalInput: FC<WithdrawalInputProps> = ({ next, close, open }) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);

  const { data: withdrawalStatistic } = useGetWithdrawalStats();

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // Allow only digits
    setWithdrawalAmount(Number(value)); // Directly set as a number
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => InitiateWithdrawal(data),
    onSuccess: (response) => {
      if (response?.message) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (withdrawalAmount >= (withdrawalStatistic?.data?.availableBal || 0)) {
      return toast({
        title: "Kindly withdraw below available balance",
        variant: "destructive",
      });
    }

    const payload = {
      amount: withdrawalAmount, // Already a number
    };
    mutate(payload);
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
                <p className=" font-pally-medium text-2xl">Make withdrawal</p>
              </div>

              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-200 cursor-pointer"
              >
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>
            <div className="flex flex-col gap-5">
              <Separator />
              <div className="mt-4 border p-2 border-[#FBE2B7] bg-[#FEF6E7] rounded-lg flex items-center gap-3">
                <RxInfoCircled size={20} color="#DD900D" />
                <p className="font-pally-regular text-[#586170]">
                  Withdrawal is processed and approved within 24hrs
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="border rounded-full py-2 px-4 flex justify-between items-center ">
                  <p className="font-pally-medium text-[#667185]">
                    Current balance
                  </p>
                  <p className="font-pally-bold text-xl ">
                    {toFiat(withdrawalStatistic?.data?.earning || 0)}
                  </p>
                </div>

                <div className="mt-6">
                  <Input
                    type="text"
                    value={withdrawalAmount}
                    onChange={handleInputChange}
                    className="text-3xl font-pally-medium text-center h-16 border-b "
                    placeholder="Enter amount"
                  />
                </div>
                <div className="mt-4 flex justify-center items-center gap-3">
                  <RxInfoCircled size={20} color="#DD900D" />
                  <p className="font-pally-regular text-[#586170]">
                    Plugin charge N50 per withdrawal
                  </p>
                </div>

                <Button
                  disabled={isPending}
                  variant="destructive"
                  type="submit"
                >
                  {isPending ? <Spinner /> : "Continue to withdrawal"}
                </Button>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawalInput;
