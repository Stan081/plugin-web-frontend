import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import VendorEmptyState from "./VendorEmptyState";

const AddVendor = () => {
  const [addVen, setAddVen] = useState<boolean>(false);
  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      <p className="font-pally-regular text-sm text-white/60">
        Create vendor pass for sale access at your events.
      </p>

      <Separator decorative />

      {addVen ? (
        <div>uui</div>
      ) : (
        <VendorEmptyState open={() => setAddVen(!addVen)} />
      )}
    </div>
  );
};

export default AddVendor;
