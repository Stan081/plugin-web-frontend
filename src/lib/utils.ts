import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
import dotenv from 'dotenv'

dotenv.config();

// Initialize the Storage client with default credentials
const storage = new Storage();
const BUCKET_NAME = process.env.NEXT_GCP_BUCKET;
const env = process.env.NEXT_NODE_ENV

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
export const uploadImageGC = async (file: any): Promise<any> => {
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


export const uploadImageGCGC = async (file: File | Blob): Promise<{ url: string }> => {
  const fileType = file.type.startsWith('video/') ? 'video' : 'image';
  const fileName = `${Date.now()}-${fileType}.${file.type.split('/')[1]}`;
  const destination = `${env}/${fileType}s/${fileName}`;

  // Read the file into a buffer
  const buffer = await file.arrayBuffer();
  const stream = Readable.from(Buffer.from(buffer));

  const bucket = storage.bucket(BUCKET_NAME);
  const gcsFile = bucket.file(destination);

  await new Promise<void>((resolve, reject) => {
    stream
      .pipe(
        gcsFile.createWriteStream({
          resumable: false,
          contentType: file.type,
          predefinedAcl: 'publicRead',
        })
      )
      .on('error', reject)
      .on('finish', resolve);
  });

  const url = gcsFile.publicUrl();
  return { url };
};

export const mergeDateTime = (date: Date | undefined, time: string): Date | null => {
  if (!date || !time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  const mergedDate = new Date(date);
  mergedDate.setHours(hours, minutes, 0, 0);
  return mergedDate;
}; 