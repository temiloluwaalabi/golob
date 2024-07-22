import { User } from "@/types";
import { atom } from "jotai";
import { create } from "zustand";

interface AuthState {
  showAccountForm: boolean;
  setShowAccountForm: (show: boolean) => void;
  // ... other authentication-related state variables and actions ...
}

export const currentUserAtom = atom<User | null>(null);
export const useAuthStore = create<AuthState>((set) => ({
  showAccountForm: false,
  setShowAccountForm: (show) => set({ showAccountForm: show }),
}));

export const useCurrentAuthStore = (): AuthState => {
  const { showAccountForm, setShowAccountForm } = useAuthStore((state) => ({
    showAccountForm: state.showAccountForm,
    setShowAccountForm: state.setShowAccountForm,
  }));

  return { showAccountForm, setShowAccountForm };
};
