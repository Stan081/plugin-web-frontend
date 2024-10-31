import { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import VendorEmptyState from "./VendorEmptyState";
import VendorForm from "./VendorForm";
import {
  vendorList,
  VendorListType,
} from "@/static-datas/create-event";
import VendorCard from "./VendorCard";
import EditVendorForm from "./EditVendorForm";
import { useGetEventVendors } from "@/hooks/events/useGetEventVendors";
import { useDeleteVendor } from "@/hooks/events/useDeleteEventVendor";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

export enum VendorFormState {
  VIEW_LIST,
  CREATE_VENDOR,
  EDIT_VENDOR,
}

const AddVendor = () => {
  const { data: allVendor, isLoading } = useGetEventVendors();
  const { mutate: deleteVendor, isPending: isPendingVendor } =
    useDeleteVendor();

  const [formState, setFormState] = useState<VendorFormState>(
    VendorFormState.VIEW_LIST
  );
  const [selectedVendor, setSelectedVendor] = useState<any | undefined>(
    undefined
  );

  // Function to handle form edit
  const handleEditForm = (id: number) => {
    const getEditVendor = allVendor?.data.find((list) => list._id === id);

    if (getEditVendor) {
      setSelectedVendor(getEditVendor);
    }
    setFormState(VendorFormState.EDIT_VENDOR);
  };

  // Function to return to the vendor list view
  const handleReturnToList = () => {
    setFormState(VendorFormState.VIEW_LIST);
  };

  // Function to handle delete
  const handleDelete = (id: number) => {
    deleteVendor({ vendorId: id });
  };

  if (isLoading)
    return <p className="text-white mx-5 text-center mt-5">loading...</p>;

  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      {isPendingVendor && <SpinnerOverlay />}
      <p className="font-pally-regular text-sm text-white/60">
        Create vendor pass for sale access at your events.
      </p>

      <Separator decorative />

      {formState === VendorFormState.CREATE_VENDOR ? (
        <VendorForm handleReturnToList={handleReturnToList} />
      ) : formState === VendorFormState.EDIT_VENDOR && selectedVendor ? (
        <EditVendorForm
          handleReturnToList={handleReturnToList}
          handleDelete={handleDelete}
          selectedVendor={selectedVendor}
        />
      ) : formState === VendorFormState.VIEW_LIST &&
        allVendor?.data.length !== 0 ? (
        <div className="my-3 flex flex-col gap-3 w-full">
          {allVendor?.data.map((list) => (
            <VendorCard
              key={list._id}
              {...list}
              _id={list._id}
              handleEditForm={handleEditForm}
              handleDelete={handleDelete}
            />
          ))}

          <button
            onClick={() => setFormState(VendorFormState.CREATE_VENDOR)}
            type="button"
            className="border border-dashed p-3 rounded-lg block mt-5 w-full hover:bg-[#423730]/50"
          >
            Create Pass
          </button>
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
