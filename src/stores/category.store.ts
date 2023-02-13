import { create } from "zustand";

interface Category {
  category: string;
  setCategory: (category: string) => void;
}

const useStore = create<Category>((set) => ({
  category: "A",
  setCategory: (category) => set((state) => ({ category })),
}));

export default useStore;
