export const timezone = ["(GMT+01:00) West Africa Standard Time - Lagos"];

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
  id: string;
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
  isHost: boolean;
  agendaTitle: string;
  agendaDescription: string;
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
