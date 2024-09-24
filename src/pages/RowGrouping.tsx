import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

type Player = {
  firstName: string;
  club: string;
};

const data: Player[] = [
  { firstName: "James", club: "Basketball Club" },
  { firstName: "Eric", club: "Basketball Club" },
  { firstName: "Smith", club: "Basketball Club" },
  { firstName: "Scott", club: "Pro Basketball Club" },
  { firstName: "Elvin", club: "Pro Basketball Club" },
];

const columnHelper = createColumnHelper<Player>();

const columns = [
  columnHelper.group({
    id: "sports",
    header: "Sports",
    columns: [
      columnHelper.group({
        header: "Club",
        columns: [
          columnHelper.accessor("club", {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
          }),
        ],
      }),
      columnHelper.accessor("firstName", {
        header: "Player First Name",
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      }),
    ],
  }),
];


export default function GroupedTable  () {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
