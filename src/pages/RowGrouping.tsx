import { cn } from "@/lib/utils";

interface ListItem {
  id: number;
  name: string;
  position: number;
  color: string;
  color2:string
}

interface Props {
  initialItems?: ListItem[];
}

import { useState } from "react";
import { Save } from "lucide-react";

const ReorderableList: React.FC<Props> = ({
  initialItems = [
    {
      id: 1,
      name: "Item 1",
      position: 1,
      color: "text-red-500",
      color2: "text-red-400",
    },
    {
      id: 2,
      name: "Item 2",
      position: 2,
      color: "text-green-500",
      color2: "text-green-400",
    },
    {
      id: 3,
      name: "Item 3",
      position: 3,
      color: "text-yellow-500",
      color2: "text-yellow-400",
    },
    {
      id: 4,
      name: "Item 4",
      position: 4,
      color: "text-blue-500",
      color2: "text-blue-400",
    },
  ],
}) => {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [workingItems, setWorkingItems] = useState<ListItem[]>(initialItems);

  const handlePositionChange = (index: number, change: number): void => {
    const newItems = [...workingItems];
    const currentItem = newItems[index];
    const newPosition = Math.max(
      1,
      Math.min(items.length, currentItem.position + change),
    );

    // Only proceed if position actually changes
    if (newPosition === currentItem.position) return;

    // Find the item that needs to swap
    const itemToSwap = newItems.find((item) => item.position === newPosition);

    // Update positions
    if (itemToSwap) {
      itemToSwap.position = currentItem.position;
    }
    currentItem.position = newPosition;

    // Update all items in between if moving multiple positions
    if (Math.abs(change) > 1) {
      const direction = change > 0 ? 1 : -1;
      const start = currentItem.position - direction;
      const end = newPosition - direction;

      for (
        let pos = start;
        direction > 0 ? pos < end : pos > end;
        pos += direction
      ) {
        const itemToMove = newItems.find((item) => item.position === pos);
        if (itemToMove) {
          itemToMove.position = pos + direction;
        }
      }
    }

    setWorkingItems(newItems);
  };

  const handleSave = (): void => {
    // Sort items based on position
    const sortedItems = [...workingItems].sort(
      (a, b) => a.position - b.position,
    );

    // Normalize positions to ensure they're sequential
    const normalizedItems = sortedItems.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    setItems(normalizedItems);
    setWorkingItems(normalizedItems);
  };

  // Sort items by position for display
  const sortedWorkingItems = [...workingItems].sort(
    (a, b) => a.position - b.position,
  );

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="space-y-4">
        {workingItems.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm dark:bg-zinc-800"
          >
            <span className={cn(item.color, "text-lg")}>{item.name}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePositionChange(index, -1)}
                className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 dark:bg-zinc-900"
                type="button"
              >
                -
              </button>
              <span className="w-8 text-center">{item.position}</span>
              <button
                onClick={() => handlePositionChange(index, 1)}
                className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 dark:bg-zinc-900"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        type="button"
      >
        <Save size={20} />
        Save Order
      </button>

      <div className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-zinc-900">
        <h3 className="mb-2 font-bold">Current Order (Before Save):</h3>
        <div className="space-y-2">
          {sortedWorkingItems.map((item) => (
            <div key={item.id} className={cn(item.color2)}>
              {item.position}. {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-4 rounded-lg bg-gray-100 p-4">
        <h3 className="mb-2 font-bold">Saved Order:</h3>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={item.id} className="text-gray-700">
              {index + 1}. {item.name}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ReorderableList;
