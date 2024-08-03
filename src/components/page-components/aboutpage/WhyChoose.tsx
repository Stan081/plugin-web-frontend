import Container from "@/tw-components/container";
import Image from "next/image";
import React from "react";

const items = [
  {
    id: "1",
    icon: "/images/icons/bulb.svg",
    title: "Innovation",
    description:
      "We continuously improve our platform to offer the best possible experience for both rganizers and attendees.",
  },
  {
    id: "2",
    icon: "/images/icons/eye.svg",
    title: "Transparency",
    description:
      "Clear pricing and no hidden fees, ensuring you know exactly what you’re getting.",
  },
  {
    id: "3",
    icon: "/images/icons/user-group.svg",
    title: "Community",
    description:
      "We’re passionate about supporting local events and helping communities come together.",
  },
  {
    id: "4",
    icon: "/images/icons/users.svg",
    title: "Customer-Centric",
    description:
      "Your satisfaction is our top priority. We listen to your feedback and strive to meet your needs.",
  },
];

const WhyChoose = () => {
  return (
    <Container className="py-8 px-4 md:py-20 md:px-0">
      <h2 className="text-3xl font-pally-medium text-center destructive">
        WHY CHOOSE PLUGIN?
      </h2>
      <h3 className="mt-5 text-xl md:text-3xl font-pally-regular md:font-pally-medium text-center md:max-w-4xl mx-auto">
        Choosing Plugin means partnering with a platform that understands the
        intricacies of event management and the importance of a great attendee
        experience.
      </h3>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-5xl mx-auto mt-9">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-4">
            <Image src={item.icon} width={56} height={56} alt={item.title} />
            <div className="space-y-3">
              <p className="text-lg md:text-xl font-pally-medium">
                {item.title}
              </p>
              <p className="text-[#475367] text-base md:text-lg font-pally-regular">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default WhyChoose;
