"use client";
import Layout from "@/components/layout";
import Container from "@/tw-components/container";
import Image from "next/image";
import React from "react";

const PaymentSuccessful = () => {
  return (
    <Layout title="Payment successful" showHeader showFooter>
      <Container>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="hidden lg:block w-40 lg:w-1/2 h-[10vh] lg:h-[60vh] relative ">
            <Image
              src={"/images/blue-bg.png"}
              fill
              alt="Ticket thumbnail"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="lg:h-[40vh] flex flex-col justify-center items-center my-6 lg:my-10 p-6 w-full lg:w-1/2 mx-auto">
            <Image
              src={"/gif/confetti.gif"}
              width={200}
              height={40}
              alt="confetti"
            />

            <p className="font-pally-medium text-2xl pb-3">
              Thanks for your order!
            </p>
            <p className="font-pally-regular mx-4 text-center text-sm lg:text-lg text-gray-600">
              You tickets will sent to{" "}
              <span className="text-black font-medium">
                oluchiMiracle@gmail.com
              </span>
            </p>

            <p className="text-sm text-[#667185] my-6">Or downlaod it below</p>

            <ul>
              <li className="border p-4 rounded-xl flex gap-4">
                <Image
                  src={"/images/seagreen-bg.png"}
                  width={200}
                  height={40}
                  alt="QR code"
                  className="w-20 h-20 object-cover rounded-md"
                />

                <div className="space-y-1.5">
                  <p className="font-pally-medium text-base lg:text-xl">
                    Afro Nation 2023
                  </p>
                  <p className="font-pally-regular text-[#586170] text-sm ">
                    Silverbird cinemas gallery, Udoudoma Avenue, U Akwa Ibom
                  </p>
                  <p className="font-pally-regular text-sm text-red-600">
                  Sat, Sept 17, 10:00AM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentSuccessful;
