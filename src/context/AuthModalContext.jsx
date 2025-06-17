import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  return (
    <AuthModalContext.Provider value={{ showAuthModal, setShowAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  return useContext(AuthModalContext);
}
