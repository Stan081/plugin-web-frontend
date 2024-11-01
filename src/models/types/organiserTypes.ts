export type OrganiserEvent = {
  id: number | string;
  eventImage: string;
  eventName: string;
  startDate: Date | string;
  startTime: string;
  ticketSale: number;
  totalTicket: number;
};

export type OrganiserTypes = {
  id: string | number;
  organiserName: string;
  aboutOrganiser: string | undefined;
  organiserEvents: OrganiserEvent[];
};
