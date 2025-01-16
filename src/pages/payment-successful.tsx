import Layout from "@/components/layout";
import Container from "@/tw-components/container";
import Image from "next/image";
import React, { Fragment } from "react";

const PaymentSuccessful = () => {
  return (
    <Fragment>
      <Layout title="Payment successful" showHeader showFooter>
        <Container>
          <div className="lg:h-[40vh] flex flex-col justify-center items-center my-6 lg:my-10 border p-6 w-full max-w-md rounded-lg mx-auto">
            <Image
              src={"/gif/confetti.gif"}
              width={200}
              height={40}
              alt="confetti"
            />

            <p className="font-pally-medium text-2xl pb-3">Payment successful</p>
            <p className="font-pally-regular mx-4 text-center lg:text-xl text-gray-600">
              Your tikcket purchase is successful, check your email for more
              information on the transaction
            </p>
          </div>
        </Container>
      </Layout>
    </Fragment>
  );
};

export default PaymentSuccessful;
