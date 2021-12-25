import { useEffect, useContext } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { getOne } from "../../../Services/BookChapters";
import BookChapter from "../../../Components/BookChapter";

const ChapterNumber = ({ chapter, first, last }) => {
  const context = useContext(Context);
  useEffect(() => {
    context.handle.handleChapter(chapter);
    context.handle.handleFirst(first);
    context.handle.handleLast(last);
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
  const isLast = await getOne(
    params.id,
    (parseInt(params.chapternumber) + 1).toString()
  );
  const isFirst = await getOne(
    params.id,
    (parseInt(params.chapternumber) - 1).toString()
  );
  return {
    props: {
      key: chapter.id,
      chapter,
      last: isLast ? 0 : 1,
      first: isFirst ? 0 : 1,
    },
  };
};

export default ChapterNumber;
