export type CardProps = {
  id?: string;
  image: string;
  eventType: string;
  title: string;
  date: string;
  location: string;
  priceRange: string;
};

export const cardData: CardProps[] = [
  {
    id: "1",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Designer's Connect",
    location: 'Silverbird cinemas gallery, Udoudoma Avenue,',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000',
  },
  {
    id: "2",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Socket Connect",
    location: 'Silverbird cinemas gallery, Udoudoma Avenue,',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000'
  },
  {
    id: "3",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Partie's Connect",
    location: 'Silverbird cinemas gallery, Udoudoma Avenue,',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000'
  },
  {
    id: "4",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Stan's Connect",
    location: 'Silverbird cinemas gallery, Udoudoma Avenue,',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000'
  },
  {
    id: "5",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Plugin's Connect",
    location: 'Silverbird cinemas gallery, Udoudoma Avenue,',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000'
  },
  {
    id: "6",
    image: "/images/seagreen-bg.png",
    eventType: "Concert",
    title: "Outdoor's Connect",
    location: 'Silverbird cinemas gallery, Udoudoma Avenue,',
    date: "Sat, Sept 17, 10:00AM",
    priceRange: '₦3,000 - ₦75,000'
  },
];
