import { create } from "zustand";

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

export const useHama = create((set) => ({
  from: "",
  hama: [],
  index: null,
  detail: false,
  setHama: (val) => set({ hama: val }),
  setFrom: (val) => set({ from: val }),
  setIndex: (val) => set({ index: val }),
  resetDetail: () => set({ detail: false }),
  toggleDetail: () => set((state) => ({ detail: !state.detail })),
}));

export const useWeather = create((set) => ({
  preds: [],
  avgPreds: [],
  latest: {},
  setPreds: (val) => set({ preds: val }),
  setLatest: (val) => set({ latest: val }),
  setAvgPreds: (val) => set({ avgPreds: val})
}));

export const useCoordinate = create((set) => ({
  longitude: 0,
  latitude: 0,
  setLongitude: (val) => set({longitude: val}),
  setLatitude: (val) => set({latitude: val}),
}));

export const useKelompokTaniList = create((set) => ({
  kelompokTani: [],
  setKelompokTani: (val) => set({ kelompokTani: val }),
}));