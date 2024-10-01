import { useForm } from "react-hook-form";
import { Textinputs } from "@/components/ui/Inputs";
import { useFormStore } from "@/zustand/zustandStore";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment ,ReactNode, useMemo, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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

const StepperForm = () => {
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);

  const nextFrame = () => {
    setDirection(1);
    setCurrentForm((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prevFrame = () => {
    // console.log("prev clicked");
    setDirection(-1);
    setCurrentForm((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const { form1, form2, updateform2, updateform1 } = useFormStore();

  const useForm1 = useForm({
    mode: "all",
    defaultValues: form1,
  });

  const useForm2 = useForm({
    mode: "all",
    defaultValues: form2,
  });

  const formData = useMemo(() => {
    if (currentForm === 3) return { ...form1, ...form2 };
    return {
      firstName: "",
      lastName: "",
    };
  }, [currentForm, form1, form2]);

  return (
    <div className="flex h-screen flex-col items-center bg-white dark:bg-zinc-800">
      <Steps frame={currentForm} totalForms={2} />
      <div className="relative flex h-screen w-full justify-center overflow-hidden border-x p-4 md:w-1/3 xl:w-1/5">
        <AnimatePresence initial={false} custom={direction}>
          {currentForm === 1 && (
            <motion.div
              key={1}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: "easeIn",
                opacity: { duration: 0.2 },
              }}
              className="absolute"
            >
              <form
                onSubmit={useForm1.handleSubmit(() => {
                  updateform1(useForm1.getValues());
                  nextFrame();
                })}
                className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
              >
                <Textinputs
                  label="First Name"
                  required
                  register={useForm1.register("firstName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /[a-zA-Z]+/,
                      message: "Not a valid category name",
                    },
                  })}
                  errors={useForm1.formState.errors}
                />
                <button type="submit" className="dark:text-white">
                  submit
                </button>
              </form>
            </motion.div>
          )}
          {currentForm === 2 && (
            <motion.div
              key={2}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: "easeIn",
                opacity: { duration: 0.2 },
              }}
              className="absolute border"
            >
              <form
                onSubmit={useForm2.handleSubmit(() => {
                  updateform2(useForm2.getValues());
                  nextFrame();
                })}
                className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
              >
                <Textinputs
                  label="Last Name"
                  required
                  register={useForm2.register("lastName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /[a-zA-Z]+/,
                      message: "Not a valid category name",
                    },
                  })}
                  errors={useForm2.formState.errors}
                />
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => prevFrame()}
                    className="dark:text-white"
                  >
                    previous
                  </button>
                  <button type="submit" className="dark:text-white">
                    submit
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          {currentForm > 2 && (
            <motion.div
              key={3}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 3000, damping: 300 },
                opacity: { duration: 0.2 },
              }}
            >
              <pre>
                {formData?.firstName as ReactNode}{" "}
                {formData?.lastName as ReactNode}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StepperForm;

interface StepsProps {
  frame: number;
  totalForms: number;
}

// Assuming you have a utility function for class names

interface StepsProps {
  frame: number;
  totalForms: number;
}

const Steps = ({ frame, totalForms }: StepsProps) => {
  const steps = useMemo(() => Array.from({ length: totalForms }, (_, i) => i + 1), [totalForms]);

  return (
    <div className="flex w-full items-center space-x-4 border-x px-6 transition-colors duration-500 md:w-1/3 xl:w-1/5">
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
              "flex size-6 items-center justify-center rounded-full",
              index > 0 && "delay-500 duration-300"
            )}
          >
            {step}
          </div>
        </Fragment>
      ))}
    </div>
  );
};


