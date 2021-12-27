import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState(null);
  const handleBook = (Book) => {
    setBook(Book);
  };
  const handleChapters = (Chapters) => {
    setChapters(Chapters ? [...Chapters] : null);
  };
  const handleChapter = (Chapter) => {
    setChapter(Chapter);
  };
  const ContextProps = {
    state: {
      book,
      chapters,
      chapter,
    },
    handle: {
      handleBook,
      handleChapters,
      handleChapter,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
