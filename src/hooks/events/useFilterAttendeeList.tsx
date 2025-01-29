import { fetchFilteredAttendeeList } from "@/pages/api/query/events/filterAttenderrList";
import { useQuery } from "@tanstack/react-query";

// export type FilterParams = {
//   minPrice?: number;
//   maxPrice?: number;
//   locationType?: string;
//   eventType?: string;
//   startDate?: any;
//   endDate?: any;
//   page?: number;
//   eventName?: string;
// };

export const useFilteredAttendeeList = (eventId: string) => {
  return useQuery({
    queryKey: ["filteredAttendeeList", eventId],
    queryFn: () => fetchFilteredAttendeeList(eventId),
    // enabled: !!filters,
    retry: true
  });
};
