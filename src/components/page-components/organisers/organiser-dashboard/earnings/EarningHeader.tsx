import Container from "@/tw-components/container";
import { RiArrowLeftSLine } from "react-icons/ri";

const EarningHeader = () => {
  return (
    <div className="bg-gray-200 py-6 md:py-9">
      <Container className="space-y-2">
        <h1 className="text-[#2E394C] font-pally-medium text-xl lg:text-4xl">
          Earnings
        </h1>
        <p className="font-pally-regular text-sm lg:text-base text-[#515A6A]">
          View and manage all your earnings and payouts here.
        </p>
      </Container>
    </div>
  );
};

export default EarningHeader;
