import { useEffect, useContext } from "react";
import BookFilter from "../../Components/BookFilter";
import { Context } from "../../Context/Context";
import { ParseGetAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getAllByCategory } from "../../Services/Books";

const BookInfo = ({ categories, countries, category }) => {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const Books = await getAllByCategory(category.id.toString());
      context.handle.handleBooks(Books);
    };
    context.handle.handleCategories(categories);
    context.handle.handleCountries(countries);
    fetchData();
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
  const categories = await ParseGetAll();
  const countries = await ParseGetAll2();
  let category = null;
  for (let element of categories) {
    category = element.find((ele) => ele.id.toString() === params.id);
    if (category !== null) break;
  }
  return {
    props: {
      categories,
      countries,
      category,
    },
  };
};

export default BookInfo;
