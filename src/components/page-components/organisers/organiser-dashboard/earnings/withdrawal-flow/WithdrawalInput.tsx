import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toFiat } from "@/lib/amount";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { FC } from "react";
import { RiCloseLine } from "react-icons/ri";
import { RxInfoCircled } from "react-icons/rx";
import { StepsProps } from "../AvailableBalance";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { InitiateWithdrawal } from "@/pages/api/mutate/organiser/earnings/initiateWithdrawal";
import { useGetPayoutSummary } from "@/hooks/organiser/organiser-earnings/useGetPayoutSummary";
import Spinner from "@/tw-components/spinner";

interface WithdrawalInputProps extends StepsProps {
  close: () => void;
  open: boolean;
}

/**
 * Step 1 of the withdrawal flow: confirm, don't compose.
 *
 * A withdrawal is always for the organiser's entire available balance, so there is
 * no amount to type. The figure shown comes from the server's summary rather than
 * from anything the page is holding, so it cannot drift from what the server will
 * actually act on.
 */
const WithdrawalConfirm: FC<WithdrawalInputProps> = ({ next, close, open }) => {
  const { toast } = useToast();
  const { data: summary, isLoading, error } = useGetPayoutSummary();

  const payout = summary?.data;
  const amount = payout?.withdrawableAmount ?? 0;

  const { mutate, isPending } = useMutation({
    mutationFn: () => InitiateWithdrawal(),
    onSuccess: () => next?.(),
    onError: (err: Error) => {
      toast({ variant: "destructive", title: err.message });
    },
  });

  const blocked = Boolean(payout && !payout.canRequest);

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
              <p className="font-pally-medium text-2xl">Make withdrawal</p>

              <div
                onClick={close}
                className="p-1.5 rounded-full bg-gray-200 cursor-pointer"
              >
                <RiCloseLine size={20} />
              </div>
            </DialogTitle>

            <div className="flex flex-col gap-5">
              <Separator />

              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <Spinner />
                </div>
              ) : error ? (
                <div className="py-8 text-center">
                  <p className="font-pally-regular text-[#586170]">
                    We couldn&apos;t load your balance. Please try again.
                  </p>
                </div>
              ) : blocked ? (
                <>
                  <div className="mt-4 border p-3 border-[#FBE2B7] bg-[#FEF6E7] rounded-lg flex items-start gap-3">
                    <RxInfoCircled
                      size={20}
                      color="#DD900D"
                      className="mt-0.5 shrink-0"
                    />
                    <p className="font-pally-regular text-[#586170]">
                      {payout?.blockedReason}
                    </p>
                  </div>
                  <Button variant="outline" onClick={close}>
                    Close
                  </Button>
                </>
              ) : (
                <>
                  <div className="mt-4 border p-2 border-[#FBE2B7] bg-[#FEF6E7] rounded-lg flex items-center gap-3">
                    <RxInfoCircled
                      size={20}
                      color="#DD900D"
                      className="shrink-0"
                    />
                    <p className="font-pally-regular text-[#586170]">
                      Withdrawal is processed and approved within 24hrs
                    </p>
                  </div>

                  <div className="text-center py-4">
                    <p className="font-pally-medium text-[#667185]">
                      You&apos;re withdrawing your full balance
                    </p>
                    <p className="font-pally-bold text-4xl mt-3">
                      {toFiat(amount)}
                    </p>
                  </div>

                  <div className="flex justify-center items-center gap-3">
                    <RxInfoCircled
                      size={20}
                      color="#DD900D"
                      className="shrink-0"
                    />
                    <p className="font-pally-regular text-[#586170]">
                      Plugin charge N50 per withdrawal
                    </p>
                  </div>

                  <Button
                    disabled={isPending || amount <= 0}
                    variant="destructive"
                    onClick={() => mutate()}
                  >
                    {isPending ? <Spinner /> : "Continue to withdrawal"}
                  </Button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default WithdrawalConfirm;
