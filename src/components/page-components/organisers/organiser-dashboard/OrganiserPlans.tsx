import { Button } from "@/components/ui/button";
import { toFiat } from "@/lib/amount";
import Container from "@/tw-components/container";
import { HiOutlineCheck } from "react-icons/hi";

interface PlanFeature {
  id: number;
  name: string;
  platforms: string | number;
  price: number;
  impression: string | number;
  targeting: string | number;
  duration: string;
  addOns: string;
  bgColor: string;
}

const features: PlanFeature[] = [
  {
    id: 1,
    name: "Basic Plan",
    price: 7000,
    platforms: "Facebook, Instagram",
    impression: "1,000",
    targeting: "Basic (age, location, interests)",
    duration: "7 days",
    addOns: "+₦5,00 for 500 more impressions",
    bgColor: "#C7DFFE",
  },
  {
    id: 2,
    name: "Pro Plan",
    price: 27000,
    platforms: "Facebook, Instagram, Twitter",
    impression: "5,000",
    targeting: "Advanced (demographics, behavior",
    duration: "14 days",
    addOns: "+₦20,000 for 7 extra days",
    bgColor: "#FCE0EB",
  },
  {
    id: 3,
    name: "Premium Plan",
    price: 70000,
    platforms: "All Social Media, Google Ads, Email",
    impression: "15,000",
    targeting: "Comprehensive (custom audiences)",
    duration: "30 days",
    addOns: "+₦30,000 for high-priority placements",
    bgColor: "#ECD7F8",
  },
];

const OrganiserPlans = () => {
  return (
    <Container>
      <div className="w-full max-w-7xl mx-auto p-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="rounded-xl border">
            <div className="bg-[#281E17] h-40 p-5 space-y-6 rounded-xl">
              <p className="font-pally-medium text-lg text-white">
                All Pricing Plans
              </p>
              <p className="font-pally-regular text-sm md:text-base text-[#BDB2BD]">
                Compare all pricing offers suitable for your Individual, team
                and enterprise needs
              </p>
            </div>
            <ul className="rounded-xl space-y-5 last:border-b-0">
              <li className="border-b py-4 text-center text-[#1D2739] font-pally-medium text-lg">
                Platforms
              </li>
              <li className="border-b py-4 text-center text-[#1D2739] font-pally-medium text-lg">
                Impressions
              </li>
              <li className="border-b py-4 text-center text-[#1D2739] font-pally-medium text-lg">
                Targeting
              </li>
              <li className="border-b py-4 text-center text-[#1D2739] font-pally-medium text-lg">
                Duration
              </li>
              <li className="border-b last:border-none  py-4 text-center text-[#1D2739] font-pally-medium text-lg">
                Add-ons
              </li>
            </ul>
          </div>

          {features.map((item, index) => (
            <div key={index} className="rounded-xl border">
              <div
                style={{ backgroundColor: item.bgColor }}
                className=" p-5 space-y-6 rounded-xl h-40"
              >
                <div >
                  <p className="font-pally-medium text-base md:text-lg text-[#344054]">
                    Basic Plan
                  </p>
                  <p className="font-pally-bold text-lg md:text-2xl ">
                    {toFiat(item.price)}
                  </p>
                </div>
                <Button variant="secondary" className="block mb-2">Choose Plan</Button>
              </div>
              <ul className="rounded-xl space-y-5 last:border-b-0">
                <li className="border-b h-16 py-4 text-center text-[#1D2739] font-pally-regular text-base">
                  {item.platforms}
                </li>
                <li className="border-b h-16 py-4 text-center text-[#1D2739] font-pally-regular text-base">
                  {item.impression}
                </li>
                <li className="border-b h-16 py-4 text-center text-[#1D2739] font-pally-regular text-base text-wrap">
                  {item.targeting}
                </li>
                <li className="border-b h-16 py-4 text-center text-[#1D2739] font-pally-regular text-base">
                  {item.duration}
                </li>
                <li className="border-b h-16 last:border-none  py-4 text-center text-[#1D2739] font-pally-regular text-base">
                  {item.addOns}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OrganiserPlans;
