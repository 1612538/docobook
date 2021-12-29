import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [books, setBooks] = useState(null);
  const [booksByViews, setBooksByViews] = useState(null);
  const [chapters, setChapters] = useState([]);
  const handleCategories = (cats) => {
    setCategories([...cats]);
  };
  const handleCountries = (countries) => {
    setCountries([...countries]);
  };
  const handleBooks = (Books) => {
    setBooks(Books ? [...Books] : null);
  };
  const handleChapters = (Chapters) => {
    setChapters(Chapters ? [...Chapters] : null);
  };
  const handleBooksByViews = (BooksByViews) => {
    setBooksByViews(BooksByViews ? [...BooksByViews] : null);
  };
  const ContextProps = {
    state: {
      categories,
      countries,
      books,
      chapters,
      booksByViews,
    },
    handle: {
      handleCategories,
      handleCountries,
      handleBooks,
      handleChapters,
      handleBooksByViews,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
