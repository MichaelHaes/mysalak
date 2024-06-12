import { create } from "zustand";

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

export const useWeatherPred = create((set) => ({
  temp: 0,
  humidity: 0,
  precipitation: 0,
  luminosity: 0,

  setTemp: (temp) => set({ temp }),
  setHumid: (humidity) => set({ humidity }),
  setPrecipitation: (precipitation) => set({ precipitation }),
  setLuminosity: (luminosity) => set({ luminosity }),
}));