import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const handleBook = (Book) => {
    setBook(Book);
  };
  const handleChapters = (Chapters) => {
    setChapters([...Chapters]);
  };
  const ContextProps = {
    state: {
      book,
      chapters,
    },
    handle: {
      handleBook,
      handleChapters,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
