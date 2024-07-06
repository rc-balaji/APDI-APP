import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     role: null,
//     isAuthenticated: false,
//   });

const [role,setRole] = useState(null);

  return (
    <AuthContext.Provider value={{ role,setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
