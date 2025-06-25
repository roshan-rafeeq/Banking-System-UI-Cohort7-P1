import { createContext } from 'react';

const AuthContext = createContext({
  customerId: null,
  isAuthenticated: false,
  setCustomerId: () => {},
  setIsAuthenticated: () => {}
});

export default AuthContext;
