import { useEffect, useContext } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { getOne, getByBook } from "../../../Services/BookChapters";
import BookChapter from "../../../Components/BookChapter";

const ChapterNumber = ({ chapter }) => {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const chapters = await getByBook(chapter.bookinfo.id.toString());
      context.handle.handleChapters(chapters);
    };
    context.handle.handleChapter(chapter);
    fetchData();
    return () => context.handle.handleChapters(null);
  }, []);
  return <BookChapter />;
};

export const getStaticPaths = async () => {
  const url = "http://localhost:1337/";
  const res = await fetch(url + "BookChapters");
  const chapters = await res.json();
  const paths = chapters.map((chapter) => ({
    params: {
      id: chapter.bookinfo.id.toString(),
      chapternumber: chapter.chapternumber.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const chapter = await getOne(params.id, params.chapternumber);
  return {
    props: {
      key: chapter.id,
      chapter,
    },
  };
};

export default ChapterNumber;
