import { create } from "zustand";

interface Store {
    selectedSolid: string;

    setSelectedSolid: (
        solid: string
    ) => void;
}

export const useCalculatorStore = create<Store>((set) => ({
    selectedSolid: "sphere",

    setSelectedSolid: (
        solid
    ) => set({selectedSolid: solid})
}))