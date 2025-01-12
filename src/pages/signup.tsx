"use client"
import Layout from "@/components/layout";
import Logo from "@/components/Logo";
import AuthVisual from "@/components/page-components/auth/AuthVisual";
import SignupAuth from "@/components/page-components/auth/SignupAuth";
import { getToken } from "@/lib/token";
import Container from "@/tw-components/container";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Signup = () => {
  const token = getToken()
  const router = useRouter()

  useEffect(() => {
    if(!token) return
    if(token) router.replace('/')
  }, [])
  return (
    <Layout title="Signup">
      <div className="h-screen flex">
        <AuthVisual />
        <div className="bg-[#281E17] w-full h-full lg:w-5/12 md:px-16 md:pt-20 pt-10">
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
