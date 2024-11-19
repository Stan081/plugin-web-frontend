import { BreadcrumbProps } from "@/components/BreadcrumbComponent";

type Breadcrumb = {
  href?: string;
  name: string;
};

// Breadcrums for tickets
export const ticketbreadcrumbArr = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/tickets",
    name: "Tickets",
  },
  {
    name: "Current Compoennt",
  },
];

export const exlporeEventsbreadcrumbArr = [
  {
    href: "/explore-events",
    name: "Expore Events",
  },
  {
    name: "",
  },
];

export const checkoutBreadcrumbArr = (title: string, id: string): BreadcrumbProps[] => {
  return [
    {
      href: "/explore-events",
      name: "Explore Events",
    },
    {
      href: `/explore-events/${id}`,
      name: title,
    },
    {
      name: "Checkout",
    },
  ];
};
