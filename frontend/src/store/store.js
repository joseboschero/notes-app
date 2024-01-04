import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      loggedUserToken: null,
      addLoggedUserToken: (token) => set({ loggedUserToken: token }),

      newNoteCreated: false,
      setNewNoteCreated: (newValue) => set({ newNoteCreated: newValue }),

      storeNoteDeleted: false,
      setStoreNoteDeleted: (newValue) => set({ storeNoteDeleted: newValue }),

      storeEditedNote: false,
      setStoreEditedNote: (newValue) => set({ storeEditedNote: newValue }),

      storeRadioValue: 1,
      setStoreRadioValue: (newValue) => set({ storeRadioValue: newValue }),

      storeFilteredNotes: [],
      setStoreFilteredNotes: (newNotes) =>
        set((state) => {
          return { storeFilteredNotes: newNotes };
        }),

      storeCategories: [],
      setStoreCategories: (newCategories) => {
        set((state) => {
          const uniqueNewCategories = newCategories.filter(
            (category) => !state.storeCategories.includes(category)
          );

          const updatedCategories = [
            ...state.storeCategories,
            ...uniqueNewCategories,
          ];

          return { storeCategories: updatedCategories };
        });
      },
      removeStoreCategory: (categoryToRemove) => {
        set((state) => {
          const updatedCategories = state.storeCategories.filter(
            (category) => category !== categoryToRemove
          );

          return { storeCategories: updatedCategories };
        });
      },
    }),
    { name: "zustand-store-token" }
  )
);

export default useStore;
