import { useEffect, useContext } from "react";
import BookInfos from "../../components/BookInfos";
import { Context as Cont } from "../../Context/BookInfosContext";
import { Context } from "../../Context/Context";
import { ParseGetAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getOne } from "../../Services/Books";
import { getByBook } from "../../Services/BookChapters";
import { useRouter } from "next/router";

const BookInfo = ({ BookInfo }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading></Loading>;
  }
  const context = useContext(Cont);
  const context2 = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const Chapters = await getByBook(BookInfo.id);
      context.handle.handleChapters(Chapters);
      if (
        context2.state.categories === null ||
        context2.state.categories.length === 0
      ) {
        const categories = await ParseGetAll();
        context2.handle.handleCategories(categories);
      }
      if (
        context2.state.countries === null ||
        context2.state.countries.length === 0
      ) {
        const countries = await ParseGetAll2();
        context2.handle.handleCountries(countries);
      }
    };
    context.handle.handleBook(BookInfo);
    console.log(BookInfo);
    fetchData();
  }, []);
  return <BookInfos />;
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
  return {
    props: {
      BookInfo,
    },
  };
};

export default BookInfo;
