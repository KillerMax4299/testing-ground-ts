import { MultiSelect } from "@/components/ui/MultiSelect";
import Datatables from "./Datatable";
import DragComponent from "./DragComponent";
import { ReactTableDevtools } from "@tanstack/react-table-devtools";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import { TableBody, TableCell } from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  Table as TableType,
  Row,
} from "@tanstack/react-table";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

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
      <form
        action="
      "
      >
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
      </form>
      {/* <DragComponent/> */}
      <EditableTable />
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

interface CustomColumnProperties {
  className?: string;
  headclass?: string;
  accessorKey?: string;
  editable?: boolean;
}

type CustomColumnDef<TData> = ColumnDef<TData> & CustomColumnProperties;

const SelectableTable = () => {
  // Sample data
  const ListOptions = [10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);
  const { data: demandList } = useQuery({
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

  // Define columns without column helper
  const columns: CustomColumnDef<DataItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
    },
    {
      accessorKey: "participants_id",
      header: "Id",
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
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageSize: items == "all" ? demandList?.total : (items as number),
      },
      sorting: [
        {
          id: columns[1].accessorKey as string,
          desc: false,
        },
      ],
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
              onChange={(e) =>
                setItems(
                  parseInt(e.target.value)
                    ? parseInt(e.target.value)
                    : e.target.value,
                )
              }
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
            <>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            (
                              header.column
                                .columnDef as CustomColumnDef<DataItem>
                            ).headclass,
                            "whitespace-nowrap bg-zinc-100 dark:bg-zinc-800",
                          )}
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              className={cn(
                                "select-none normal-case",
                                header.column.columnDef.header,
                              )}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </span>
                            {/* <SortIcon
                              sort={header.column.getIsSorted()}
                              accessorKey={header.column.columnDef.accessorKey}
                            /> */}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <tbody className="divide-y">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={cn(
                            (cell.column.columnDef as CustomColumnDef<DataItem>)
                              .className,
                            "whitespace-nowrap px-4 py-2",
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
              </Table>
            </>
          </div>
          <Pagination data={data} table={table} />
        </div>
      </>
      <ReactTableDevtools table={table} />
    </div>
  );
};

export const Pagination = ({
  table,
  data,
}: {
  table: TableType<DataItem>;
  data: any;
}) => {
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

interface Person {
  id?: number;
  firstName: string;
  lastName: string;
  age: string;
  role: string;
}

interface PosPerson extends Person {
  positionIndex: number;
}

// Define props for the EditableCell component
interface EditableCellProps {
  getValue: () => any;
  row: { index: number };
  column: { id: string; columnDef: ColumnDef<Person> & { editable?: boolean } };
  table: {
    options: {
      meta?: {
        updateData: (rowIndex: number, columnId: string, value: string) => void;
      };
    };
  };
}

interface EditableTableProps {
  onDataChange?: (data: Person[]) => void;
  initialData?: Person[];
}

const EditableCell = ({ getValue, row, column, table }: EditableCellProps) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnDef = column.columnDef;

  const onBlur = () => {
    if (value !== initialValue) {
      table.options.meta?.updateData(row.index, column.id, value);
    }
  };

  if (!columnDef.editable) {
    return <span className="px-2">{value}</span>;
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="w-fit outline-none dark:bg-transparent"
    />
  );
};

const EditableSelect = ({
  getValue,
  row,
  column,
  table,
}: EditableCellProps) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnDef = column.columnDef;

  const onBlur = () => {
    if (value !== initialValue) {
      table.options.meta?.updateData(row.index, column.id, value);
    }
  };

  if (!columnDef.editable) {
    return <span className="px-2">{value}</span>;
  }

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="w-fit outline-none dark:bg-transparent"
    />
  );
};

const EditableTable = ({ onDataChange }: EditableTableProps) => {
  const defaultData: Person[] = [
    { id: 1, firstName: "John", lastName: "Doe", age: "25", role: "Developer" },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      age: "30",
      role: "Designer",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      age: "35",
      role: "Manager",
    },
  ];

  const [data, setData] = useState<PosPerson[]>(
    defaultData.map((e, i) => {
      return { positionIndex: i + 1, ...e };
    }),
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData] = useState<PosPerson[]>(
    defaultData.map((e, i) => {
      return { positionIndex: i + 1, ...e };
    }),
  );

  const handlePositionChange = (index: number, change: number): void => {
    const newItems = [...data];
    // const currentItem = newItems.filter((e) => e.positionIndex == index + 1)[0];
    const currentItem = newItems[index];

    const newPosition = Math.max(
      1,
      Math.min(data.length, currentItem.positionIndex + change),
    );

    // Only proceed if position actually changes
    if (newPosition === currentItem.positionIndex) return;

    // Find the item that needs to swap
    const itemToSwap = newItems.find(
      (item) => item.positionIndex === newPosition,
    );

    // Update positions
    if (itemToSwap) {
      itemToSwap.positionIndex = currentItem.positionIndex;
    }
    currentItem.positionIndex = newPosition;

    setData(newItems);
  };

  const columns: CustomColumnDef<Person>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
      // @ts-expect-error Table cell type incompatibility
      cell: EditableCell,
      editable: true,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      // @ts-expect-error Table cell type incompatibility
      cell: EditableCell,
      editable: true,
    },
    {
      accessorKey: "age",
      header: "Age",
      // @ts-expect-error Table cell type incompatibility
      cell: EditableCell,
      editable: false,
    },
    {
      accessorKey: "role",
      header: "Role",
      // @ts-expect-error Table cell type incompatibility
      cell: EditableCell,
      editable: false,
    },
    {
      accessorKey: "positionIndex",
      header: "Hierarchy",

      cell: ({ row }: { row: Row<any> }) => (
        <>
          <button
            onClick={() => handlePositionChange(row.index, -1)}
            className="border p-2 px-4"
          >
            -
          </button>
          {row.original.positionIndex}
          <button
            onClick={() => handlePositionChange(row.index, 1)}
            className="border p-2 px-4"
          >
            +
          </button>
        </>
      ),
      editable: false,
    },
  ];

  const checkForChanges = useCallback(
    (newData: Person[]) => {
      const hasAnyChanges = newData.some((row, index) => {
        const originalRow = originalData[index];
        return Object.keys(row).some(
          (key) =>
            row[key as keyof Person] !== originalRow[key as keyof Person],
        );
      });
      setHasChanges(hasAnyChanges);
    },
    [originalData],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) => {
          const newData = old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          });

          // Check for changes and notify parent
          checkForChanges(newData);
          onDataChange?.(newData);

          return newData;
        });
      },
    },
  });

  const handleSave = () => {
    // Here you can implement your save logic
    console.log("Saving changes:", data);
    setHasChanges(false);
  };

  const handleReset = () => {
    setData(originalData);
    setHasChanges(false);
    onDataChange?.(originalData);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={!hasChanges}>
          Save Changes
        </Button>
        <Button onClick={handleReset} variant="outline" disabled={!hasChanges}>
          Reset
        </Button>
      </div>
    </div>
  );
};
