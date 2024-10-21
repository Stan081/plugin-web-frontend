export const organiserData = [
  {
    id: 1,
    organiser_name: "Socket Plugin",
    about_organiser:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, officia possimus impedit quisquam inventore delectus praesentium voluptates magni mollitia! Iste vitae, nisi non maiores provident quidem quaerat ducimus praesentium? Eum?",
    organiserEvents: [
      {
        id: 1,
        eventImage:
          "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image3.jpeg?updatedAt=1722389364580",
        eventName: "Good Venture Booky",
        startDate: new Date(),
        startTime: "7:00pm",
        ticketSale: 8,
        totalTicket: 40,
      },
      {
        id: 2,
        eventImage:
          "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583",
        eventName: "Made men champ",
        startDate: new Date(),
        startTime: "9:00 pm",
        ticketSale: 2,
        totalTicket: 80,
      },
    ],
  },
  {
    id: 2,
    organiser_name: "Plugin",
    about_organiser:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, officia possimus impedit quisquam inventore delectus praesentium voluptates magni mollitia! Iste vitae, nisi non maiores provident quidem quaerat ducimus praesentium? Eum?",
    organiserEvents: [
      {
        id: 1,
        eventImage:
          "https://ik.imagekit.io/pluginImage/Plugin-images/laughing%20people%20in%20party.jpg?updatedAt=1722860712860",
        eventName: "",
        startDate: new Date().getDay(),
        startTime: "7:00pm",
        ticketSale: 8,
        totalTicket: 40,
      },
    ],
  },
];


export type OrganiserEventCardProps = {
  id: string;
  eventImage: string;
  eventName: string;
  startDate?: Date;
  startTime?: string;
  ticketSale: number;
  totalTicket: number;
}

export const organiserEvents = [
  {
    id: '1',
    eventImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image3.jpeg?updatedAt=1722389364580",
    eventName: "Good Venture Booky",
    startDate: new Date(),
    startTime: "7:00pm",
    ticketSale: 8,
    totalTicket: 40,
  },
  {
    id: '2',
    eventImage:
      "https://ik.imagekit.io/pluginImage/Plugin-images/hero-image2.jpeg?updatedAt=1722389363583",
    eventName: "Made men champ",
    startDate: new Date(),
    startTime: "9:00 pm",
    ticketSale: 57,
    totalTicket: 80,
  },
]
