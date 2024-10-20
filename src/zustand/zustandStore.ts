import { create } from "zustand";
import { devtools } from "zustand/middleware";
interface FormStore {
  form1: {
    firstName: unknown;
  };
  form2: {
    lastName: unknown;
  };
  updateform1: (e: { firstName: unknown }) => void;
  updateform2: (e: { lastName: unknown }) => void;
  resetForm: () => void;
}

// Create your store, which includes both state and (optionally) actions
export const useFormStore = create<FormStore>()(
  devtools((set) => ({
    form1: { firstName: "" },
    form2: { lastName: "" },
    updateform1: (e) => set(() => ({ form1: e })),
    updateform2: (e) => set(() => ({ form2: e })),
    resetForm: () =>
      set(() => ({ form1: { firstName: "" }, form2: { lastName: "" } })),
  })),
);
