import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const ShowLess = () => {
  return (
    <span className="flex items-center gap-1.5 text-[#667185] font-pally-medium cursor-pointer">
      Show less
      <RiArrowUpSLine size={18} />
    </span>
  );
};

export const ShowMore = () => {
  return (
    <span className="flex items-center gap-1.5 text-[#667185] font-pally-medium cursor-pointer">
      Show more
      <RiArrowDownSLine size={18} />
    </span>
  );
};
