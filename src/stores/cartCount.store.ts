import { create } from "zustand";

interface Cart {
    count: number;
  setCount: (count: number) => void;
}

const useStore = create<Cart>((set) => ({
    count: 0,
  setCount: (count) => set((state) => ({ count })),
}));

export default useStore;
