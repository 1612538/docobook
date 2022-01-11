import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const handleUser = (User) => {
    setUser(User);
  };
  const handleUsers = (Users) => {
    setUsers([...Users]);
  };
  const ContextProps = {
    state: {
      user,
      users,
    },
    handle: {
      handleUser,
      handleUsers,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
