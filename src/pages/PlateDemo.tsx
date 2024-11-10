import {
  usePlateEditor,
  Plate,
  PlateContent,
} from "@udecode/plate-common/react";

const PlateDemo = () => {
  const editor = usePlateEditor();

   return (
     <Plate editor={editor}>
       <PlateContent placeholder="Type..." />
     </Plate>
   );
};

export default PlateDemo;
