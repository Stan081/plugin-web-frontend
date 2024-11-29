import {
  fetchFilteredEvents,
} from "@/pages/api/query/events/filterEvent";
import { useQuery } from "@tanstack/react-query";


type FilterParams = {
  minPrice?: number;
  maxPrice?: number;
  locationType?: string;
  eventType?: string;
}

export const useFilteredEvents = (filters: FilterParams) => {

  return useQuery({
    queryKey: ["filteredEvents", filters],
    queryFn: () => fetchFilteredEvents(filters),
    enabled: !!filters, // Only run query if filters are set
    // retry: true
  });
};
