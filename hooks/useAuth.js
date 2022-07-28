import React, { createContext, useContext } from 'react'

const AuthContext = createContext({
    //init state of context
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={null}>
        {children}
    </AuthContext.Provider>
  )
};

export default function useAuth() {
    return useContext(AuthContext);
}