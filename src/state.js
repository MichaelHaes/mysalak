import create from "zustand";

export const useStore = create((set) => ({
  count: 0,
  decrease: () => set((state) => ({ count: state.count - 1 })),
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

export const usePage = create((set) => ({
  page: "Home",
  // prevPage: "",
  setPage: (val) => set({ page: val }),

  home: () => set((state) => ({ page: "Home" })),
  cuaca: () => set((state) => ({ page: "Prediksi Cuaca" })),
  hama: () => set((state) => ({ page: "Prediksi Hama" })),
  informasi: () => set((state) => ({ page: "Informasi Hama" })),
}));

export const useHama = create((set) => ({
  from: "",
  index: null,
  detail: false,
  setFrom: (val) => set({from: val}),
  setIndex: (val) => set({ index: val }),
  resetDetail: () => set({ detail: false }),
  toggleDetail: () => set((state) => ({ detail: !state.detail })),
}));
