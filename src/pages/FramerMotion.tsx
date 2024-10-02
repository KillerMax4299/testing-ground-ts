import { useState, Fragment, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FramerMotion = () => {
  const [frame, setFrame] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);

  const nextFrame = () => {
    setDirection(1);
    setFrame((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prevFrame = () => {
    setDirection(-1);
    setFrame((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Steps frame={frame} totalForms={3} />
      </div>

      <div className="mx-auto h-min w-40">
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
        <div className="mt-1 flex justify-between px-2">
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
    </>
  );
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const Frame = ({
  frameNum,
  className,
  custom,
}: {
  frameNum: number;
  className: string;
  custom: number;
}) => {
  const [isFlipped, setIsFlipped] = useState<string | undefined>();

  return (
    <motion.div
      variants={variants}
      custom={custom}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 3000, damping: 300 },
        opacity: { duration: 0.2 },
      }}
      className={cn(
        "absolute left-0 top-0 size-40 bg-transparent p-1 px-2 capitalize text-black",
      )}
    >
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-md perspective-1000",
        )}
        onMouseEnter={() => setIsFlipped("true")}
        onMouseLeave={() => setIsFlipped("false")}
      >
        <motion.div
          className={cn(
            className,
            "absolute h-full w-full rounded-md backface-hidden",
          )}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped == "true" ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className={cn("flex h-full w-full items-center justify-center")}>
            Frame {frameNum}
          </div>
        </motion.div>
        <motion.div
          className={cn(
            className,
            "absolute h-full w-full rounded-md backface-hidden",
          )}
          initial={{ rotateY: -180 }}
          animate={{ rotateY: isFlipped == "true" ? 0 : -180 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          // style={{ rotateY: 180 }}
        >
          <div className={cn("flex h-full w-full items-center justify-center")}>
            Back {frameNum}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FramerMotion;

interface StepsProps {
  frame: number;
  totalForms: number;
}

const Steps = ({ frame, totalForms }: StepsProps) => {
  const steps = useMemo(
    () => Array.from({ length: totalForms }, (_, i) => i + 1),
    [totalForms],
  );

  return (
    <div className="flex w-full items-center space-x-4 border-x px-6 transition-colors duration-500 md:w-1/2 xl:w-1/5">
      {steps.map((step, index) => (
        <Fragment key={step}>
          {index > 0 && (
            <div className="relative h-[2px] flex-grow overflow-hidden">
              <AnimatePresence>
                {frame >= step && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute h-full w-full bg-blue-300"
                  />
                )}
              </AnimatePresence>
              <div className="h-full w-full bg-zinc-700" />
            </div>
          )}
          <div
            className={cn(
              frame >= step ? "bg-blue-500" : "bg-zinc-700",
              "flex size-5 md:size-6 text-xs md:text-base items-center justify-center rounded-full",
              index > 0 && "delay-500 duration-300",
            )}
          >
            {step}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
