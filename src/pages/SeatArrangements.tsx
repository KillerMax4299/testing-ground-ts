import { cn } from "@/lib/utils";
import { useState } from "react";



interface SeatCreation {
  hidden: boolean;
}

const areRowsEqual = (rows: SeatCreation[][], seatData: SeatCreation[][]): boolean => {
  return JSON.stringify(rows) === JSON.stringify(seatData);
};

const SeatArrangements = () => {
  
  const [grid, setGrid] = useState<SeatCreation[][]>([]);
  const [rows, setRows] = useState<SeatCreation[][]>([]);

  const [columns, setColumns] = useState<number>(0);
  const [rowNo, setRowNo] = useState<number>(0);

  const handleSeatClick = (first: number, second: number) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        row.map((s, y) =>
          i == first && y == second
            ? {
                ...s,
                hidden: s.hidden ? false : true,
              }
            : s,
        ),
      ),
    );
  };

  const generateGrid = (rows: number, columns: number) => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ hidden: false })),
    );
    setGrid(newGrid);
    setRows(newGrid);
  };

  return (
    <>
      <div className="flex space-x-2 p-2">
        <input
          type="text"
          value={rowNo == 0 ? "" : rowNo}
          onChange={(e) => setRowNo(+e.target.value)}
          placeholder="Rows"
          className="w-24 rounded-md border border-zinc-500 bg-transparent px-4 py-2"
        />
        <input
          type="text"
          placeholder="Columns"
          value={columns == 0 ? "" : columns}
          onChange={(e) => setColumns(+e.target.value)}
          className="w-24 rounded-md border border-zinc-500 bg-transparent px-4 py-2"
        />
        <button
          className="rounded-md bg-blue-600 px-4 py-2 capitalize"
          onClick={() => generateGrid(rowNo, columns)}
        >
          create
        </button>
      </div>
      <div className="flex flex-col space-y-2 p-2">
        {rows.map((e, i) => (
          <div className="flex space-x-2">
            {e.map((e, y) => (
              <div
                onClick={() => handleSeatClick(i, y)}
                className={cn(
                  "size-8 cursor-pointer select-none",
                  e.hidden ? "bg-zinc-500" : "bg-green-500",
                  "flex items-center justify-center rounded-md text-xs",
                )}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {!areRowsEqual(rows, grid) && (
        <button className="rounded-md bg-amber-400 px-4 py-2 text-black">
          Confirm
        </button>
      )}
    </>
  );
};

export default SeatArrangements;
