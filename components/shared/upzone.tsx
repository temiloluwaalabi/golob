"use client";
import { endsWith, isEmpty } from "lodash";
import { useCallback, useState } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FileWithPath } from "react-dropzone";
import { ClientUploadedFileData } from "uploadthing/types";
import { CheckCheck, Trash, X } from "lucide-react";
import { formatBytes, useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import UploadIcon from "../icons/upload";
import { ENDPOINTS } from "./upload-zone";
import { Progress } from "../ui/progress";
import { interval } from "date-fns";
interface UploadZoneProps {
  label?: string;
  field?: any;
  name: any;
  form: any;
  getValues: any;
  setValue: any;
  className?: string;
  error?: string;
  index?: any;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxFiles?: number;
  endpoint: ENDPOINTS;
  isDialog?: boolean;
  renderAs?: "dialog" | "field"; // Optional prop to choose how the uploader is rendered
}

interface FileType {
  name: string;
  url: string;
  size: number;
  key: string;
}

const UploadZone = ({
  label,
  name,
  form,
  field,
  getValues,
  setValue,
  className,
  error,
  index,
  endpoint,
  renderAs,
  isDialog,
  disabled,
  maxFiles,
  type,
  required,
}: UploadZoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploading, setIsUploading] = useState<boolean>(false);
  //   const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number; // Object to store progress for each file
  }>({});
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles([
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: `${file.name}-${file.size}-${Date.now()}`,
          })
        ),
      ]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
  );

  const startSimilatedProgress = (fileKey: string) => {
    setUploadProgress((prevProgress) => ({
      ...prevProgress,
      [fileKey]: 0,
    }));
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const currentProgress = prevProgress[fileKey] ?? 0;

        if (currentProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return {
          ...prevProgress,
          [fileKey]: currentProgress + 5,
        };
      });
    }, 500);

    return interval;
  };
  function handleRemoveFile(index: number) {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  }

  const uploadedItems = isEmpty(getValues(name))
    ? []
    : getValues(name).filter((item: any) => item.name && item.url && item.key);

  // console.log("values from uploadzone", getValues(name));

  // console.log("uploaded Items", uploadedItems);
  const notUploadedItems = files.filter(
    (file) =>
      !uploadedItems?.some(
        (uploadedFile: FileType) => uploadedFile.name === file.name
      )
  );

  //   const deleteUploadedImage = async (id: string) => {
  //     const apiKey = getFileKey(id);
  //     if (apiKey) {
  //       setDeleteLoading(true);
  //       const res = await DeleteImagesFromCloudinary(apiKey);

  //       if (res.success) {
  //         toast({
  //           description: res.success,
  //         });
  //       }
  //       if (setValue) {
  //         const currentValues = getValues(name);
  //         const updatedValues: FileType[] = currentValues.filter(
  //           (item: FileType) => item.url !== id
  //         );
  //         setValue(name, updatedValues);
  //         setDeleteLoading(false);
  //       }
  //     }
  //   };
  const { toast } = useToast();

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: (
        res: ClientUploadedFileData<any>[] | undefined
      ) => {
        // console.log("res", res);
        if (setValue) {
          const currentValue = getValues(name);
          const respondedUrls =
            res?.map((r) => ({
              name: r.name,
              size: r.size,
              url: r.url,
              key: r.key,
            })) || [];
          if (!currentValue || currentValue.length === 0) {
            setValue(name, respondedUrls);
          } else {
            setValue(name, [...currentValue, ...respondedUrls]);
          }

          setFiles([]);
          // const respondedUrls = res?.map((r) => r.url);
        }
        // console.log("values from uploadzone", getValues(name));
        toast({
          description: "Package Images Uploaded",
        });
      },
      //   onUploadProgress: (progress: number) => { // This now takes a single number
      //     setUploadProgress((prevProgress) => ({
      //       ...prevProgress,
      //       [file.id]: progress,
      //     }));
      //   },
      onUploadError: (error: Error) => {
        console.error(error);
        toast({
          description: `${error.message}`,
        });
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });
  //   const renderFileStatus = (file: File) => {
  //     switch (file.status) {
  //       case "uploading":
  //         return (
  //           <div
  //             className="flex items-center justify-between border border-dashed space-x-2 p-4 rounded-[10px]"
  //             key={file.id}
  //           >
  //             <div className="flex items-center space-x-4">
  //               <div>
  //                 {props.endpoint === ENDPOINTS.pdf ? (
  //                   <Image
  //                     src="/assets/pdf.png"
  //                     width={44}
  //                     height={48}
  //                     alt="PDF Preview"
  //                     className="object-cover"
  //                   />
  //                 ) : (
  //                   <div className="">
  //                     <MediaPreview name={file.name} url={file.preview || ""} />
  //                   </div>
  //                 )}
  //               </div>

  //               <div className="space-y-1">
  //                 <span className="text-sm font-bold">Uploading Document</span>
  //                 <Progress className="h-[6px]" value={file.progress} max={100} />
  //                 <p className="text-xs">
  //                   <span className="text-xs">{file.name}</span> |{" "}
  //                   {formatBytes(file.size)} | {file.progress}% Completed
  //                 </p>
  //               </div>
  //             </div>
  //             <Button
  //               className="bg-primary-salmon hover:bg-primary-blackishGreen size-7"
  //               size={"icon"}
  //               disabled={isUploading}
  //             >
  //               <X className="size-4" />
  //             </Button>

  //             {/* <span className="text-gray-600">{file.name}</span>
  //             <Progress value={file.progress} max={100} />
  //             <span>{file.progress}%</span> */}
  //           </div>
  //         );

  //       case "success":
  //         return (
  //           <div className="bg-green-100 flex items-center justify-between border border-dashed space-x-2 p-4 rounded-[10px]">
  //             <div className="flex items-center space-x-4">
  //               <div>
  //                 {props.endpoint === ENDPOINTS.pdf ? (
  //                   <Image
  //                     src="/assets/pdf.png"
  //                     width={44}
  //                     height={48}
  //                     alt="PDF Preview"
  //                     className="object-cover"
  //                   />
  //                 ) : (
  //                   <div>
  //                     <MediaPreview name={file.name} url={file.preview || ""} />
  //                   </div>
  //                 )}
  //               </div>

  //               <div className="space-y-1">
  //                 <span className="text-sm font-bold text-green-600">
  //                   Upload Successful
  //                 </span>
  //                 <Progress className="h-[6px]" value={file.progress} max={100} />
  //                 <p className="text-xs">
  //                   <span className="text-xs">{file.name}</span> |{" "}
  //                   {formatBytes(file.size)} | {file.progress}% Completed
  //                 </p>
  //               </div>
  //             </div>
  //             <Button
  //               className="bg-primary-salmon hover:bg-primary-blackishGreen size-7"
  //               size={"icon"}
  //               disabled={isUploading}
  //             >
  //               <X className="size-4" />
  //             </Button>

  //             {/* <span className="text-gray-600">{file.name}</span>
  //             <Progress value={file.progress} max={100} />
  //             <span>{file.progress}%</span> */}
  //           </div>
  //         );

  //       case "error":
  //         return (
  //           <div className="bg-pink-100 flex items-center justify-between border border-dashed space-x-2 p-4 rounded-[10px]">
  //             <div className="flex items-center space-x-4">
  //               <div>
  //                 {props.endpoint === ENDPOINTS.pdf ? (
  //                   <Image
  //                     src="/assets/pdf.png"
  //                     width={44}
  //                     height={48}
  //                     alt="PDF Preview"
  //                     className="object-cover"
  //                   />
  //                 ) : (
  //                   <div>
  //                     <MediaPreview name={file.name} url={file.preview || ""} />
  //                   </div>
  //                 )}
  //               </div>

  //               <div className="space-y-1">
  //                 <span className="text-sm text-pink-600 font-bold">
  //                   Upload Failed! Please try again
  //                 </span>
  //                 <Progress
  //                   className="h-[6px] bg-pink-600 "
  //                   value={file.progress}
  //                   max={100}
  //                 />
  //                 <p className="text-xs">
  //                   <span className="text-xs">{file.name}</span> |{" "}
  //                   {formatBytes(file.size)} | {file.progress}% Completed
  //                 </p>
  //               </div>
  //             </div>
  //             <Button
  //               className="bg-primary-salmon text-white hover:bg-primary-blackishGreen"
  //               variant={"ghost"}
  //               disabled={isUploading}
  //             >
  //               <Loader2 className="size-4 me-2" />
  //               Reupload
  //             </Button>

  //             {/* <span className="text-gray-600">{file.name}</span>
  //           <Progress value={file.progress} max={100} />
  //           <span>{file.progress}%</span> */}
  //           </div>
  //         );

  //       default:
  //         return null;
  //     }
  //   };
  return (
    <div className="flex flex-col gap-4">
      {label && (
        <span className="mb-1.5 block font-semibold dark:text-light-500 text-gray-900">
          {label} {required && <span className="text-primary-500 ms-1">*</span>}
        </span>
      )}
      {/* <div
        className={cn(
          "flex items-center justify-center flex-row gap-4 space-x-4 w-full border border-dashed border-gray-700/30 h-full dark:border-dark-400 px-4 rounded-md py-5 transition-all duration-300",
          !isEmpty(files) &&
            "flex flex-wrap w-full items-center justify-between xl:flex-nowrap xl:pr-6"
        )}
      >
        <div
          {...getRootProps()}
          className={cn(
            "cursor-pointer",
            isEmpty(files) ? "justify-center" : "flex-grow justify-center"
          )}
        >
          <div className="flex  items-center gap-4">
            <input {...getInputProps()} />
            <UploadIcon className="size-10" />
            <div className="flex flex-col items-center">
              <h4 className="text-sm dark:text-light-700">
                Click to upload or drag and drop
              </h4>
              <p className="text-xs dark:text-light-500">
                PNG, or JPG (max. 800x400px)
              </p>
            </div>
          </div>
        </div>
        <div className="">
          {!isEmpty(files) && !isEmpty(notUploadedItems) && (
            <UploadButtons
              files={notUploadedItems}
              isLoading={isUploading}
              onClear={() => setFiles([])}
              onUpload={() => startUpload(notUploadedItems)}
            />
          )}

          {isEmpty(files) && !isEmpty(notUploadedItems) && (
            <UploadButtons
              files={notUploadedItems}
              isLoading={isUploading}
              onClear={() => setFiles([])}
              onUpload={() => startUpload(notUploadedItems)}
            />
          )}

          {!isEmpty(files) && isEmpty(notUploadedItems) && (
            <UploadButtons
              files={files}
              isLoading={isUploading}
              onClear={() => setFiles([])}
              onUpload={() => startUpload(files)}
            />
          )}
        </div>
      </div> */}
      <div
        className={cn(
          "border border-dashed border-gray-700/30 h-full flex justify-between items-center  gap-4 space-x-4 rounded-md py-5 transition-all duration-300 px-4"
        )}
      >
        <div {...getRootProps()} className={cn("cursor-pointer")}>
          <div className="flex items-center gap-4">
            <input {...getInputProps()} />
            <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
              <UploadIcon className="text-[#475367] size-4" />
            </div>
            <div>
              <h4 className="text-base font-bold">
                Click to upload or drag and drop
              </h4>
              <p>
                <span className="uppercase">{fileTypes}</span> | {maxFiles} Max
              </p>
            </div>
          </div>
        </div>
        <div>
          {!isEmpty(files) && !isEmpty(notUploadedItems) && (
            <UploadButtons
              files={notUploadedItems}
              isLoading={isUploading}
              onClear={() => setFiles([])}
              onUpload={() => {
                const intervals = notUploadedItems.map((file) => {
                  const fileKey = file.name;
                  return startSimilatedProgress(fileKey);
                });
                startUpload(notUploadedItems).finally(() => {
                  intervals.forEach(clearInterval);
                  setUploadProgress((prevProgress) => {
                    const updatedProgress = { ...prevProgress };
                    notUploadedItems.forEach((file) => {
                      updatedProgress[file.name] = 100;
                    });
                    return updatedProgress;
                  });
                });
              }}
            />
          )}
          {isEmpty(files) && !isEmpty(notUploadedItems) && (
            <UploadButtons
              files={notUploadedItems}
              isLoading={isUploading}
              onClear={() => setFiles([])}
              onUpload={() => startUpload(notUploadedItems)}
            />
          )}

          {!isEmpty(files) && isEmpty(notUploadedItems) && (
            <UploadButtons
              files={files}
              isLoading={isUploading}
              onClear={() => setFiles([])}
              onUpload={() => startUpload(files)}
            />
          )}
        </div>
      </div>

      {[...uploadedItems, ...notUploadedItems].map(
        (file: any, index: number) => {
          const fileKey = file.name;
          const progress = uploadProgress[fileKey] ?? 0;

          return (
            <div
              className={cn(
                "flex items-center justify-between border border-dashed space-x-2 p-4 rounded-[10px]",
                uploadedItems.includes(file) ? "bg-green-100" : "bg-white"
              )}
              key={file.id || file.name}
            >
              <div className="flex items-center space-x-4 w-full">
                <div>
                  {endpoint === ENDPOINTS.pdf ? (
                    <Image
                      src="/assets/pdf.png"
                      width={44}
                      height={48}
                      alt="PDF Preview"
                      className="object-cover"
                    />
                  ) : (
                    <MediaPreview name={file.name} url={file.preview || ""} />
                  )}
                </div>
                <div className="space-y-1 w-full">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      uploadedItems.includes(file)
                        ? "text-green-600"
                        : "text-gray-600"
                    )}
                  >
                    {uploadedItems.includes(file)
                      ? "Upload Successful"
                      : "Uploading Document"}
                  </span>
                  <Progress
                    className="h-[6px] w-full bg-zinc-200"
                    indicatorColor={progress === 100 ? "bg-green-500" : ""}
                    value={progress}
                    max={100}
                  />
                  <p className="text-xs">
                    <span className="text-xs">{file.name}</span> |{" "}
                    {formatBytes(file.size)} | {progress}% Completed
                  </p>
                </div>
              </div>
              <Button
                className="bg-primary-salmon hover:bg-primary-blackishGreen size-7"
                size={"icon"}
                onClick={() => handleRemoveFile(index)}
                disabled={isUploading}
              >
                <X className="size-4" />
              </Button>
            </div>
          );
        }
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default UploadZone;
function UploadButtons({
  files,
  onClear,
  onUpload,
  isLoading,
}: {
  files: any[];
  isLoading: boolean;
  onClear: () => void;
  onUpload: () => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center h-full justify-center gap-2  pb-5 sm:flex-nowrap xl:w-auto xl:justify-end xl:px-0 xl:pb-0">
      {/* <Button
        type="button"
        variant="outline"
        className="bg-transparent border dark:light-border-2 dark:text-light-500 dark:hover:text-black gap-2 xl:w-auto"
        disabled={isLoading}
        onClick={onClear}
      >
        <Trash />
        Clear {files.length} files
      </Button> */}
      <Button
        type="button"
        variant={"ghost"}
        className=" bg-primary-salmon group text-white gap-2 rounded-md hover:bg-primary xl:w-auto"
        disabled={isLoading}
        onClick={onUpload}
      >
        <UploadIcon className="text-white group-hover:text-black" /> Upload{" "}
        {files.length} {files.length > 1 ? "Files" : "File"}
      </Button>
    </div>
  );
}

export function MediaPreview({ name, url }: { name?: string; url: string }) {
  const [imageUrl, setImageUrl] = useState(url);
  return (
    <Image
      src={imageUrl || ""}
      onError={() =>
        setImageUrl(
          "https://res.cloudinary.com/davidleo/image/upload/v1716048885/3fee65e1-aa34-46b8-a9a9-6a72ad97fc2e_tolmsb.png"
        )
      }
      width={30}
      height={30}
      alt="package image"
      className="rounded-md object-cover object-left-top"
      // priority
      // sizes="(max-width: 768px) 100vw,
      //        (max-width: 1024px) 50vw,
      //        33vw"
    />
  );
}

function MediaCaption({ name, size }: { name: string; size: number }) {
  return (
    <div className="mt-1 text-xs px-2 dark:bg-dark-300 py-1 rounded-md">
      <p className="line-break font-medium text-gray-700 dark:text-light-500 ">
        {name}
      </p>
      <p className="mt-1 font-mono">{size && formatBytes(size)}</p>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor="#fff" stopOpacity="0" offset="0%" />
          <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#fff" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
}
