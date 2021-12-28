import { useEffect, useContext } from "react";
import { Context } from "../../../Context/BookInfosContext";
import { getOne, getByBook } from "../../../Services/BookChapters";
import BookChapter from "../../../Components/BookChapter";
import { useRouter } from "next/router";
import Loading from "../../../Components/Loading";

const ChapterNumber = ({ chapter }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading></Loading>;
  }
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
  const paths = [{ params: { id: "1", chapternumber: "1" } }];
  return {
    paths,
    fallback: true,
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
