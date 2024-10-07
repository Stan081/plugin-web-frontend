enum Visibility {
  Public = "Public View",
  Private = "Private View",
}

export type EventStatus = 'upcoming' | 'drafts' | 'past';

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  visibility: Visibility;
  ticketsSold: number;
  totalTickets: number;
  imageUrl: string;
  status: EventStatus;
};

export const eventData: Event[] = [
  {
    id: 1,
    title: "Sip and paint with Wakky taisk",
    date: "Saturday , September 7th, 2023 @ 7:30pm GMT",
    location: "Lagos, Nigeria",
    visibility: Visibility.Public,
    ticketsSold: 2,
    totalTickets: 40,
    imageUrl: "/images/afro-nation.png",
    status: 'upcoming',
  },
  {
    id: 2,
    title: "Sip and paint with Wakky taisk",
    date: "Saturday , September 7th, 2023 @ 7:30pm GMT",
    location: "Lagos, Nigeria",
    visibility: Visibility.Private,
    ticketsSold: 2,
    totalTickets: 40,
    imageUrl: "/images/afro-nation.png",
    status: 'upcoming',
  },
  {
    id: 3,
    title: "Sip and paint with Wakky taisk",
    date: "Saturday , September 7th, 2023 @ 7:30pm GMT",
    location: "Lagos, Nigeria",
    visibility: Visibility.Public,
    ticketsSold: 2,
    totalTickets: 40,
    imageUrl: "/images/afro-nation.png",
    status: 'drafts',
  },
  {
    id: 4,
    title: "Sip and paint with Wakky taisk",
    date: "Saturday , September 7th, 2023 @ 7:30pm GMT",
    location: "Lagos, Nigeria",
    visibility: Visibility.Public,
    ticketsSold: 2,
    totalTickets: 40,
    imageUrl: "/images/afro-nation.png",
    status: 'past',
  },
];