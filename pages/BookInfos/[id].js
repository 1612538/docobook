import BookInfos from "../../components/BookInfos";

import { getOne } from "../../Services/Books";

import { useRouter } from "next/router";
import Loading from "../../Components/Loading";

const BookInfo = ({ BookInfo }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading></Loading>;
  }
  return <BookInfos BookInfo={BookInfo} />;
};

export const getStaticPaths = async () => {
  const paths = [{ params: { id: "0" } }];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const BookInfo = await getOne(params.id);
  if (!BookInfo.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      BookInfo,
    },
  };
};

export default BookInfo;
