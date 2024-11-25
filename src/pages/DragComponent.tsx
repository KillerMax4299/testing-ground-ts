import { CustomDragDrop } from "@/components/ui/CustomContainer";
import { useState } from "react";

export interface OwnerLicenseProps {
  name: string;
  photo: string;
  type: string;
  size: number;
}

export default function DragComponent() {
  const [_, setisFileUploadError] = useState<boolean>(false);
  const [ownerLicense, setOwnerLicense] = useState<OwnerLicenseProps[]>([]);

  

  return (
   
      <CustomDragDrop
        ownerLicense={ownerLicense}
        setOwnerLicense={setOwnerLicense}
        setisFileUploadError={setisFileUploadError}
        maxFiles={10}
        formatList={["jpg", "jpeg", "png"]}
        maxFileSize={1024}
      />
    
  );
}
