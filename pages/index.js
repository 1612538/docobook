import { useEffect, useContext } from "react";
import App from "../components/App";
import { Context } from "../Context/Context";
import { ParseGetAll } from "../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../Services/Countries";
import {
  getAllByPage,
  getAllByViewsByPage as getByView,
} from "../Services/Books";
import { getAllByPage as getChapters } from "../Services/BookChapters";

export default function Home({ categories, countries }) {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const BooksByViews = await getByView(1, 12);
      context.handle.handleBooksByViews(BooksByViews);
      const books = await getAllByPage(1, 12);
      context.handle.handleBooks(books);
      const chapters = await getChapters(1, 18);
      context.handle.handleChapters(chapters);
    };
    context.handle.handleCategories(categories);
    context.handle.handleCountries(countries);
    fetchData();
    return () => {
      context.handle.handleBooks(null);
    };
  }, []);
  return <App />;
}

export const getStaticProps = async () => {
  const categories = await ParseGetAll();
  const countries = await ParseGetAll2();
  return {
    props: {
      categories,
      countries,
    },
  };
};
