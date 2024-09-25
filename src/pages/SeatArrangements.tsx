import { cn } from "@/lib/utils";
import { useState } from "react";

interface SeatCreation {
  hidden: boolean;
  label?: string;
}

const areRowsEqual = (
  rows: SeatCreation[][],
  seatData: SeatCreation[][],
): boolean => {
  return JSON.stringify(rows) === JSON.stringify(seatData);
};

const SeatArrangements = () => {
  const [grid, setGrid] = useState<SeatCreation[][]>([]);
  const [rows, setRows] = useState<SeatCreation[][]>([]);
  const [confirmedGrid, setConfirmedGrid] = useState<SeatCreation[][]>([]);

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

  function resetChanges() {
    setRows(grid)
  }

  const generateGrid = (rows: number, columns: number) => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ hidden: false })),
    );
    setGrid(newGrid);
    setRows(newGrid);
  };

  const confirmArrangement = () => {
    let currentLetter = "A";
    const newConfirmedGrid = rows.map((row) => {
      const isRowHidden = row.every((seat) => seat.hidden);
      let columnCounter = 1;

      if (isRowHidden) {
        return row.map((seat) => ({ ...seat, label: undefined }));
      }

      const labeledRow = row.map((seat) => {
        if (!seat.hidden) {
          const label = `${currentLetter}${columnCounter}`;
          columnCounter++;
          return { ...seat, label };
        }
        return { ...seat, label: undefined };
      });

      currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
      return labeledRow;
    });

    setConfirmedGrid(newConfirmedGrid);
  };

  return (
    <>
      <div className="flex space-x-2 p-2">
        <input
          type="text"
          placeholder="Columns"
          value={columns == 0 ? "" : columns}
          onChange={(e) => setColumns(+e.target.value)}
          className="w-24 rounded-md border border-zinc-500 bg-transparent px-4 py-2"
        />
        <input
          type="text"
          value={rowNo == 0 ? "" : rowNo}
          onChange={(e) => setRowNo(+e.target.value)}
          placeholder="Rows"
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
        {confirmedGrid.length == 0 && rows.map((e, i) => (
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
      {confirmedGrid.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Confirmed Arrangement:</h3>
          <div className="flex flex-col space-y-2 p-2">
            {confirmedGrid.map((row, i) => (
              <div key={i} className="flex space-x-2">
                {row.map((seat, j) => (
                  <div
                    key={j}
                    className={cn(
                      "size-8 select-none",
                      seat.hidden ? "bg-transparent" : "bg-green-500",
                      "flex items-center justify-center rounded-md text-xs",
                    )}
                  >
                    {seat.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {!areRowsEqual(rows, grid) && confirmedGrid.length === 0 && (
        <div className="space-x-4 p-2">
          <button
            onClick={confirmArrangement}
            className="rounded-md bg-amber-400 px-4 py-2 text-black"
          >
            Confirm
          </button>
          <button
            onClick={resetChanges}
            className="rounded-md bg-red-500 px-4 py-2 text-black"
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
};

export default SeatArrangements;
