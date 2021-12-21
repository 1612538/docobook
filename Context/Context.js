import { createContext, useContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const handleCategories = (cats) => {
    setCategories([...cats]);
  };
  const handleCountries = (countries) => {
    setCountries([...countries]);
  };
  const handleBooks = (Books) => {
    setBooks([...Books]);
  };
  const handleChapters = (chapters) => {
    setChapters(chapters);
  };
  const ContextProps = {
    state: {
      categories,
      countries,
      books,
      chapters,
    },
    handle: {
      handleCategories,
      handleCountries,
      handleBooks,
      handleChapters,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
