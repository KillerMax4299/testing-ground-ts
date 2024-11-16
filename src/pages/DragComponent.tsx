import { CustomDragDrop } from "@/components/ui/CustomContainer";
import { useState } from "react";

export interface OwnerLicenseProps {
  name: string;
  photo: string;
  type: string;
  size: number;
}

export default function DragComponent() {
  const [_isFileUploadError, setisFileUploadError] = useState<boolean>(false);
  const [ownerLicense, setOwnerLicense] = useState<OwnerLicenseProps[]>([]);

  

  return (
    <div className="w-full rounded-lg bg-white px-5 pb-5 pt-3 shadow dark:bg-transparent">
      <div className="border-b border-[#e0e0e0] pb-[8px]">
        <h2 className="text-[17px] font-[600] text-black dark:text-white">
          Drag and Drop Container
        </h2>
      </div>
      <CustomDragDrop
        ownerLicense={ownerLicense}
        setOwnerLicense={setOwnerLicense}
        setisFileUploadError={setisFileUploadError}
        maxFiles={10}
        formats={["jpg", "jpeg", "png"]}
        maxFileSize={1024}
      />
    </div>
  );
}
