import { createContext, useContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const handleCategories = (cats) => {
    setCategories([...cats]);
  };
  const ContextProps = {
    state: {
      categories,
    },
    handle: {
      handleCategories,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
