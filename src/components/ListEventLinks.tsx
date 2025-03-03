import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RiArrowDownSLine } from "react-icons/ri";
import ListAdd from "./icons/list-add";
import Grid2 from "./icons/grid-2";
import Money2 from "./icons/money-2";
import Link from "next/link";
import { useMe } from "@/pages/api/query/me";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useRouter } from "next/navigation";

const ListEvent = () => {
  const { handleProtectedNavigation } = useAuthRedirect();
  const { data: userDate } = useMe();
  const router = useRouter()

  const eventlists = [
    ...((false)
      ? []
      : [
          {
            slug: 'create_events',
            name: "Create events",
            description: "List your event",
            icon: <ListAdd />,
            bgColor: "bg-[#FBDFD2]",
            link: "/create-event",
          },
        ]),
    {
      slug: 'features',
      name: "Features",
      description: "Discover the benefits of Plugin",
      icon: <Grid2 />,
      bgColor: "bg-[#E4C9FF]",
      link: "/features",
    },
    {
      slug: 'pricing',
      name: "Pricing",
      description: "Explore the planning price",
      icon: <Money2 />,
      bgColor: "bg-[#C9F8FF]",
      link: "/pricing",
    },
  ];

  const handleRedirect = (slug: string, link: string) => {
    if(slug === 'create_events'){
      handleProtectedNavigation(link)
    }else {
      router.push(link)
    }
  }
  return (
    <Popover>
      <PopoverTrigger>
        <p className="text-[#586170] font-pally-regular text-base md:text-lg flex items-center hover:underline whitespace-nowrap">
          List an Event <RiArrowDownSLine className="ml-2" />
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-white rounded-xl p-3">
        <ul className="space-y-5">
          {eventlists.map((list, index) => (
            <li
              key={index}
              onClick={() => handleRedirect(list?.slug, list.link)}
              className="hover:bg-gray-100 py-2.5 px-4 rounded-lg transition delay-75 ease-in-out cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-7 h-7 rounded-full p-6 ${list.bgColor} flex justify-center items-center`}
                >
                  {list.icon}
                </div>
                <div>
                  <p className="text-[#001633] font-pally-medium text-base md:text-lg">
                    {list.name}
                  </p>
                  <p className="text-[#586170] font-pally-regular text-base md:text-lg">
                    {list.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ListEvent;
