import { getOne } from "../../../Services/BookChapters";
import BookChapter from "../../../Components/BookChapter";
import { useRouter } from "next/router";
import Loading from "../../../Components/Loading";

const ChapterNumber = ({ chapter }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading></Loading>;
  }
  return <BookChapter chapter={chapter} />;
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
