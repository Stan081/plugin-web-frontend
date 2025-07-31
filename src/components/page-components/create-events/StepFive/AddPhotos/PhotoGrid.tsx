"use client";
import React, { useState, useRef, useCallback } from "react";
import { IoMdImages } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { Button } from "@/components/ui/button";
import { uploadImageGC } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventMedia } from "@/pages/api/mutate/create-events/eventMedia";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";
import { useGetEventPhotos } from "@/hooks/events/useGetEventPhotos";
import { DeleteEventPhoto } from "@/pages/api/mutate/create-events/deleteEventPhoto";

interface PhotoGridProps {
  maxUploads: number;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ maxUploads }) => {
  const { data: allPhotos } = useGetEventPhotos();
  const [uploadedPhotos, setUploadedPhotos] = useState<string[] | null>(
    allPhotos?.data || null
  );
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const client = useQueryClient();

  // Handle image upload for banner
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsLoading(true);

      try {
        const uploadResult = await uploadImageGC(file);
        const imageUrl = uploadResult.secure_url;

        if (uploadedPhotos.length < maxUploads) {
          setUploadedPhotos((prev) => [...prev, imageUrl]); // Add the new image URL to the array
        } else {
          toast({
            title: "Upload Limit Reached",
            description: `You can only upload a maximum of ${maxUploads} images.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Upload Error",
          description: "An error occurred while uploading the image.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const { mutate: MuatatPhoto, isPending: isPhotoPending } = useMutation({
    mutationFn: (data: any) => DeleteEventPhoto(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Your event agenda has been updated",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["eventPhotos"] });
      }
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  // Handle image delete for an uploaded image
  const handleImageDelete = (index: number) => {
    const getSelPhoto = uploadedPhotos.find((_, i) => i === index);

    const data = {
      photoUrl: typeof getSelPhoto === "string" ? getSelPhoto : getSelPhoto,
    };

    if (data.photoUrl) {
      MuatatPhoto(data);
      if (fileInputRefThumbnail.current) {
        fileInputRefThumbnail.current.value = "";
      }
    } else {
      console.log("No photo URL found for deletion");
    }
  };

  // Handle edit click for vendor thumbnail (trigger file input)
  const handleEditClick = () => {
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.click();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => EventMedia(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "File has been uploaded",
          description: `${response?.message}`,
        });
        client.invalidateQueries({ queryKey: ["eventPhotos"] });
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    },
  });

  const onSubmit = useCallback(() => {
    if (uploadedPhotos.length > 0) {
      const data = {
        eventPhotos: uploadedPhotos,
      };
      mutate(data);
    } else {
      toast({
        title: "No Photos Uploaded",
        description: "Please upload at least one photo before submitting.",
        variant: "destructive",
      });
    }
  }, [uploadedPhotos, toast]);

  return (
    <div className="md:p-4 rounded-md mx-auto">
      {isPhotoPending && <SpinnerOverlay />}
      <h2 className="text-base font-pally-regular mb-4">
        {uploadedPhotos.length} of {maxUploads} - Photos/Videos uploaded
      </h2>
      <div className="flex flex-wrap gap-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {uploadedPhotos.map((media, index) => {
            const isVideo = media.includes("/video/upload/");

            return (
              <div key={index} className="relative group w-full">
                {isVideo ? (
                  <video
                    src={media}
                    controls
                    className="w-40 h-40 object-cover rounded-md"
                  />
                ) : (
                  <img
                    src={media}
                    alt={`Uploaded ${index + 1}`}
                    className="w-40 h-40 object-cover rounded-md"
                  />
                )}

                <button
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-2 right-2 bg-gray-800 p-1.5 rounded-full shadow-lg hover:bg-red-500 group-hover:block hidden"
                >
                  <HiOutlineTrash size={18} color="#FFF" />
                </button>
              </div>
            );
          })}

          {uploadedPhotos.length < maxUploads && (
            <div
              onClick={handleEditClick}
              className="h-40 w-32 md:w-40 bg-[#4a3a39] rounded-md flex justify-center items-center cursor-pointer border border-dashed border-gray-400 hover:bg-[#6e5756]"
            >
              <div className="flex flex-col justify-center items-center gap-3">
                <IoMdImages size={32} />
                <p className="text-[#F9B6B1] font-pally-regular">
                  Add Photo/Video
                </p>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <SpinnerOverlay />
        ) : (
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            ref={fileInputRefThumbnail}
            onChange={handleImageUpload}
          />
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          onClick={onSubmit}
          variant="destructive"
          disabled={!uploadedPhotos.length}
        >
          {isPending ? <Spinner /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default PhotoGrid;
