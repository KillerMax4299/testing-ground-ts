import UiComponents from "@/pages/UiComponents";
import SeatArrangements from "@/pages/SeatArrangements";
import GroupedTable from "@/pages/RowGrouping";

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
];
