import UiComponents from "@/pages/UiComponents";
import SeatArrangements from "@/pages/SeatArrangements";
import GroupedTable from "@/pages/RowGrouping";
import StepperForm from "@/pages/StepperForm";
import DynamicForm from "@/pages/DynamicForm";
import FramerMotion from "@/pages/FramerMotion";

export const routes = [
  {
    name: "Multi Select",
    path: "/multi-select",
    Component: UiComponents,
  },
  {
    name: "Seat Arrangement",
    path: "/seat",
    Component: SeatArrangements,
  },
  {
    name: "Grouped Table",
    path: "/table",
    Component: GroupedTable,
  },
  {
    name: "Stepper Form",
    path: "/stepper",
    Component: StepperForm,
  },
  {
    name: "Dynamic Form",
    path: "/dynamic",
    Component: DynamicForm,
  },
  {
    name: "Framer motion",
    path: "/motion",
    Component: FramerMotion,
  },
];
