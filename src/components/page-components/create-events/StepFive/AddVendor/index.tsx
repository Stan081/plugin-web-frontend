import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import VendorEmptyState from "./VendorEmptyState";
import VendorForm from "./VendorForm";
import { vendorList, VendorListType } from "@/static-datas/create-event";
import VendorCard from "./VendorCard";
import { Button } from "@/components/ui/button";
import EditVendorForm from "./EditVendorForm";

export enum VendorFormState {
  VIEW_LIST,
  CREATE_VENDOR,
  EDIT_VENDOR,
}

const AddVendor = () => {
  const [formState, setFormState] = useState<VendorFormState>(
    VendorFormState.VIEW_LIST
  );
  const [vendorListState, setVendorListState] = useState<
    VendorListType | undefined
  >(undefined);

  // Function to handle form edit
  const handleEditForm = (id: string) => {
    const getEditVendor = vendorList.find((list) => list.id === id);

    if (getEditVendor) {
      setVendorListState(getEditVendor);
      setFormState(VendorFormState.EDIT_VENDOR);
    }
  };

  // Function to handle creating a new vendor
  const handleCreateVendor = () => {
    setFormState(VendorFormState.CREATE_VENDOR);
  };

  // Function to return to the vendor list view
  const handleReturnToList = () => {
    setFormState(VendorFormState.VIEW_LIST);
  };

  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      <p className="font-pally-regular text-sm text-white/60">
        Create vendor pass for sale access at your events.
      </p>

      <Separator decorative />

      {formState === VendorFormState.CREATE_VENDOR ? (
        <VendorForm handleDelete={handleReturnToList} />
      ) : formState === VendorFormState.EDIT_VENDOR && vendorListState ? (
        <EditVendorForm handleDelete={handleReturnToList} {...vendorListState} />
      ) : formState === VendorFormState.VIEW_LIST && vendorList.length !== 0 ? (
        <div className="my-3 flex flex-col gap-3 w-full">
          {vendorList.map((list) => (
            <VendorCard
              key={list.id}
              {...list}
              handleEditForm={handleEditForm}
            />
          ))}

          <div className="mt-4 flex justify-between gap-5">
            <button
              onClick={handleCreateVendor}
              type="button"
              className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50 md:w-32"
            >
              Create Pass
            </button>

            <Button variant="destructive">Save</Button>
          </div>
        </div>
      ) : (
        <VendorEmptyState open={handleCreateVendor} />
      )}
    </div>
  );
};

export default AddVendor;
