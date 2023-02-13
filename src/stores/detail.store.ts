import { create } from "zustand";

interface DetailPage {
  productName: string;
  setProductName: (productName: string) => void;
}

const useDetail = create<DetailPage>((set) => ({
    productName: "hi",
  setProductName: (productName) => set((state) => ({ productName })),
}));

export default useDetail;
