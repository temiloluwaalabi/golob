import { create } from "zustand";

interface AuthState {
  showAccountForm: boolean;
  setShowAccountForm: (show: boolean) => void;
  // ... other authentication-related state variables and actions ...
}

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
