import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toFiat } from "@/lib/amount";
import { Fragment, useState } from "react";
import WithdrawalProcess from "./withdrawal-flow/WithdrawalProcess";

const AvailableBalance = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="border border-[#EAEDF0] rounded-xl p-6 space-y-6">
        <div className="flex justify-between">
          <p className="text-[#888D96] font-pally-medium text-sm md:text-base">
            Available Balance
          </p>

          <div className="rounded-full h-5 w-5 bg-[#FF5752]" />
        </div>

        <p className="font-pally-medium text-4xl">{toFiat(0)}</p>

        <div className="flex justify-between items-center">
          <Select>
            <SelectTrigger className="w-[180px] border-none rounded-full font-pally-regular text text-[#586170] shadow-none">
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">This month</SelectItem>
                <SelectItem value="60">Last month</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setShowModal(!showModal)}
            variant="destructive"
          >
            Withdraw
          </Button>
        </div>
      </div>
      {showModal && (
        <WithdrawalProcess
          open={showModal}
          close={() => setShowModal(!showModal)}
        />
      )}
    </Fragment>
  );
};

export default AvailableBalance;
