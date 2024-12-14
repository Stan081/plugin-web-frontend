"use client";
import React, { useEffect } from "react";
import Container from "@/tw-components/container";
import StepOne from "@/components/page-components/create-events/StepOne";
import StepTwo from "@/components/page-components/create-events/StepTwo";
import StepThree from "@/components/page-components/create-events/StepThree";
import StepFour from "@/components/page-components/create-events/StepFour";
import StepFive from "@/components/page-components/create-events/StepFive";
import StepSix from "@/components/page-components/create-events/StepSix";
import StepSeven from "@/components/page-components/create-events/StepSeven";
import { getToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import { useMe } from "../api/query/me";
import { useCreateEventContext } from "@/providers/create_event.provider";
import ProfileFormModal from "@/components/page-components/organisers/organiser-dashboard/organiser-settings/ProfileFormModal";
import { Section } from "@/tw-components/Section";
import { getCookie } from "@/lib/cookies";

export default function CreateEvent() {
  const { data: userDate } = useMe();
  const { currentStep, setShowProfileForm, showProfileForm } =
    useCreateEventContext();

  const token = getToken();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      return router.push("/login");
    }
    return;
  }, [router]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      case 6:
        return <StepSix />;
      case 7:
        return <StepSeven />;
      default:
        return;
    }
  };
  return (
    <Section className="bg-[#f0ded1] lg:h-screen bg-no-repeat">
      {userDate?.data?.role === "organizer" && userDate?.data?.isOrganizer && (
        <OrganiserHeader />
      )}
      {showProfileForm && (
        <ProfileFormModal
          open={showProfileForm}
          close={() => setShowProfileForm(!showProfileForm)}
        />
      )}
      <Container className="px-0 py-3 lg:pt-6">
        <div className="scrollbar-hide ">{renderStepContent()}</div>
      </Container>
    </Section>
  );
}
