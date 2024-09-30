import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { cn } from "@/lib/utils";

const FramerMotion = () => {
  const [frame, setFrame] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const nextFrame = () => {
    setDirection(1);
    setFrame((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prevFrame = () => {
    setDirection(-1);
    setFrame((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    console.log(isFlipped);
  }, [isFlipped]);

  return (
    <div className="mx-auto mt-20 h-min w-40 border">
      <div className="relative h-40 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          {frame === 1 && (
            <Frame
              key={1}
              frameNum={1}
              className="bg-green-500"
              custom={direction}
            />
          )}
          {frame === 2 && (
            <Frame
              key={2}
              frameNum={2}
              className="bg-amber-400"
              custom={direction}
            />
          )}
          {frame === 3 && (
            <Frame
              key={3}
              frameNum={3}
              className="bg-red-600"
              custom={direction}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="mt-1 flex justify-between">
        <button
          className={cn(
            "rounded-md bg-blue-400 px-2 py-1 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300",
          )}
          onClick={prevFrame}
          disabled={frame === 1}
        >
          prev
        </button>
        <button
          className={cn(
            "rounded-md bg-blue-400 px-2 py-1 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300",
          )}
          onClick={nextFrame}
          disabled={frame === 3}
        >
          next
        </button>
      </div>
    </div>
  );
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
      scale: 1,
    };
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
      scale: 1,
    };
  },
};

const Frame = ({
  frameNum,
  className,
  frontText,
  backText,
  custom,
}: {
  frameNum: number;
  className: string;
  frontText?: string;
  backText?: string;
  custom: number;
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  return (
    <motion.div
      variants={variants}
      custom={custom}
      initial="enter"
      animate="center"
      exit="exit"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      transition={{
        // x: { type: "spring", stiffness: 300, damping: 30 },
        duration: 0.3,
        ease: cubicBezier(0.4, 0, 0.2, 1),
        opacity: { duration: 0.2 },
      }}
      className={cn(
        "absolute left-0 top-0 size-40 bg-transparent p-1 px-2 capitalize text-black",
      )}
    >
      <div
        className={cn(
          "perspective-1000 flex h-full w-full items-center justify-center rounded-md",
        )}
      >
        <motion.div
          className={cn(className, "backface-hidden absolute h-full w-full")}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div
            className={cn(
              "flex h-full w-full items-center justify-center rounded-md",
            )}
          >
            Frame {frameNum}
          </div>
        </motion.div>
        <motion.div
          className={cn(className, "backface-hidden absolute h-full w-full")}
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ rotateY: 180 }}
        >
          <div
            className={cn(
              "flex h-full w-full items-center justify-center rounded-md",
            )}
          >
            Back {frameNum}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FramerMotion;
