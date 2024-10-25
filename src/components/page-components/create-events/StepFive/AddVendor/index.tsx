import { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import VendorEmptyState from "./VendorEmptyState";
import VendorForm from "./VendorForm";
import {
  vendorList as staticVendorList,
  VendorListType,
} from "@/static-datas/create-event";
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
  const [vendorListState, setVendorListState] = useState<VendorListType[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<
    VendorListType | undefined
  >(undefined);
  const [nextId, setNextId] = useState<number>(Date.now()); // ID generator

  // Initialize the vendor list
  useEffect(() => {
    setVendorListState(staticVendorList);
  }, []);

  // Function to handle form edit
  const handleEditForm = (id: number) => {
    const getEditVendor = vendorListState.find((list) => list.id === id);

    if (getEditVendor) {
      setSelectedVendor(getEditVendor);
      setFormState(VendorFormState.EDIT_VENDOR);
    }
  };

  // Function to handle creating a new vendor
  const handleCreateVendor = (vendorData: VendorListType) => {
    const newVendor = { ...vendorData, id: nextId }; // Ensure each vendor has a unique ID
    setVendorListState((prevList) => [...prevList, newVendor]); // Add new vendor to state
    setNextId(Date.now()); // Update nextId to ensure uniqueness
    setFormState(VendorFormState.VIEW_LIST);
  };

  // Function to return to the vendor list view
  const handleReturnToList = () => {
    setFormState(VendorFormState.VIEW_LIST);
  };

  // Function to handle delete
  const handleDelete = (id: number) => {
    const updatedList = vendorListState.filter((vendor) => vendor.id !== id);
    setVendorListState(updatedList); // Update state
    setFormState(VendorFormState.VIEW_LIST);
  };

  const handleSubmit = useCallback(() => {
    console.log(vendorListState)
  }, [vendorListState]);

  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      <p className="font-pally-regular text-sm text-white/60">
        Create vendor pass for sale access at your events.
      </p>

      <Separator decorative />

      {formState === VendorFormState.CREATE_VENDOR ? (
        <VendorForm
          handleReturnToList={handleReturnToList}
          handleCreateVendor={handleCreateVendor}
        />
      ) : formState === VendorFormState.EDIT_VENDOR && selectedVendor ? (
        <EditVendorForm handleDelete={handleDelete} handleReturnToList={handleReturnToList} {...selectedVendor} />
      ) : formState === VendorFormState.VIEW_LIST &&
        vendorListState.length !== 0 ? (
        <div className="my-3 flex flex-col gap-3 w-full">
          {vendorListState.map((list) => (
            <VendorCard
              key={list.passTag}
              {...list}
              handleEditForm={handleEditForm}
              handleDelete={handleDelete} // Pass delete handler to VendorCard if necessary
            />
          ))}

          <div className="mt-4 flex justify-between gap-5">
            <button
              onClick={() => setFormState(VendorFormState.CREATE_VENDOR)}
              type="button"
              className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50 md:w-32"
            >
              Create Pass
            </button>

            <Button onClick={handleSubmit} variant="destructive">Save</Button>
          </div>
        </div>
      ) : (
        <VendorEmptyState
          open={() => setFormState(VendorFormState.CREATE_VENDOR)}
        />
      )}
    </div>
  );
};

export default AddVendor;
