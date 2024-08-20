import Layout from "@/components/layout";
import Logo from "@/components/Logo";
import AuthVisual from "@/components/page-components/auth/AuthVisual";
import SignupAuth from "@/components/page-components/auth/SignupAuth";
import Container from "@/tw-components/container";
import React from "react";

const Signup = () => {
  return (
    <Layout title="Signup">
      <div className="h-screen flex">
        <AuthVisual />
        <div className="bg-[#281E17] w-full h-full lg:w-5/12 md:px-16 pt-20">
          <Container>
            <Logo white />

            <h3 className="mt-12 text-white text-3xl font-pally-medium">
              Get Started
            </h3>
            <SignupAuth />
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
