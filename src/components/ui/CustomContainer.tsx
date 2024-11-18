import {
  useRef,
  useEffect,
  useState,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import { FaUpload, FaRegFileImage, FaRegFile } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { OwnerLicenseProps } from "@/pages/DragComponent";
import { cn } from "@/lib/utils";
// Define proper TypeScript interfaces

interface DropProps {
  ownerLicense: OwnerLicenseProps[];
  setisFileUploadError: Dispatch<SetStateAction<boolean>>;
  maxFiles: number;
  formatList: string[];
  maxFileSize: number;
  setOwnerLicense: Dispatch<SetStateAction<OwnerLicenseProps[]>>;
}

interface AlertProps {
  icon: "warning" | "error" | "success" | "info";
  title: string;
  text: string;
}

export function CustomDragDrop({
  ownerLicense,
  setOwnerLicense,
  setisFileUploadError,
  maxFiles,
  formatList,
  maxFileSize,
}: DropProps) {
  const dropContainer = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const formats = useMemo(() => {
    return [...formatList, ...formatList.map((e) => e.toLocaleUpperCase())];
  }, []);

  // Temporary alert function - replace with your preferred alert system
  const showAlert = ({ icon, title, text }: AlertProps) => {
    console.log(`${icon}: ${title} - ${text}`);
    // Implement your preferred alert system here
  };

  const filteredFiles = useMemo(() => {
    return ownerLicense.map(({ size }) =>
      maxFileSize * 1024 > size ? false : true,
    );
  }, [ownerLicense]);

  useEffect(() => {
    setisFileUploadError(filteredFiles.includes(true));
  }, [filteredFiles]);

  function onUpload(f: OwnerLicenseProps[]) {
    setOwnerLicense([...ownerLicense, ...f]);
  }

  function onDelete(indexImg: number) {
    const updatedList = ownerLicense.filter(
      (_ele, index) => index !== indexImg,
    );
    setOwnerLicense(updatedList);
  }

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    type: "inputFile" | "dropFile",
  ) => {
    let files: File[];

    if (type === "inputFile" && "target" in e) {
      const inputElement = e.target as HTMLInputElement;
      files = Array.from(inputElement.files || []);
    } else if ("dataTransfer" in e) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      files = Array.from(e.dataTransfer.files);
    } else {
      return;
    }

    // Check if adding these files would exceed the maximum
    if (ownerLicense.length + files.length > maxFiles) {
      showAlert({
        icon: "warning",
        title: "Maximum Files Exceeded",
        text: `Only ${maxFiles} files can be uploaded in total. You currently have ${ownerLicense.length} files.`,
      });
      return;
    }

    // Validate file formats
    const allFilesValid = files.every((file) =>
      formats.some((format) => file.type.endsWith(`/${format}`)),
    );

    if (!allFilesValid) {
      showAlert({
        icon: "warning",
        title: "Invalid Media",
        text: `Invalid file format. Please only upload ${formats.join(", ").toUpperCase()}`,
      });
      return;
    }

    try {
      const newFiles = await Promise.all(
        files.map(async (file) => {
          const base64String = await convertFileBase64(file);
          return {
            name: file.name,
            photo: base64String,
            type: file.type,
            size: file.size,
          };
        }),
      );

      onUpload(newFiles);
    } catch (error) {
      showAlert({
        icon: "error",
        title: "Upload Error",
        text: "An error occurred while processing the files.",
      });
    }
  };

  const convertFileBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    const currentContainer = dropContainer.current;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    };

    const handleDropEvent = (e: DragEvent) => {
      handleDrop(e as unknown as React.DragEvent<HTMLDivElement>, "dropFile");
    };

    if (currentContainer) {
      currentContainer.addEventListener("dragover", handleDragOver);
      currentContainer.addEventListener("drop", handleDropEvent);
      currentContainer.addEventListener("dragleave", handleDragLeave);

      return () => {
        currentContainer.removeEventListener("dragover", handleDragOver);
        currentContainer.removeEventListener("drop", handleDropEvent);
        currentContainer.removeEventListener("dragleave", handleDragLeave);
      };
    }
  }, [ownerLicense]);

  return (
    <>
      <div
        className={cn(
          dragging
            ? "border border-blue-400 bg-zinc-100 dark:bg-zinc-800"
            : "border-dashed border-zinc-300 dark:border-zinc-500",
          "mx-auto mt-4 flex items-center justify-center rounded-md border-2 py-5 text-center",
        )}
        ref={dropContainer}
      >
        <div className="flex flex-1 flex-col">
          <div className="mx-auto mb-2 text-gray-400">
            <FaUpload size={18} />
          </div>
          <div className="text-[12px] font-normal text-gray-500">
            <input
              className="hidden opacity-0"
              type="file"
              multiple
              accept={formats.map((format) => `.${format}`).join(",")}
              ref={fileRef}
              onChange={(e) => handleDrop(e, "inputFile")}
            />
            <span
              className="cursor-pointer text-indigo-500"
              onClick={() => fileRef.current?.click()}
            >
              Click to upload
            </span>{" "}
            or drag and drop
          </div>
          <div className="text-[10px] font-normal text-gray-500">
            {`Maximum ${maxFiles} files: ${formatList.join(", ").toUpperCase()}`}
          </div>
        </div>
      </div>

      {ownerLicense.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {ownerLicense.map((img, index) => (
            <div
              key={index}
              className={cn(
                "w-full space-y-3 rounded-md px-3 py-3.5",
                filteredFiles[index]
                  ? "bg-red-200 dark:bg-red-900"
                  : "bg-slate-200 dark:bg-slate-600",
              )}
            >
              <div className="flex justify-between">
                <div className="flex w-[70%] max-w-[70%] items-center justify-start space-x-2">
                  <div
                    className={cn(
                      "cursor-pointer text-[37px]",
                      filteredFiles[index]
                        ? "text-red-500 dark:text-red-400"
                        : "text-indigo-500 dark:text-indigo-400",
                    )}
                  >
                    {img.type.match(/image.*/i) ? (
                      <FaRegFileImage />
                    ) : (
                      <FaRegFile />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="overflow-wrap-anywhere break-all text-xs font-medium text-gray-500 dark:text-gray-300">
                      {img.name}
                    </div>
                    <div
                      className={cn(
                        "flex flex-wrap gap-1 text-xs font-medium",
                        filteredFiles[index]
                          ? "text-red-600 dark:text-red-300"
                          : "text-gray-400",
                      )}
                    >
                      <span className="whitespace-nowrap">{`${Math.floor(img.size / 1024)} KB`}</span>
                      {filteredFiles[index] && (
                        <span className="overflow-wrap-anywhere break-words">
                          (This file exceeds the file size limit)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-end">
                  <div className="space-y-1">
                    <div
                      className="cursor-pointer text-lg text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                      onClick={() => onDelete(index)}
                    >
                      <BsX className="ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
