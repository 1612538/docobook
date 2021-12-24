import { createContext, useState } from "react";
export const BookInfosContext = createContext();
export const Provider = ({ children }) => {
  const [book, setBook] = useState({});
  const [chapters, setChapters] = useState([]);
  const handleBook = (Book) => {
    setBook({ ...Book });
  };
  const handleChapters = (Chapters) => {
    console.log(Chapters);
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
  return (
    <BookInfosContext.Provider value={ContextProps}>
      {children}
    </BookInfosContext.Provider>
  );
};
