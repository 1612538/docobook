import { createContext, useContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [books, setBooks] = useState([]);
  const handleCategories = (cats) => {
    setCategories([...cats]);
  };
  const handleCountries = (countries) => {
    setCountries([...countries]);
  };
  const handleBooks = (Books) => {
    setBooks([...Books]);
  };
  const ContextProps = {
    state: {
      categories,
      countries,
      books,
    },
    handle: {
      handleCategories,
      handleCountries,
      handleBooks,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
