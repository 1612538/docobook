import { useEffect, useContext } from "react";
import BookFilter from "../../Components/BookFilter";
import { Context } from "../../Context/Context";
import { ParseGetAll, getOne } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getAllByCategory } from "../../Services/Books";

const BookInfo = ({ category }) => {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const Books = await getAllByCategory(category.id.toString());
      context.handle.handleBooks(Books);
      if (
        context.state.categories === null ||
        context.state.categories.length === 0
      ) {
        const categories = await ParseGetAll();
        context.handle.handleCategories(categories);
      }
      if (
        context.state.countries === null ||
        context.state.countries.length === 0
      ) {
        const countries = await ParseGetAll2();
        context.handle.handleCountries(countries);
      }
    };
    fetchData();
    return () => {
      context.handle.handleBooks(null);
    };
  }, []);
  return <BookFilter category={category} />;
};

export const getStaticPaths = async () => {
  const url = "http://localhost:1337/";
  const res = await fetch(url + "subcategories");
  const categories = await res.json();
  const paths = categories.map((category) => ({
    params: { id: category.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const category = await getOne(params.id);
  return {
    props: {
      key: params.id,
      category,
    },
  };
};

export default BookInfo;
