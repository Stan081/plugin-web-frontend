import { Separator } from "@/components/ui/separator";
import Container from "@/tw-components/container";
import ActiveProfileCard from "./ActiveProfileCard";



const OrganiserProfile = () => {

  return (
    <Container>
      <div className="mb-5">
        <p className="text-[#101928] font-pally-medium text-2xl">
          Organizer profiles
        </p>
        <p className="text-[#667185] mt-1 max-w-xl font-pally-regular text-base">
          Each profile describes a unique organizer and shows all of their
          events on one page. Having a complete profile can encourage attendees
          to follow you.
        </p>
      </div>

      <Separator />

      <ActiveProfileCard />
    </Container>
  );
};

export default OrganiserProfile;
