import { useEffect, useContext } from "react";
import BookInfos from "../../components/BookInfos";
import { Context as Cont } from "../../Context/BookInfosContext";
import { Context } from "../../Context/Context";
import { ParseGetAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getOne } from "../../Services/Books";
import { getByBook } from "../../Services/BookChapters";

const BookInfo = ({ categories, countries, BookInfo }) => {
  const context = useContext(Cont);
  const context2 = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const Chapters = await getByBook(BookInfo.id);
      context.handle.handleChapters(Chapters);
    };
    context2.handle.handleCategories(categories);
    context2.handle.handleCountries(countries);
    context.handle.handleBook(BookInfo);
    console.log(BookInfo);
    fetchData();
  }, []);
  return <BookInfos />;
};

export const getStaticPaths = async () => {
  const url = "http://localhost:1337/";
  const res = await fetch(url + "Bookinfos");
  const books = await res.json();
  const paths = books.map((book) => ({
    params: { id: book.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const categories = await ParseGetAll();
  const countries = await ParseGetAll2();
  const BookInfo = await getOne(params.id);
  return {
    props: {
      categories,
      countries,
      BookInfo,
    },
  };
};

export default BookInfo;
