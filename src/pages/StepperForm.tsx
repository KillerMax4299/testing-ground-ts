import { useForm } from "react-hook-form";
import { Textinputs } from "@/components/ui/Inputs";
import { useFormStore } from "@/zustand/zustandStore";
import { ReactNode, useMemo, useState } from "react";

const StepperForm = () => {
  const [currentForm, setCurrentForm] = useState<number>(1);

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
    <>
      <div className="p-4">
        {currentForm === 1 && (
          <form
            onSubmit={useForm1.handleSubmit(() => {
              updateform1(useForm1.getValues());
              setCurrentForm((prev) => prev + 1);
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
        )}
        {currentForm === 2 && (
          <form
            onSubmit={useForm2.handleSubmit(() => {
              updateform2(useForm2.getValues());
              setCurrentForm((prev) => prev + 1);
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
                onClick={() => setCurrentForm((prev) => prev - 1)}
                className="dark:text-white"
              >
                previous
              </button>
              <button type="submit" className="dark:text-white">
                submit
              </button>
            </div>
          </form>
        )}
        {currentForm > 2 && (
          <pre>
            {formData?.firstName as ReactNode} {formData?.lastName as ReactNode}
          </pre>
        )}
      </div>
    </>
  );
};

export default StepperForm;
