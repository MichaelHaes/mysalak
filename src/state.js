import create from 'zustand';

export const useStore = create((set) => ({
    count: 0,
    decrease: () => set((state) => ({ count: state.count - 1 })),
    increase: () => set((state) => ({ count: state.count + 1 })),
  }));

export const useNavbar = create((set) => ({
    page: "Home",
    home: () => set((state) => ({page: "Home"})),
    history: () => set((state) => ({page: "History"})),
    article: () => set((state) => ({page: "Article"})),
    profil: () => set((state) => ({page: "Profile"})),
}))