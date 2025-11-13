"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { title, url } from "@/lib/metadata";

const fruits = ["apple", "banana", "cherry", "orange", "grape"];

function getRandomFruit() {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export function SlotMachine({ onWin }: { onWin: (fruit: string) => void }) {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, getRandomFruit))
  );
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const interval = setInterval(() => {
      setGrid((prev) => {
        const newGrid = prev.map((row) => [...row]);
        // shift rows down
        newGrid[2] = [...newGrid[1]];
        newGrid[1] = [...newGrid[0]];
        newGrid[0] = Array.from({ length: 3 }, getRandomFruit);
        return newGrid;
      });
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      const centerRow = grid[1];
      if (
        centerRow[0] === centerRow[1] &&
        centerRow[1] === centerRow[2]
      ) {
        onWin(centerRow[0]);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.flat().map((fruit, idx) => (
          <div
            key={idx}
            className="w-12 h-12 flex items-center justify-center border rounded"
          >
            <img
              src={`/${fruit}.png`}
              alt={fruit}
              className="w-10 h-10"
            />
          </div>
        ))}
      </div>
      <Button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </Button>
    </div>
  );
}
