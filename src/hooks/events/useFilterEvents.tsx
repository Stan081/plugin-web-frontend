import { fetchFilteredEvents } from "@/pages/api/query/events/filterEvent";
import { useQuery } from "@tanstack/react-query";

export type FilterParams = {
  minPrice?: number;
  maxPrice?: number;
  locationType?: string;
  eventType?: string;
  startDate?: any;
  endDate?: any;
  page?: number;
  eventName?: string;
};

export const useFilteredEvents = (filters: FilterParams) => {
  return useQuery({
    queryKey: ["filteredEvents", filters],
    queryFn: () => fetchFilteredEvents(filters),
    enabled: !!filters,
    retry: true
  });
};
