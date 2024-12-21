import { createUploadthing, type FileRouter } from "uploadthing/next";

// import { currentUser } from "@/lib/auth";

const f = createUploadthing();
// const getUser = async () => currentUser();

// const middleware = async () => {
//   const user = await getUser();

//   if (!user || !user.id) throw new Error("Unauthorized");

//   return {
//     userId: user.id,
//   };
// };

export const ourFileRouter = {
  preLoggedImage: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    // .middleware(middleware)
    .onUploadComplete(async () => {
      console.log("Upload complete ");
    }),
  preLoggedPdf: f({ pdf: { maxFileSize: "4MB" } }).onUploadComplete(
    async () => {
      console.log("Uploading pdf complete ");
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
