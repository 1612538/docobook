import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const handleUser = (User) => {
    setUser(User);
  };
  const ContextProps = {
    state: {
      user,
    },
    handle: {
      handleUser,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
