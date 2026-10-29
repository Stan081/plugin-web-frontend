import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GET_SIGNED_URL } from "./constants";
import { getToken } from "./token";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// function to calculate percentage
export const calculatePercentage = (amount: number, total: number): number => {
  if (total < 0) {
    throw new Error("Balance must be greater than 0.");
  }

  return +((amount / total) * 100).toFixed(2);
};

// function to calculate duration
export const calculateDuration = (startTime: string, endTime: string) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startDate = new Date(0, 0, 0, startHours, startMinutes);
  const endDate = new Date(0, 0, 0, endHours, endMinutes);

  const diffMs = endDate.getTime() - startDate.getTime();

  const diffMins = Math.floor(diffMs / (1000 * 60));

  // Calculate months, days, hours, and minutes
  const months = Math.floor(diffMins / (60 * 24 * 30));
  const days = Math.floor((diffMins % (60 * 24 * 30)) / (60 * 24));
  const hours = Math.floor((diffMins % (60 * 24)) / 60);
  const minutes = diffMins % 60;

  // Build the duration string dynamically
  let durationString = "";

  if (months > 0) {
    durationString += `${months} month${months > 1 ? "s" : ""} `;
  }
  if (days > 0) {
    durationString += `${days} day${days > 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    durationString += `${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    durationString += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return durationString.trim() || "0 minutes";
};

// function to sync clodinary for every image upload
export const uploadImage = async (file: any): Promise<any> => {
  const cloudName = "dbhbyikta";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "yjpmz4l2");

  const fileType = file.type.startsWith("video/") ? "video" : "image";

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  return uploadResponse.json();
};


// Uploads need a signed-in user; the API picks the storage path and only
// accepts images and videos.
const getSignedUrl = async (fileName: string, contentType: string): Promise<any> => {
  try {
    const token = getToken();
    const response = await fetch(GET_SIGNED_URL, {
      method: "POST",
      body: JSON.stringify({ fileName, contentType }),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get signed URL: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    if (data && data.signedUrl) {
      return data;
    } else {
      throw new Error('Signed URL not found in response');
    }
  } catch (error) {
    console.error("Error in getSignedUrl:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const uploadImageGC = async (
  file: File
): Promise<any> => {
  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const fileName = file.name; // Corrected: use file.name
  let signedUploadUrl: string;
  let imageUrl;
  let uploadContentType = "application/octet-stream";

  try {
    const { signedUrl, publicUrl, contentType } = await getSignedUrl(
      fileName,
      file.type
    );
    signedUploadUrl = signedUrl;
    imageUrl = publicUrl;
    if (contentType) uploadContentType = contentType;
  } catch (error) {
    console.error("Failed to obtain signed URL:", error);
    throw new Error("Failed to prepare for upload: Could not get signed URL.");
  }

  try {
    const response = await fetch(signedUploadUrl, {
      method: "PUT",
      body: file, // Send the File object directly
      headers: {
        // Must match the type the URL was signed for.
        'Content-Type': uploadContentType,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to GCS');
    }

    if (response.ok) {
      return { secure_url: imageUrl};
    } else {
      throw new Error('Signed URL not found in response');
    }
  } catch (error) {
    console.error("Error uploading file to GCS:", error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const mergeDateTime = (
  date: Date | undefined,
  time: string
): Date | null => {
  if (!date || !time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  const mergedDate = new Date(date);
  mergedDate.setHours(hours, minutes, 0, 0);
  return mergedDate;
};
