import { useEffect, useContext } from "react";
import App from "../components/App";
import { Context } from "../Context/Context";
import { ParseGetAll } from "../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../Services/Countries";
import { getAllByPage } from "../Services/Books";

export default function Home({ categories, countries, books }) {
  const context = useContext(Context);
  useEffect(() => {
    context.handle.handleCategories(categories);
    context.handle.handleCountries(countries);
    context.handle.handleBooks(books);
  }, []);
  return <App />;
}

export const getStaticProps = async () => {
  const categories = await ParseGetAll();
  const countries = await ParseGetAll2();
  const books = await getAllByPage(1, 12);
  return {
    props: {
      categories,
      countries,
      books,
    },
  };
};
