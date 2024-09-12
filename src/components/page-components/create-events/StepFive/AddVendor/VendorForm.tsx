"use client";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IoMdImages } from "react-icons/io";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VendorsForm, VendorFormSchema } from "@/models/create-event-schema";
import { Input } from "@/components/ui/input";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { vendorList } from "@/static-datas/create-event";
import { useCreateEventContext } from "@/providers/create_event.provider";

interface VendorFormProps {
  handleDelete: () => void;
}

const isSharedTypes: { id: boolean; name: string }[] = [
  {
    id: false,
    name: "No",
  },
  {
    id: true,
    name: "Yes",
  },
];

const VendorForm: FC<VendorFormProps> = ({ handleDelete }) => {
  const { handleIsChecked } = useCreateEventContext();
  const [vendorImage, setVendorImage] = useState<string | null>(null);
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);
  const [isSharedPass, setIsSharedPass] = useState<boolean>(false);
  // State to store the selected categories as an array of strings
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [slot, setSlot] = useState<number>(0);

  const form = useForm<VendorsForm>({
    mode: "all",
    defaultValues: {
      pass_thumbnail: "",
      shared_pass: isSharedPass,
      pass_tag: "",
      pass_price: 0,
      pass_category: [],
      available_slot: slot,
    },
    resolver: yupResolver(VendorFormSchema),
  });

  useEffect(() => {
    form.setValue("pass_category", selectedCategories);
  }, [selectedCategories, form.setValue]);

  useEffect(() => {
    form.setValue("available_slot", slot);
  }, [slot, form.setValue]);

  const isLoading = useMemo(() => form.formState.isSubmitting, [form]);

  // Handle image upload for banner
  const handleImageUploadBanner = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVendorImage(reader.result as string);
        form.setValue("pass_thumbnail", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image delete for image thumbnail
  const handleImageDelete = () => {
    setVendorImage(null);
    form.setValue("pass_thumbnail", "");
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.value = "";
    }
  };

  // Handle edit for vendor thumbnail
  const handleEditClick = () => {
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.click();
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(category)
          ? prevSelected.filter((item) => item !== category) // Remove category if it's already selected
          : [...prevSelected, category] // Add category if it's not selected
    );
  };

  // Function to handle deleting a selected category
  const handleDeleteSelected = (categoryToDelete: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.filter((category) => category !== categoryToDelete)
    );
  };

  //   handle increment on slot
  const handleIncrement = () => {
    setSlot((prev) => {
      return prev + 1;
    });
  };

  //   handle decrement on slot
  const handleDecrement = () => {
    setSlot((prev) => {
      if (prev < 1) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const onSubmit = useCallback(
    async (payload: VendorsForm) => {
      console.log(payload);
      vendorList.push({
        id: String(Math.floor(Math.random() * 100)),
        vendorImage: payload.pass_thumbnail,
        slot: payload.available_slot,
        pricePass: payload.pass_price,
        passCategories: payload.pass_category,
        passTag: payload.pass_tag,
      });

      handleDelete();

      handleIsChecked("addVendors");

      // Reset form back to default values
      form.reset({
        pass_thumbnail: "",
        shared_pass: isSharedPass,
        pass_tag: "",
        pass_price: 0,
        pass_category: [],
        available_slot: slot,
      });

      // Reset guest image state
      setVendorImage(null);

      // Clear the file input reference if necessary
      if (fileInputRefThumbnail.current) {
        fileInputRefThumbnail.current.value = "";
      }
    },
    [vendorList, handleDelete, form]
  );

  return (
    <div className="mb-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-4 w-full h-full"
        >
          <div className="">
            <div className="flex gap-8 mt-7">
              <FormItem className="w-full max-w-48 space-y-3">
                <FormField
                  control={form.control}
                  name="pass_thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="vendorImage-uploader">
                          {vendorImage ? (
                            <div className="relative">
                              <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden ">
                                <img
                                  src={vendorImage}
                                  alt="Uploaded"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="absolute inset-0 bg-black opacity-50"></div>

                              <div className="absolute right-5 bottom-0 z-10 text-center text-white p-4 flex gap-5">
                                <button
                                  type="button"
                                  onClick={handleEditClick}
                                  className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                >
                                  <FiEdit size={18} color="#000" />
                                </button>
                                <button
                                  type="button"
                                  onClick={handleImageDelete}
                                  className="outline outline-white/50 p-1.5 rounded-md bg-white"
                                >
                                  <HiOutlineTrash size={18} color="#000" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="py-9 bg-white/10 cursor-pointer rounded-lg">
                              <label htmlFor="file-input-thumbnail">
                                <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                                  <IoMdImages size={28} />
                                  <p className="font-pally-regular text-[#F58B86] underline">
                                    Add Photo
                                  </p>
                                  <p className="font-pally-medium text-[#F7D394] text-sm mx-5 text-center">
                                    ( JPEG, PNG, GIF, no larger than 10MB. )
                                  </p>
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <input
                        id="file-input-thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUploadBanner}
                        ref={(e) => {
                          field.ref(e);
                          fileInputRefThumbnail.current = e;
                        }}
                        style={{ display: "none" }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormLabel className="mt-3 text-white font-pally-medium">
                  Pass Thumbnail ( optional )
                </FormLabel>
              </FormItem>
              <div className="w-full space-y-4">
                <div className="flex justify-start items-baseline gap-4">
                  <p className="font-pally-regular text-base md:text-lg">
                    Is this a shared Pass
                  </p>
                  <div className="flex flex-wrap gap-4 mt-5 text-white">
                    {isSharedTypes.map(
                      (type: { id: boolean; name: string }, index) => (
                        <button
                          key={index}
                          onClick={() => setIsSharedPass(!isSharedPass)}
                          className={`py-2 px-4 rounded-full border ${
                            isSharedPass === type.id
                              ? "bg-white text-black"
                              : "border-white"
                          }`}
                        >
                          {type.name}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <FormItem className="w-full">
                  <FormLabel className="text-white" htmlFor="vendor-pass">
                    Vendor Pass Tag
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="pass_tag"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="eg. ( Phone Booth, shared space )"
                            type="text"
                            id="vendor-pass"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>

                <FormItem>
                  <FormLabel className="text-white">
                    Pass Category ( Optional )
                  </FormLabel>
                  <div className="my-4 flex gap-3">
                    {selectedCategories.length > 0 &&
                      selectedCategories.map((cat) => (
                        <p
                          key={cat}
                          className="flex border border-white rounded py-0.5 px-1.5 items-center gap-2"
                        >
                          {cat}
                          <span
                            onClick={() => handleDeleteSelected(cat)}
                            className="cursor-pointer text-red-500"
                          >
                            x
                          </span>
                        </p>
                      ))}
                  </div>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger className="border h-10 py-1 flex justify-between bg-white text-black items-center gap-2 rounded-md p-2 w-full">
                      <SelectValue placeholder="pick a category" />
                    </SelectTrigger>
                    <SelectContent className="w-full border z-40 bg-primary-foreground rounded-sm bg-white">
                      {["drinks", "Food"].map((category, index) => (
                        <SelectItem key={index} value={category}>
                          <div className="flex items-center gap-2">
                            {category}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>

                <FormItem className="w-full">
                  <FormLabel className="text-white" htmlFor="price-pass">
                    Price Per Pass
                  </FormLabel>
                  <FormField
                    control={form.control}
                    name="pass_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="₦ Enter amount"
                            type="number"
                            id="price-pass"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-pally-regular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormItem>

                <div>
                  <p className="font-pally-regular text-white">
                    Slot Available
                  </p>
                  <div className="mt-3 flex gap-4">
                    <div
                      onClick={handleDecrement}
                      className={` w-8 h-8 text-center text-xl rounded bg-white text-black hover:bg-white/90 cursor-pointer`}
                    >
                      -
                    </div>
                    <div className="w-16 h-8 text-center flex justify-center items-center rounded bg-white text-black ">
                      {slot}
                    </div>
                    <div
                      onClick={handleIncrement}
                      className={` w-8 h-8 text-center text-xl rounded bg-white text-black hover:bg-white/90 cursor-pointer`}
                    >
                      +
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    onClick={handleDelete}
                    className="p-2 rounded flex justify-center items-center bg-[#463B34] w-12 cursor-pointer"
                  >
                    <HiOutlineTrash size={20} color="#F9B6B1" />
                  </div>
                  <button
                    type="submit"
                    className="p-2.5 rounded-lg w-full border border-white text-white hover:bg-[#463B34]"
                  >
                    Create Pass
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VendorForm;
