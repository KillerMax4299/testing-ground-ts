import { MultiSelect } from "@/components/ui/MultiSelect";
import Datatables from "./Datatable";
import DragComponent from "./DragComponent";
import { ReactTableDevtools } from "@tanstack/react-table-devtools";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Table,
  Row,
} from "@tanstack/react-table";
import {

  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

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
    <div className="h-screen w-screen bg-white p-2 dark:bg-zinc-900">
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
      {/* <DragComponent/> */}
      <SelectableTable />
    </div>
  );
};

export default UiComponents;

// Memoized row component to prevent unnecessary re-renders

type DataItem = {
  participants_id: number;
  participant_name: string;
  participant_designation_name: string;
};

const SelectableTable = () => {
  // Sample data
  const ListOptions = [10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);
  const { data: demandList, isLoading: loading } = useQuery({
    queryKey: ["demandList"],
    queryFn: async () => {
      const data = await axios.get(
        "http://localhost:4000/api/Participants/participantsDropdown_Tire_wise?tier=2&designation=NaN&district=NaN&block=NaN&gp=NaN&subdivision=0",
      );
      //);
      return data.data;
    },
  });

  const data = useMemo(() => demandList?.result ?? [], [demandList]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {}, []);

  // Define columns without column helper
  const columns: ColumnDef<DataItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="h-4 w-4"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="h-4 w-4"
        />
      ),
    },
    {
      accessorKey: "participants_id",
      header: "ID",
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "participant_name",
      header: "Name",
    },
    {
      accessorKey: "participant_designation_name",
      header: "Value",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: items == "all" ? demandList?.total : items as number,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row: DataItem) => row.participants_id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    enableSortingRemoval: false,

  });

  return (
    <div className="w-full">
      <>
        <div className="flex flex-grow flex-col p-1 px-12">
          <div className="flex h-12 items-center justify-between px-2">
            <select
              className="rounded-lg dark:bg-zinc-800"
              name=""
              id=""
              value={items}
              onChange={(e) => setItems(parseInt(e.target.value) ? parseInt(e.target.value) : e.target.value)}
            >
              {ListOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <div className="h-full py-1">
              <input
                type="text"
                value={filtering}
                placeholder="search..."
                className="rounded-lg border-2 border-zinc-400 dark:bg-zinc-800"
                onChange={(e) => setFiltering(e.target.value)}
              />
            </div>
          </div>
          <div className="show-scrollbar h-fit w-full overflow-x-auto overflow-y-hidden">
            <table className="drop-shadow-none">
              {table.getHeaderGroups().map((headerGroup) => (
                <thead key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <td
                      key={header.id}
                      className={cn(
                        header.column.columnDef.headclass,
                        "theader-style whitespace-nowrap bg-cyan-400/90 transition-all",
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center justify-between space-x-2">
                          <span className="normal-case">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>
                        </div>
                      )}
                    </td>
                  ))}
                </thead>
              ))}

              <tbody className="divide-y">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="divide-x">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={cn(
                          cell.column.columnDef.className,
                          "whitespace-nowrap px-2 py-1",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination data={data} table={table} />
        </div>
      </>
      <ReactTableDevtools table={table} />
    </div>
  );
};

export const Pagination = ({ table, data }: { table: any; data: any }) => {
  const { pageIndex, pageSize } = table.getState().pagination;

  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, data?.length);

  return (
    <>
      <div className="flex justify-center overflow-x-auto">
        <nav className="">
          <div className="flex space-x-1 text-sm text-gray-700 dark:text-gray-400">
            <span>Showing</span>

            <span className="font-semibold text-gray-900 dark:text-white">
              {startIndex}
            </span>

            <span>to</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {endIndex}
            </span>
            <span>of</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {data?.length}
            </span>
            <span>Entries</span>
          </div>
          <ul className="xs:mt-0 mt-2 inline-flex items-center -space-x-px">
            <li>
              <button
                type="button"
                className="rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 disabled:cursor-not-allowed disabled:text-opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </button>
            </li>
            <li>
              <button
                type="button"
                className="rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 disabled:cursor-not-allowed disabled:text-opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
