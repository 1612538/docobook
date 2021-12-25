import { createContext, useState } from "react";
export const Context = createContext();
export const Provider = ({ children }) => {
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState(null);
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(0);
  const handleBook = (Book) => {
    setBook(Book);
  };
  const handleChapters = (Chapters) => {
    setChapters([...Chapters]);
  };
  const handleChapter = (Chapter) => {
    setChapter(Chapter);
  };
  const handleFirst = (First) => {
    setFirst(First);
  };
  const handleLast = (Last) => {
    setLast(Last);
  };
  const ContextProps = {
    state: {
      book,
      chapters,
      chapter,
      first,
      last,
    },
    handle: {
      handleBook,
      handleChapters,
      handleChapter,
      handleFirst,
      handleLast,
    },
  };
  return <Context.Provider value={ContextProps}>{children}</Context.Provider>;
};
