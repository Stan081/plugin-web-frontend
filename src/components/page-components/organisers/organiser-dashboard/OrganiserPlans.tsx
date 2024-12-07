import { Button } from "@/components/ui/button";
import { toFiat } from "@/lib/amount";
import adPackagesData from "@/static-datas/ad-packages-data";
import Container from "@/tw-components/container";

export interface PlanFeature {
  id?: number;
  isAd: boolean;
  title: string;
  description?: string;
  bgColor: string;
  data: string[];
  pricing?: number;
}

function AdBanner({ details }: { details: PlanFeature }) {
  return (
    <div
      className={`p-5 ${
        details.title === "Social Media Ads" && "bg-[#C7DFFE]"
      } ${details.title === "Email Campaigns" && "bg-[#FCE0EB]"} ${
        details.title === "Sponsored Listings" && "bg-[#ECD7F8]"
      }  bg-none size-full flex flex-col justify-between`}
    >
      <div className="space-y-1">
        <p className="font-pally-medium text-2xl text-[#344054]">
          {details.title}
        </p>
        <p className="font-pally-bold text-3xl text-[#221D22]">
          {toFiat(details.pricing)}
        </p>
      </div>

      <div className="">
        <Button variant="outline" className=" border-[#D9302A] text-[#D9302A]">
          Choose Plan
        </Button>
      </div>
    </div>
  );
}

function PricingBanner() {
  return (
    <div className={`bg-[#281E17] p-5 size-full flex flex-col justify-center `}>
      <p className="font-pally-bold text-2xl text-white">All Pricing Plans</p>
      <p className="font-pally-regular leading-5 text-base text-[#BDB2BD]">
        Compare all pricing offers suitable for your Individual, team and
        enterprise needs
      </p>
    </div>
  );
}

const OrganiserPlans = () => {
  return (
    <Container>
      <div className="mb-10 xs:max-md:hidden mt-10 w-[90%] max-w-[1000px] mx-auto flex">
        {adPackagesData.map((ad) => {
          return (
            <div key={ad.title} className="group w-1/4 box-border">
              <div
                className={`group-first:rounded-l-xl group-last:rounded-r-xl group-first:border-l group-last:border-r w-full h-full max-h-[200px] overflow-hidden border-y border-[rgba(72,61,74,0.1)]`}
              >
                {ad.isAd ? <AdBanner details={ad} /> : <PricingBanner />}
              </div>
              <div
                className={`group-first:rounded-l-xl group-first:border-r-transparent group-last:rounded-r-xl group-last:border-r-[#483D4A]     mt-5 border border-r-transparent border-[#483D4A]`}
              >
                {ad.data.map((item) => {
                  return (
                    <p
                      key={item}
                      className="h-14 text-center flex items-center justify-center text-sm md:text-base font-pally-medium text-[#1D2739] even:border-y border-[#483D4A]"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default OrganiserPlans;
