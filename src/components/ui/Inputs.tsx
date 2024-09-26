import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps {
  className?: string;
  label: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  /**
   * Message beside the label (optional)
   */
  message?: string;
}

export const Textinputs = ({
  label,
  register,
  errors,
  required,
  className,
  message,
}: InputProps) => {
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <label
        htmlFor={register.name}
        className="text-medium px-2 text-sm text-zinc-700 dark:text-white"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
        {message && (
          <span className="ml-2 text-sm text-zinc-400">{message}</span>
        )}
      </label>
      <input
        maxLength={150}
        autoComplete="off"
        {...register}
        // onFocus={() => setFocus(true)}
        onBlur={(e) => {
          register.onBlur(e);
          // setFocus(false);
        }}
        className={cn(
          "h-9 rounded-md border dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 p-2 shadow-sm outline-none ring-indigo-400 focus:ring-2",
          errors[register.name] ? " ring-2 ring-red-400" : "",
        )}
      />
      {errors[register.name] && (
        <span className="px-1 text-sm text-red-600 dark:text-red-400">{`${errors[register.name]?.message}`}</span>
      )}
    </div>
  );
};
