import Layout from "@/components/layout";
import Logo from "@/components/Logo";
import OTPVerification from "@/components/page-components/auth/OTPVerification";
import VerificationVisual from "@/components/page-components/auth/VerificationVisual";
import Container from "@/tw-components/container";
import React from "react";

const Verification = () => {
  return (
    <Layout title="Verification">
      <div className="h-screen flex">
        <VerificationVisual />
        <div className="bg-[#281E17] w-full lg:w-5/12 md:px-16 pt-20">
          <Container>
            <Logo white />

            <h3 className="mt-12 text-white text-3xl font-pally-medium">
              Login Verification
            </h3>
            <p className="text-[#98A2B3] mt-2 font-pally-regular text-sm">
              Enter the login verification code we just sent to your email
              address.
            </p>
            <OTPVerification />
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Verification;
