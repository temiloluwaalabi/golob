import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();
const UploadDropZone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export function getFileKey(url: string): string | null {
  const startIndex = url.indexOf("/f/") + 3; // Adding 3 to skip "/f/"
  if (startIndex === -1) {
    return null; // Return null if "/f/" is not found
  }
  return url.substring(startIndex); // Return the substring after "/f/"
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}
//   export function absoluteUrl(path: string) {
//     return `${env.NEXT_PUBLIC_APP_URL}${path}`;
//   }
