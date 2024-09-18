import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IoMdImages } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi2";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { Button } from "@/components/ui/button";

interface PhotoGridProps {
  maxUploads: number;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ maxUploads }) => {
  const { handleIsChecked } = useCreateEventContext();
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const fileInputRefThumbnail = useRef<HTMLInputElement | null>(null);
  const { setValue } = useForm();

  // Handle image upload for banner
  const handleImageUploadBanner = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (uploadedPhotos.length < maxUploads) {
          setUploadedPhotos((prev) => [...prev, reader.result as string]);
        }
        setValue("pass_thumbnail", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image delete for an uploaded image
  const handleImageDelete = (index: number) => {
    const newPhotos = [...uploadedPhotos];
    newPhotos.splice(index, 1);
    setUploadedPhotos(newPhotos);
    setValue("pass_thumbnail", "");
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.value = "";
    }
  };

  // Handle edit click for vendor thumbnail (trigger file input)
  const handleEditClick = () => {
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.click();
    }
  };

  const onSubmit = () => {
    if (uploadedPhotos.length > 0) {
      handleIsChecked("addMedia");
      console.log(uploadedPhotos);
    }
  };

  return (
    <div className="p-4 rounded-md mx-auto">
      <h2 className="text-base font-pally-regular mb-4">
        {uploadedPhotos.length} of {maxUploads} - Photos/Videos uploaded
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {uploadedPhotos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={photo}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-40 object-cover rounded-md"
            />
            <button
              onClick={() => handleImageDelete(index)}
              className="absolute top-2 right-2 bg-gray-800 p-1.5 rounded-full shadow-lg hover:bg-red-500 group-hover:block hidden"
            >
              <HiOutlineTrash size={18} color="#FFF" />
            </button>
          </div>
        ))}
        {uploadedPhotos.length < maxUploads && (
          <div
            onClick={handleEditClick}
            className="w-full h-40 bg-[#4a3a39] rounded-md flex justify-center items-center cursor-pointer border border-dashed border-gray-400 hover:bg-[#6e5756]"
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
      <input
        type="file"
        accept="image/*,video/*"
        className="hidden"
        ref={fileInputRefThumbnail}
        onChange={handleImageUploadBanner}
      />

      <div onClick={onSubmit} className="flex justify-end mt-4">
        <Button variant="destructive" disabled={!uploadedPhotos.length}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default PhotoGrid;
