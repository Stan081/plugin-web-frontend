"use client"
import Layout from "@/components/layout";
import Logo from "@/components/Logo";
import OTPLoginVerification from "@/components/page-components/auth/OTPLoginVerification";
import VerificationVisual from "@/components/page-components/auth/VerificationVisual";
import { getToken } from "@/lib/token";
import Container from "@/tw-components/container";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginVerification = () => {
  const token = getToken()
  const router = useRouter()

  useEffect(() => {
    if(!token) return;
    if(token) router.replace('/');
  }, [])
  return (
    <Layout title="Verification">
      <div className="h-screen flex">
        <VerificationVisual />
        <div className="bg-[#281E17] w-full lg:w-1/2 md:px-16 pt-6 lg:pt-20">
          <Container>
            <Logo white />

            <h3 className="mt-12 text-white text-3xl font-pally-medium">
              Login Verification
            </h3>
            <p className="text-[#98A2B3] mt-2 font-pally-regular text-sm">
              Enter the login verification code we just sent to your email
              address.
            </p>
            <OTPLoginVerification />
          </Container>
        </div>
      </div>
    </Layout>
  );
};

export default LoginVerification;
