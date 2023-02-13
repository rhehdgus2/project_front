import { create } from "zustand";

interface Num {
  num: number;
  setNum: (num: number) => void;
}

const useStore = create<Num>((set) => ({
  num: 1,
  setNum: (num) => set((state) => ({ num })),
}));

export default useStore;