"use server";

import { utapi } from "../server/uploadthing";

// import { utapi } from "@/app/server/uploadthing";

export const DeleteImagesFromCloudinary = async (url: string) => {
  try {
    await utapi.deleteFiles(url);
    return {
      success: "Image deleted successfully. Click on update",
    };
  } catch (error) {
    console.error("Error deleting file", error);
    throw new Error("Error deleting file");
  }
};
export const DeleteImagessFromCloudinary = async (url: string[]) => {
  try {
    await utapi.deleteFiles(url);
    return {
      success: "Images deleted successfully. Click on update",
    };
  } catch (error) {
    console.error("Error deleting files", error);
    throw new Error("Error deleting files");
  }
};
