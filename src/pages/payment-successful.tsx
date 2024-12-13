import Layout from "@/components/layout";
import Container from "@/tw-components/container";
import Image from "next/image";
import React, { Fragment } from "react";

const PaymentSuccessful = () => {
  return (
    <Fragment>
      <Layout title="Payment successful" showHeader showFooter>
        <Container>
          <div className="flex justify-center items-center my-6 lg:my-10 border p-6 w-full max-w-md rounded-lg mx-auto">
            <Image
              src={"/public/gif/confetti.webm"}
              width={200}
              height={40}
              alt="confetti"
            />
          </div>
        </Container>
      </Layout>
    </Fragment>
  );
};

export default PaymentSuccessful;
