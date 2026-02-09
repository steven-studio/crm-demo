import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAdminStore = create(
  persist(
    (set) => ({
      user: null,
      setAdminData: (user) => set({ user }),
      clearAdminData: () => {
        set({ user: null });
        localStorage.removeItem("adminData");
        localStorage.removeItem("token");
      },
    }),
    {
      name: "adminData",
    }
  )
);

export default useAdminStore;
