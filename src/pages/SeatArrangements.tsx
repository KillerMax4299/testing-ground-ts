import { cn } from "@/lib/utils";
import { useState } from "react";

interface Seat {
  id: string;
  number: number;
  status: "available" | "booked" | "selected";
  /**
   * When true the seat is hidden.
   */
  hidden?: boolean;
}

const areRowsEqual = (rows: Seat[][], seatData: Seat[][]): boolean => {
  return JSON.stringify(rows) === JSON.stringify(seatData);
};

const SeatArrangements = () => {
  const seatData: Seat[][] = [
    [
      { id: "1A", number: 1, status: "available" },
      { id: "1B", number: 2, status: "available" },
      { id: "1C", number: 3, status: "available" },
      { id: "1D", number: 4, status: "available" },
    ],
    [
      { id: "2A", number: 1, status: "available" },
      { id: "2B", number: 2, status: "available" },
      { id: "2C", number: 3, status: "available" },
      { id: "2D", number: 4, status: "available" },
    ],
    [
      { id: "3A", number: 1, status: "available" },
      { id: "3B", number: 2, status: "available" },
      { id: "3C", number: 3, status: "available" },
      { id: "3D", number: 4, status: "available" },
    ],
    [
      { id: "4A", number: 1, status: "available" },
      { id: "4B", number: 2, status: "available" },
      { id: "4C", number: 3, status: "available" },
      { id: "4D", number: 4, status: "available" },
    ],
    [
      { id: "5A", number: 1, status: "available" },
      { id: "5B", number: 2, status: "available" },
      { id: "5C", number: 3, status: "available" },
      { id: "5D", number: 4, status: "available" },
    ]
  ];

  const [rows, setRows] = useState<Seat[][]>(seatData);

  const handleSeatClick = (seat: Seat) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.map((s) =>
          s.id === seat.id
            ? {
                ...s,
                status:
                  s.status === "booked"
                    ? "booked"
                    : s.status === "available"
                      ? "selected"
                      : "available",
              }
            : s,
        ),
      ),
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-2 p-2">
        {rows.map((e) => (
          <div className="flex space-x-2">
            {e.map((e) => (
              <div
                onClick={() => handleSeatClick(e)}
                className={cn(
                  "size-8 cursor-pointer select-none",
                  e.status == "available"
                    ? "bg-green-500"
                    : e.status == "selected"
                      ? "bg-amber-500"
                      : "bg-zinc-500",
                  e.hidden
                    ? "invisible"
                    : "flex items-center justify-center rounded-md text-xs",
                )}
              >
                  
              </div>
            ))}
          </div>
        ))}
      </div>
      {!areRowsEqual(rows, seatData) && (
        <button className="rounded-md bg-amber-400 px-4 py-2 text-black">
          Confirm
        </button>
      )}
    </>
  );
};

export default SeatArrangements;
