"use client";

import { create } from "zustand";

type navsData = {
  label: string;
  path: string;
  active: boolean;
}

interface NavsState {
  navs: navsData[];
  setNavs: (path: string) => void;
}

export const useNavsStore = create<NavsState>((set) => ({
  navs: [
    {
      label: "Dashboard",
      path: "/dashboard",
      active: false
    },
    {
      label: "Notes",
      path: "/dashboard/notes",
      active: false
    }
  ],
  setNavs: (path: string) => set((state) => ({
    navs: state.navs.map((n) => ({...n, active: n.path === path}))
  }))
}));
