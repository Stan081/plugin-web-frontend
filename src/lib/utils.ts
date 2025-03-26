import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

