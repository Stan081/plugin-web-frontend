export const timezone = [
  "(GMT-12:00) International Date Line West",
  "(GMT-11:00) Coordinated Universal Time-11",
  "(GMT-10:00) Hawaii-Aleutian Standard Time - Honolulu",
  "(GMT-09:00) Alaska Standard Time - Anchorage",
  "(GMT-08:00) Pacific Standard Time - Los Angeles",
  "(GMT-07:00) Mountain Standard Time - Denver",
  "(GMT-06:00) Central Standard Time - Chicago",
  "(GMT-05:00) Eastern Standard Time - New York",
  "(GMT-04:00) Atlantic Standard Time - Halifax",
  "(GMT-03:00) Argentina Standard Time - Buenos Aires",
  "(GMT-02:00) Coordinated Universal Time-02",
  "(GMT-01:00) Azores Standard Time - Azores",
  "(GMT+00:00) Greenwich Mean Time - London",
  "(GMT+01:00) West Africa Standard Time - Lagos",
  "(GMT+02:00) Eastern European Time - Cairo",
  "(GMT+03:00) Arabian Standard Time - Riyadh",
  "(GMT+04:00) Gulf Standard Time - Dubai",
  "(GMT+05:00) Pakistan Standard Time - Karachi",
  "(GMT+06:00) Bangladesh Standard Time - Dhaka",
  "(GMT+07:00) Indochina Time - Bangkok",
  "(GMT+08:00) China Standard Time - Beijing",
  "(GMT+09:00) Japan Standard Time - Tokyo",
  "(GMT+10:00) Australian Eastern Standard Time - Sydney",
  "(GMT+11:00) Solomon Islands Time - Honiara",
  "(GMT+12:00) New Zealand Standard Time - Wellington",
];

// default data for step two form
export type EventCategory = {
  name: string;
  selected: boolean;
};

export type PageContentsType = {
  id: string;
  introTitle: string;
  content: string[];
};

export type GuestListType = {
  id?: string;
  guestName: string;
  image: string;
  role: string;
};

export type VendorListType = {
  id?: number;
  vendorImage?: string;
  slot: number;
  passTag: string;
  pricePass: number;
  passCategories: string[];
  sharedPass: boolean;
};

export type AgendaListsType = {
  id?: number;
  hostImage?: string;
  startTime: string;
  endTime: string;
  hostName?: string;
  isHost?: boolean;
  agendaTitle: string;
  agendaDescription: string;
};

export type SeatSectionListsType = {
  id?: number;
  seatType: string;
  ticketName: string;
  ticketQuantity: number;
  ticketCategory: string;
  ticketPrice?: number;
  startTime?: string;
  endTime?: string;
  startDate: string | Date;
  endDate: string | Date;
  ticketPerks: string;
};

export const categoriesData: EventCategory[] = [
  { name: "Music", selected: false },
  { name: "Business", selected: false },
  { name: "Food & Drinks", selected: false },
  { name: "Community", selected: false },
  { name: "Arts", selected: false },
  { name: "Entertainment", selected: false },
  { name: "Health", selected: false },
  { name: "Science & Tech", selected: false },
  { name: "Non-Profit", selected: false },
  { name: "Hangout", selected: false },
  { name: "Family & Education", selected: false },
];

export const pageContents: PageContentsType[] = [
  {
    id: "item-1",
    introTitle: "Outline the schedule of activities for your event.",
    content: [
      "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
      "Ensure the agenda flows smoothly and includes buffer times.",
    ],
  },
  {
    id: "item-2",
    introTitle: "Add photos that highlight key moments or themes of the event.",
    content: ["Use high-quality images and videos to attract more interest."],
  },
  {
    id: "item-3",
    introTitle: "Highlight any VIP or special guests.",
    content: [
      "Regularly update the guest list to ensure accuracy.",
      "Use high-quality images and videos to attract more interest.",
    ],
  },
  {
    id: "item-4",
    introTitle:
      "Allow marketers and sellers to apply for a slot at your event.",
    content: [
      "Offer various slot sizes to accommodate different vendor needs.",
      "Consider offering early bird discounts or package deals for multiple slots.",
    ],
  },
  {
    id: "item-5",
    introTitle:
      "Tick to confirm you have read and accepted Plugin's refund policy.",
    content: [
      "Ensure you fully understand the refund policy before confirming.",
      "Contact Plugin support if you have any questions about the policy.",
    ],
  },
];

export const guestList: GuestListType[] = [];

export const vendorList: VendorListType[] = [];

export const AgendaLists: AgendaListsType[] = [];

export const SeatSectionLists: SeatSectionListsType[] = [];
