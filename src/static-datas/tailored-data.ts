type tailoredEventsProps = {
  id: number;
  label: string;
  color: string;
  position?: string;
  mobilePosition?: string;
  rotate: number[];
};

export const UIitems = [
  {
    id: 1,
    label: "Concerts",
    color: "bg-[rgba(255,84,3,0.05)] border-orange-500",
    position: "top-0 right-20",
    mobilePosition: "top-0 right-4",
    rotate: [-8, 36, -8],
  },
  {
    id: 2,
    label: "Religion",
    color: "bg-[#F6DDE5] border-[#FA7070]",
    position: "top-28 left-10",
    mobilePosition: "top-10 left-20",
    rotate: [-13, 10, -13],
  },
  {
    id: 3,
    label: "Business",
    color: "bg-[#E4E7EC] border-[#515A6A]",
    position: "top-32 left-56",
    mobilePosition: "top-32 right-10",
    rotate: [40, -20, 40],
  },
  {
    id: 4,
    label: "Campaign",
    color: "bg-[#E4EBFF] border-[#4D77FF]",
    position: "top-64 left-32",
    mobilePosition: "top-64 right-3",
    rotate: [9, -30, 9],
  },
  {
    id: 5,
    label: "Others",
    color: "bg-[rgba(255,84,3,0.05)] border-orange-500",
    position: "top-0 left-20",
    mobilePosition: "top-0 left-6",
    rotate: [16, -8, 16],
  },
  {
    id: 6,
    label: "Parties",
    color: "bg-[#E4EBFF] border-[#4D77FF]",
    position: "top-28 right-80",
    mobilePosition: "bottom-0 right-20",
    rotate: [44, -20, 44],
  },
  {
    id: 7,
    label: "Hangout",
    color: "bg-[#F6DDE5] border-[#FA7070]",
    position: "top-32 left-40",
    mobilePosition: "top-32 left-6",
    rotate: [-16, 33, -16],
  },
  {
    id: 8,
    label: "Corporate",
    color: "bg-[#E4E7EC] border-[#515A6A]",
    position: "top-64 left-20",
    mobilePosition: "top-64 left-4",
    rotate: [9, -30, 9],
  },
];
