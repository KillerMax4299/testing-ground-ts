import UiComponents from "@/pages/UiComponents";
import SeatArrangements from "@/pages/SeatArrangements";

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
];
