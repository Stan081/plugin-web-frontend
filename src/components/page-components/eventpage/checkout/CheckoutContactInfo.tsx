
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { getToken } from "@/lib/token";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export type CheckoutProps = {
  eventId?: string;
};
const CheckoutContactInfo = ({ eventId }: CheckoutProps) => {
  const { handleProtectedNavigation } = useAuthRedirect();
  const token = getToken();
  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl font-pally-medium text-[#2C2B2E]">
        Contact Information
      </h1>
      {!token && (
        <div className="flex gap-2 mt-1.5">
          <p className="text-[#98A2B3] font-pally-regular">
            Already have an account?
          </p>
          <p
            onClick={() =>
              handleProtectedNavigation(`explore-events/${eventId}/checkout`)
            }
            className="destructive font-pally-medium"
          >
            Login
          </p>
        </div>
      )}
      <CheckoutForm eventId={eventId} />
    </div>
  );
};

export default CheckoutContactInfo;
