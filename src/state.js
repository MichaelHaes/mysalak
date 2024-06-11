import create from 'zustand';

export const useStore = create((set) => ({
    count: 0,
    decrease: () => set((state) => ({ count: state.count - 1 })),
    increase: () => set((state) => ({ count: state.count + 1 })),
  }));

export const usePage = create((set) => ({
    page: "Home",
    setPage: (val) => set(({page: val})),
}))