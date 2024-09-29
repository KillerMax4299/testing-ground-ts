import { useForm, useFieldArray } from "react-hook-form";

const DynamicForm = () => {
  const {
    control,
    handleSubmit,
    getValues,
    register,
    formState: { errors },
    // trigger,
  } = useForm({
    mode: "all",
    // reValidateMode: "onChange",
    defaultValues: {
      users: [{ firstName: "", lastName: "", age: "" , email:""}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit = () => {
    console.log(getValues().users);
    // Here you can handle the form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex space-y-2">
          <div className="flex space-x-2">
            <div className="flex flex-col">
              <label htmlFor={`users.${index}.firstName`}>First Name</label>
              <input
                autoComplete="off"
                {...register(`users.${index}.firstName`, { required: true })}
                placeholder="First Name"
                className="rounded-md bg-zinc-600 px-2 py-1"
                // onBlur={() => trigger(`users.${index}.firstName`)}
              />
              {errors.users?.[index]?.firstName && (
                <label className="text-red-400">This field is requried</label>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor={`users.${index}.lastName`}>Last Name</label>
              <input
                autoComplete="off"
                {...register(`users.${index}.lastName`, { required: true })}
                placeholder="Last Name"
                className="rounded-md bg-zinc-600 px-2 py-1"
                // onBlur={() => trigger(`users.${index}.lastName`)}
              />
              {errors.users?.[index]?.lastName && (
                <label className="text-red-400">This field is requried</label>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor={`users.${index}.age`}>Age</label>
              <input
                autoComplete="off"
                {...register(`users.${index}.age`, {
                  required: true,
                  min: 0,
                  max: 150,
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="Age"
                className="rounded-md bg-zinc-600 px-2 py-1"
              />

              {errors.users?.[index]?.age && (
                <label className="text-red-400">This field is requried</label>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor={`users.${index}.email`}>Email</label>
              <input
                className="rounded-md bg-zinc-600 px-2 py-1"
                {...register(`users.${index}.email`, {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Email"
              />

              {errors.users?.[index]?.email && (
                <label className="text-red-400">
                  {errors.users?.[index]?.email?.message}
                </label>
              )}
            </div>
          </div>
          {index > 0 && (
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        className="rounded border border-zinc-300 px-4"
        type="button"
        onClick={() =>
          append({ firstName: "", lastName: "", age: "", email: "" })
        }
      >
        Add More User Details
      </button>{" "}
      <button className="rounded border border-zinc-300 px-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
