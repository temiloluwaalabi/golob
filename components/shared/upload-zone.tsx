/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
"use client";
import { useDropzone } from "@uploadthing/react";
import { isEmpty } from "lodash";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FileWithPath } from "react-dropzone";
import { toast } from "sonner";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { ClientUploadedFileData } from "uploadthing/types";

import { formatBytes, useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

import UploadIcon from "../icons/upload";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Progress } from "../ui/progress";

export interface FileType extends File {
  preview?: string;
  progress: number;
  status: "uploading" | "success" | "error";
  id: string;
}
export enum ENDPOINTS {
  image = "preLoggedImage",
  pdf = "preLoggedPdf",
}
type Props = {
  name: any;
  form: any;
  label?: string;
  required?: boolean;
  type?: string;
  className?: string;
  getValues: any;
  setValue: any;
  initialFiles?: File[];
  disabled?: boolean;
  maxFiles?: number;
  allowedTypes?: string[];
  showProgress?: boolean; // Optional prop to control progress bar display
  showSuccessMessage?: boolean; // Optional prop to control success message display
  showErrorMessage?: boolean; // Optional prop to control error message display
  renderAs?: "dialog" | "field"; // Optional prop to choose how the uploader is rendered
  onFileRemoved?: (file: File) => void; // Optional callback when a file is removed
  endpoint: ENDPOINTS;
  isDialog?: boolean;
  onUploadSuccess?: (files: FileType[]) => void;
};
export const UploadZone = (props: Props) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  // const [uploadProgress, setUploadProgress] = useState<{
  //   [key: string]: number;
  // }>({});
  // const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>(
  //   {}
  // );
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      ...file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "uploading" as const,
      id: `${file.name}-${file.size}-${Date.now()}`,
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const handleRemoveNotUploadedFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  // function handleRemoveNotUploadedFile(index: number) {
  //   const updatedFiles = [...files];

  //   updatedFiles.splice(index, 1);
  //   setFiles(updatedFiles);
  // }

  const uploadedItems = isEmpty(props.getValues(props.name))
    ? []
    : props.getValues(props.name);

  console.log("Uploaded Items", uploadedItems);

  const notUploadedItems = files.filter(
    (file) =>
      !uploadedItems.some(
        (uploadedFile: FileType) => uploadedFile.name === file.name
      )
  );
  console.log("Not Uploaded Items", notUploadedItems);

  const onUploadProgress = (progressEvent: ProgressEvent, file: FileType) => {
    if (progressEvent.lengthComputable) {
      const progress = Math.round(
        (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
      );

      if (progress === 100) {
        setUploadedFiles((prevFiles) => {
          return [...prevFiles, file];
        });

        setFiles((prevUploadedProgress) => {
          return prevUploadedProgress.filter((item) => item.id !== file.id);
        });

        return;
      }

      setFiles((prevUploadProgress) => {
        return prevUploadProgress.map((item) => {
          if (item.id === file.id) {
            return {
              ...item,
              progress,
            };
          } else {
            return item;
          }
        });
      });
    }
  };

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    props.endpoint,
    {
      onClientUploadComplete: (
        res: ClientUploadedFileData<any>[] | undefined
      ) => {
        console.log("upload initiated");
        if (props.setValue) {
          const currentValue = props.getValues(props.name);
          const respondedUrls =
            res?.map((file) => ({
              name: file.name,
              size: file.size,
              url: file.url,
              key: file.key,
              // progress: 100,
              // status: "success" as "success",
              // id: `${file.name}-${file.size}-${Date.now()}`, // Unique identifier for each file
            })) || [];

          if (!currentValue || currentValue.length === 0) {
            props.setValue(props.name, respondedUrls);
          } else {
            props.setValue(props.name, [...currentValue, ...respondedUrls]);
          }
          setFiles([]);
          // setFiles((prevFiles) =>
          //   prevFiles.map((file) =>
          //     respondedUrls.some((uf) => uf.name === file.name)
          //       ? { ...file, progress: 100, status: "success" }
          //       : file
          //   )
          // );

          toast("Files Uploaded Successfully");
          //   if (props.onUploadSuccess) props.onUploadSuccess(respondedUrls);
        }
      },

      onUploadBegin: () => {
        console.log("Upload Begins");
      },
      onUploadError: (error: any) => {
        console.error(error);
        toast(`Upload failed: ${error.cause}`);
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.status === "uploading"
              ? { ...file, progress: 100, status: "error" }
              : file
          )
        );
      },

      // onUploadProgress: (progress)
      onUploadProgress: (progress: number) => {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.status === "uploading" ? { ...file, progress } : file
          )
        );
      },
    }
  );

  const fileTypes = routeConfig ? Object.keys(routeConfig) : [];

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: fileTypes
      ? generateClientDropzoneAccept(
          generatePermittedFileTypes(routeConfig).fileTypes
        )
      : undefined,
    maxFiles: props.maxFiles || 10,
  });
  const renderFileNewStatus = (file: FileType) => {
    const progressBarClass =
      file.status === "success"
        ? "progress-bar-inner progress-bar-success"
        : file.status === "error"
        ? "progress-bar-inner progress-bar-error"
        : "progress-bar-inner";

    return (
      <div className="flex items-center space-x-2" key={file.id}>
        <div className="relative flex-1">
          <span className="block text-gray-600">{file.name}</span>
          <div className="progress-bar">
            <div
              className={progressBarClass}
              style={{ width: `${file.progress}%` }}
            ></div>
          </div>
          <div className="status-icon">
            {file.status === "uploading" && <span>{file.progress}%</span>}
            {file.status === "success" && (
              <span className="text-green-600">✔</span>
            )}
            {file.status === "error" && <span className="text-red-600">✘</span>}
          </div>
        </div>
        {file.status !== "uploading" && (
          <button onClick={() => handleRemoveNotUploadedFile(file.id)}>
            Remove
          </button>
        )}
      </div>
    );
  };
  const renderFileStatus = (file: FileType) => {
    switch (file.status) {
      case "uploading":
        return (
          <div
            className="flex items-center justify-between space-x-2 rounded-[10px] border border-dashed p-4"
            key={file.id}
          >
            <div className="flex items-center space-x-4">
              <div>
                {props.endpoint === ENDPOINTS.pdf ? (
                  <Image
                    src="/assets/pdf.png"
                    width={44}
                    height={48}
                    alt="PDF Preview"
                    className="object-cover"
                  />
                ) : (
                  <div className="">
                    <MediaPreview name={file.name} url={file.preview || ""} />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-sm font-bold">Uploading Document</span>
                <Progress className="h-[6px]" value={file.progress} max={100} />
                <p className="text-xs">
                  <span className="text-xs">{file.name}</span> |{" "}
                  {formatBytes(file.size)} | {file.progress}% Completed
                </p>
              </div>
            </div>
            <Button
              className="size-7 bg-primary-salmon hover:bg-primary-blackishGreen"
              size={"icon"}
              disabled={isUploading}
            >
              <X className="size-4" />
            </Button>

            {/* <span className="text-gray-600">{file.name}</span>
            <Progress value={file.progress} max={100} />
            <span>{file.progress}%</span> */}
          </div>
        );

      case "success":
        return (
          <div className="flex items-center justify-between space-x-2 rounded-[10px] border border-dashed bg-green-100 p-4">
            <div className="flex items-center space-x-4">
              <div>
                {props.endpoint === ENDPOINTS.pdf ? (
                  <Image
                    src="/assets/pdf.png"
                    width={44}
                    height={48}
                    alt="PDF Preview"
                    className="object-cover"
                  />
                ) : (
                  <div>
                    <MediaPreview name={file.name} url={file.preview || ""} />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-sm font-bold text-green-600">
                  Upload Successful
                </span>
                <Progress className="h-[6px]" value={file.progress} max={100} />
                <p className="text-xs">
                  <span className="text-xs">{file.name}</span> |{" "}
                  {formatBytes(file.size)} | {file.progress}% Completed
                </p>
              </div>
            </div>
            <Button
              className="size-7 bg-primary-salmon hover:bg-primary-blackishGreen"
              size={"icon"}
              disabled={isUploading}
            >
              <X className="size-4" />
            </Button>

            {/* <span className="text-gray-600">{file.name}</span>
            <Progress value={file.progress} max={100} />
            <span>{file.progress}%</span> */}
          </div>
        );

      case "error":
        return (
          <div className="flex items-center justify-between space-x-2 rounded-[10px] border border-dashed bg-pink-100 p-4">
            <div className="flex items-center space-x-4">
              <div>
                {props.endpoint === ENDPOINTS.pdf ? (
                  <Image
                    src="/assets/pdf.png"
                    width={44}
                    height={48}
                    alt="PDF Preview"
                    className="object-cover"
                  />
                ) : (
                  <div>
                    <MediaPreview name={file.name} url={file.preview || ""} />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-sm font-bold text-pink-600">
                  Upload Failed! Please try again
                </span>
                <Progress
                  className="h-[6px] bg-pink-600 "
                  value={file.progress}
                  max={100}
                />
                <p className="text-xs">
                  <span className="text-xs">{file.name}</span> |{" "}
                  {formatBytes(file.size)} | {file.progress}% Completed
                </p>
              </div>
            </div>
            <Button
              className="bg-primary-salmon text-white hover:bg-primary-blackishGreen"
              variant={"ghost"}
              disabled={isUploading}
            >
              <Loader2 className="me-2 size-4" />
              Reupload
            </Button>

            {/* <span className="text-gray-600">{file.name}</span>
          <Progress value={file.progress} max={100} />
          <span>{file.progress}%</span> */}
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div>
      {props.isDialog && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <div className="border border-dashed">
            <div>
              <div className="size-8 rounded-full bg-[#F9FAFB]">
                <UploadIcon className="size-4 text-[#475367]" />
              </div>
              <div>
                <h4 className="text-base font-bold">Tap to Upload</h4>
                <p>
                  <span className="uppercase">{fileTypes}</span> |{" "}
                  {props.maxFiles} Max
                </p>
              </div>
            </div>
            <DialogTrigger>
              <Button>Upload</Button>
            </DialogTrigger>
          </div>

          <DialogContent>
            <div className="border border-dashed">
              <div className="flex flex-col">
                <div className="size-8 rounded-full bg-[#F9FAFB]">
                  <UploadIcon className="size-4 text-[#475367]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-base font-bold">Tap to Upload</h4>
                  <p>
                    <span className="uppercase">{fileTypes}</span> |{" "}
                    {props.maxFiles} Max
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {!props.isDialog && (
        <div>
          {props.label && (
            <span className="mb-1.5 block font-semibold text-gray-900 dark:text-light-500">
              {props.label}{" "}
              {props.required && (
                <span className="text-primary-500 ms-1">*</span>
              )}
            </span>
          )}
          <div
            className={cn(
              "border border-dashed border-gray-700/30 h-full flex justify-between items-center  gap-4 space-x-4 rounded-md py-5 transition-all duration-300 px-4"
            )}
          >
            <div {...getRootProps()} className={cn("cursor-pointer")}>
              <div className="flex items-center gap-4">
                <input {...getInputProps()} />
                <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
                  <UploadIcon className="size-4 text-[#475367]" />
                </div>
                <div>
                  <h4 className="text-base font-bold">
                    Click to upload or drag and drop
                  </h4>
                  <p>
                    <span className="uppercase">{fileTypes}</span> |{" "}
                    {props.maxFiles} Max
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
                    const filesToUpload = notUploadedItems.map(
                      ({ preview, progress, status, id, ...file }) => file
                    );
                    console.log("UploadingFie", filesToUpload);
                    startUpload(filesToUpload);
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
          <div className="mt-2 space-y-2">
            {files.map((file) => renderFileStatus(file))}
          </div>
        </div>
      )}
    </div>
  );
};

function UploadButtons({
  files,
  onClear,
  onUpload,
  isLoading,
}: {
  files: FileType[];
  isLoading: boolean;
  onClear: () => void;
  onUpload: () => void;
}) {
  return (
    <div className="flex size-full flex-wrap items-center justify-center gap-2 pb-5 sm:flex-nowrap xl:w-auto xl:justify-end xl:px-0 xl:pb-0">
      {/* <Button
        type="button"
        variant={"outline"}
        className="gap-2 rounded-md border bg-transparent xl:w-auto"
        disabled={isLoading}
        onClick={onClear}
      >
        <Trash className="size-4 me-2" />
        Clear {files.length} {files.length > 1 ? "Files" : "File"}
      </Button> */}
      <Button
        type="button"
        variant={"ghost"}
        className=" group gap-2 rounded-md bg-primary-salmon text-white hover:bg-primary xl:w-auto"
        disabled={isLoading}
        onClick={onUpload}
      >
        <UploadIcon className="text-white group-hover:text-black" /> Upload{" "}
        {files.length} {files.length > 1 ? "Files" : "File"}
      </Button>
    </div>
  );
}

export const MediaPreview = ({ name, url }: { name?: string; url: string }) => {
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
};
function MediaCaption({ name, size }: { name: string; size: number }) {
  return (
    <div className="mt-1 rounded-md px-2 py-1 text-xs dark:bg-dark-300">
      <p className="line-break font-medium text-gray-700 dark:text-light-500 ">
        {name}
      </p>
      <p className="mt-1 font-mono">{size && formatBytes(size)}</p>
    </div>
  );
}
