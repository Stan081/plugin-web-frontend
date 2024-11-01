export type CardProps = {
  id: string;
  image: string;
  eventType?: string;
  title: string;
  date?: string;
  location?: string;
  priceRange?: string;
  type?: 'upcoming' | 'past';
};

export const cardData: CardProps[] = [
  {
    id: "1",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Designer's Connect lopping, Adeyaga",
    location: 'Abuja',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
    type: 'upcoming'
  },
  {
    id: "2",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Socket Connect",
    location: 'Abuja',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
    type: 'past'
  },
  {
    id: "3",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Partie's Connect",
    location: 'Abuja',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
    type: 'upcoming',
  },
  {
    id: "4",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Stan's Connect",
    location: 'Abuja',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
    type: 'upcoming',
  },
  {
    id: "5",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Plugin's Connect",
    location: 'Abuja',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
    type: 'upcoming',
  },
  {
    id: "6",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Outdoor's Connect",
    location: 'Abuja',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
    type: 'upcoming',
  },
  {
    id: "7",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Outdoor's Connect",
    location: 'Abuja',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
    type: 'past',
  },
];
