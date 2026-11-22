// export const toFiat = (
//     amount: number,
//     locale: string = 'en-US',
//     currency: string = 'NGN'
//   ): string => {
//     const formatter = new Intl.NumberFormat(locale, {
//       style: 'currency',
//       currency: currency,
//     });

//     return formatter.format(amount);
//   };

export const toFiat = (value: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("NGN", "₦");
};

type SortableGroupedTicket = {
  _id?: string;
  groupedTicketType?: string;
  ticketPrice?: number | string;
  ticketsSold?: number;
  ticketQuantity?: number;
};

// Price a grouped ticket is displayed at (free tickets show as 0 regardless of ticketPrice).
export const getGroupedTicketPrice = (ticket: SortableGroupedTicket): number =>
  ticket?.groupedTicketType === "paid" ? Number(ticket?.ticketPrice) || 0 : 0;

// Same sold-out rule GroupedTicket uses for its "Sold out" badge.
export const isGroupedTicketSoldOut = (ticket: SortableGroupedTicket): boolean =>
  ticket?.ticketsSold != null &&
  ticket?.ticketQuantity != null &&
  ticket.ticketsSold >= ticket.ticketQuantity;

// Returns a new array of grouped tickets: available ones first, sold-out last,
// each group ordered cheapest first; ties keep their original order.
export const sortGroupedTicketsByPrice = <T extends SortableGroupedTicket,>(tickets: T[] | undefined): T[] =>
  [...(tickets ?? [])].sort(
    (a, b) =>
      Number(isGroupedTicketSoldOut(a)) - Number(isGroupedTicketSoldOut(b)) ||
      getGroupedTicketPrice(a) - getGroupedTicketPrice(b)
  );
