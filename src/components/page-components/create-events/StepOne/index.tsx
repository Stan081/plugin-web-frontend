"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import { Button } from "@/components/ui/button";
import { IoMdImages } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { HiOutlineTrash } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { Textarea } from "@/components/ui/textarea";
import { uploadImageGC } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventBasicInfo } from "@/pages/api/mutate/create-events/eventBasicInfo";
import { useToast } from "@/components/ui/use-toast";
import { getCookie, setCookie } from "@/lib/cookies";
import Spinner from "@/tw-components/spinner";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useMe } from "@/pages/api/query/me";
import { useEditProfileRole } from "@/hooks/useEditProfileRole";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useUpdateBasicInfo } from "@/hooks/events/useUpdateBasicInfo";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import { Label } from "@/components/ui/label";

const pageContents = [
  "Make your event name short and memorable.",
  "Focus on unique aspects to make your description engaging.",
];

const StepOne: React.FC = () => {
  const { nextStep: next } = useCreateEventContext();
  const { data: userData } = useMe();
  const { mutate: mutateRole, isPending: isPendingRole } = useEditProfileRole();
  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useUpdateBasicInfo();
  const { data: event, isLoading: loadingEvent } = useGetEvent();
  const [eventName, setEventName] = useState<string>(
    event?.data?.eventName ?? ""
  );
  const [eventDescription, setEventDescription] = useState<string>(
    event?.data?.eventDescription ?? ""
  );
  const [imageBanner, setImageBanner] = useState<string | null>(
    event?.data?.eventBanner ?? null
  );
  const [imageThumbnail, setImageThumbnail] = useState<string | null>(
    event?.data?.thumbnail ?? null
  );
  const fileInputRefBanner = useRef<HTMLInputElement | null>(null);
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<any>({
    nameError: "",
    descriptionError: "",
    bannerError: "",
    thumbnailError: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    if (event?.data) {
      setImageBanner(event.data.eventBanner ?? "");
      setImageThumbnail(event.data.thumbnail ?? "");
      setEventName(event.data.eventName ?? "");
      setEventDescription(event.data.eventDescription ?? "");
      setImageBanner(event.data.eventBanner || null);
      setImageThumbnail(event.data.thumbnail || null);
    }
  }, [event]);

  const client = useQueryClient();
  const eventID = getCookie("event_id");

  // Handle image upload for banner
  const handleImageUploadBanner = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setIsUploading(true); // Start spinner

      try {
        const uploadResult = await uploadImageGC(file);

        const imageUrl = uploadResult.secure_url;

        setImageBanner(imageUrl);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error in uploading image",
          description: error?.message,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle image delete for image banner
  const handleImageDeleteBanner = () => {
    setImageBanner(null);
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.value = "";
    }
  };

  // Handle edit for banner
  const handleEditClickBanner = () => {
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.click();
    }
  };

  // Handle image upload for thumbnail
  const handleImageUploadThumbnail = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setIsUploading(true); // Start spinner

      try {
        const uploadResult = await uploadImageGC(file);

        const imageUrl = uploadResult.secure_url;

        setImageThumbnail(imageUrl);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error in uploading image",
          description: error?.message,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle image delete for image thumbnail
  const handleImageDeleteThumbnail = () => {
    setImageThumbnail(null);
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.value = "";
    }
  };

  // Handle edit for thumbnail
  const handleEditClickthumbnail = () => {
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.click();
    }
  };

  const { mutate, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => EventBasicInfo(data),
    onSuccess: (response) => {
      if (response?.message) {
        next();
        client.invalidateQueries({ queryKey: ["eventById"] });
        setCookie("event_id", response?.data?._id);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Fill in the fields",
        description: "Please upload and fill in the input field",
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError((prevError) => {
    //   const newError = {
    //     nameError: eventName === "" ? "Enter event name" : "",
    //     descriptionError:
    //       eventDescription === "" ? "Enter event description" : "",
    //     bannerError: imageBanner === "" ? "Enter event name" : "",
    //     thumbnailError: imageThumbnail === "" ? "Enter event name" : "",
    //   };

    //   return { ...prevError, ...newError };
    // });

    // Optionally check if there are no errors after updating
    if (
      eventName !== "" &&
      eventDescription !== "" &&
      imageBanner !== "" &&
      imageThumbnail !== ""
    ) {
      setError({
        nameError: "",
        descriptionError: "",
        bannerError: "",
        thumbnailError: "",
      });
    }

    const data = {
      userId: userData?.data?._id,
      eventBanner: imageBanner,
      thumbnail: imageThumbnail,
      eventName,
      eventDescription,
    };

    if (
      !data.eventBanner &&
      !data.eventDescription &&
      !data.eventName &&
      !data.thumbnail
    ) {
      toast({
        variant: "destructive",
        title: "All fields are required",
      });
    }

    if (userData?.data?.role === "user") {
      mutateRole({ role: "organizer" });
    }

    if (eventID && userData?.data?.role === 'organizer') {
      mutateUpdate(data);
    } else {
      mutate(data);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-start gap-4 lg:gap-12
    "
    >
      {isUploading || (isPendingRole && <SpinnerOverlay />)}
      <div className="w-full lg:w-2/5 lg:px-0">
        <Intro contents={pageContents} title="Tell us about your event" />
      </div>
      <div className="w-full h-full lg:w-3/5">
        <FormContainer formTitle="Basic Information" currPosition={[40, 0, 0]}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-between gap-4 w-full h-full mb-6 p-2 lg:p-4"
          >
            <div className="h-[60vh] whitespace-normal overflow-y-auto px-2 lg:px-4">
              <div className="w-full">
                <Label className="text-white font-pally-medium">
                  Event Banner
                </Label>

                <div className="mt-2">
                  <div className="imageBanner-uploader">
                    {imageBanner ? (
                      <div className="relative">
                        <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden">
                          <img
                            src={imageBanner}
                            alt="Uploaded"
                            className="w-auto"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black opacity-50"></div>

                        <div className="absolute right-5 top-0 z-10 text-center text-white p-4 flex gap-5">
                          <button
                            type="button"
                            onClick={handleEditClickBanner}
                            className="outline outline-white/50 p-1.5 rounded-md bg-white"
                          >
                            <FiEdit size={18} color="#000" />
                          </button>
                          <button
                            type="button"
                            onClick={handleImageDeleteBanner}
                            className="outline outline-white/50 p-1.5 rounded-md bg-white"
                          >
                            <HiOutlineTrash size={18} color="#000" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-9 bg-white/10 cursor-pointer">
                        <label htmlFor="file-input">
                          <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
                            <IoMdImages size={28} />
                            <p className="font-pally-regular text-[#F58B86] underline">
                              Add Photo
                            </p>
                            <p className="font-pally-medium text-[#F7D394]">
                              Resolution size : 320 x 489
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>

                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadBanner}
                    style={{ display: "none" }}
                  />
                  <p className="text-sm font-pally-regular text-[#e84141]">
                    {error.bannerError}
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 mt-7">
                <div className="w-full max-w-48">
                  <Label className="text-white font-pally-medium">
                    Thumbnail
                  </Label>

                  <div className="mt-2">
                    <div className="imageThumbnail-uploader">
                      {imageThumbnail ? (
                        <div className="relative">
                          <div className="relative h-[20vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden ">
                            <img
                              src={imageThumbnail}
                              alt="Uploaded"
                              className="w-auto"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black opacity-50"></div>

                          <div className="absolute right-5 bottom-0 z-10 text-center text-white p-4 flex gap-5">
                            <button
                              type="button"
                              onClick={handleEditClickthumbnail}
                              className="outline outline-white/50 p-1.5 rounded-md bg-white"
                            >
                              <FiEdit size={18} color="#000" />
                            </button>
                            <button
                              type="button"
                              onClick={handleImageDeleteThumbnail}
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

                    <input
                      id="file-input-thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUploadThumbnail}
                      style={{ display: "none" }}
                    />
                    <p className="text-sm font-pally-regular text-[#e84141]">
                      {error.thumbnailError}
                    </p>
                  </div>
                </div>
                <div className="w-full space-y-4">
                  <div className="w-full">
                    <Label className="text-white" htmlFor="event_name">
                      Event Name
                    </Label>

                    <div className="mt-2">
                      <Input
                        placeholder="E.g, 'Summer Music Festival 2024'"
                        type="text"
                        id="event_name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        className="w-full bg-white text-black font-pally-regular"
                      />

                      <p className="text-sm font-pally-regular text-[#e84141]">
                        {error.nameError}
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <Label className="text-white" htmlFor="event_description">
                      Description
                    </Label>

                    <div className="mt-2">
                      <Textarea
                        placeholder="Max  char - 200 Words"
                        id="event_description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="w-full bg-white text-black font-pally-regular h-32 md:h-40"
                      />

                      <p className="text-sm font-pally-regular text-[#e84141]">
                        {error.descriptionError}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky z-50 bottom-0 bg-[#281E17]">
              <Separator />
              <div className="py-5 flex justify-end items-center">
                <Button
                  type="submit"
                  disabled={isPending || isUpdatePending}
                  variant="destructive"
                >
                  {isPending || isUpdatePending ? <Spinner /> : "Next"}
                </Button>
              </div>
            </div>
          </form>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepOne;
