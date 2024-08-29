import Link from "next/link";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const CheckoutContactInfo = () => {
  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl font-pally-medium text-[#2C2B2E]">
        Contact Information
      </h1>
      <div className="flex gap-2 mt-1.5">
        <p className="text-[#98A2B3] font-pally-regular">
          Already have an account?
        </p>
        <Link href={"/login"} className="destructive font-pally-medium">
          Login
        </Link>
      </div>
      <CheckoutForm/>
    </div>
  );
};

export default CheckoutContactInfo;
