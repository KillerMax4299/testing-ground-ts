import { MultiSelect } from "@/components/ui/MultiSelect";
import Datatables from "./Datatable";
import DragComponent from "./DragComponent";

const UiComponents = () => {
  const frameworksList = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  return (
    <div className="h-screen w-screen bg-white dark:bg-zinc-900 p-2">
      <div className="w-72">
        <MultiSelect
          options={frameworksList}
          onValueChange={(e) => console.log(e)}
          
          placeholder="Select options"
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>
      <DragComponent/>
    </div>
  );
};

export default UiComponents;
