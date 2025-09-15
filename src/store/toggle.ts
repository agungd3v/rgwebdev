"use client";

import { create } from "zustand";

type selectOption = {
  label: string;
  value: string | number;
}

interface ToggleState {
  modal: boolean;
  setModal: (open: boolean) => void;
  select: boolean;
  setSelect: (open: boolean) => void;
  selectedOption: selectOption;
  setSelectedOption: (data: selectOption) => void;
  fetchNotes: boolean;
  setFetchNotes: (re: boolean) => void;
  clearToggle: () => void;
}

export const useToggleState = create<ToggleState>((set) => ({
  modal: false,
  setModal: (open) => set({modal: open}),
  select: false,
  setSelect: (open) => set({select: open}),
  selectedOption: {label: "", value: ""},
  setSelectedOption: (data: selectOption) => set({selectedOption: data}),
  fetchNotes: true,
  setFetchNotes: (re: boolean) => set({fetchNotes: re}),
  clearToggle: () => set({
    modal: false,
    select: false,
    selectedOption: {label: "", value: ""}
  })
}));
