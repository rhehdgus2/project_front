import { create } from "zustand";

interface Admin {
    admin : number;
  setAdmin: (admin: number) => void;
  removeAdmin : () => void;
}

const useStore = create<Admin>((set) => ({
    admin: 0,
  setAdmin: (admin) => set((state) => ({ admin })),
  removeAdmin: () => set((state) => ({admin : 0})),
}));

export default useStore;