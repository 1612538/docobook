import { useEffect, useContext } from "react";
import BookFilter from "../../Components/BookFilter";
import { Context } from "../../Context/Context";
import { ParseGetAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getAllByCountry } from "../../Services/Books";

const BookInfo = ({ categories, countries, country }) => {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const Books = await getAllByCountry(country.id.toString());
      context.handle.handleBooks(Books);
    };
    context.handle.handleCategories(categories);
    context.handle.handleCountries(countries);
    fetchData();
  }, []);
  return <BookFilter category={country} />;
};

export const getStaticPaths = async () => {
  const url = "http://localhost:1337/";
  const res = await fetch(url + "countries");
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
  let country = null;
  for (let element of countries) {
    country = element.find((ele) => ele.id.toString() === params.id);
    if (country !== null) break;
  }
  return {
    props: {
      categories,
      countries,
      country,
    },
  };
};

export default BookInfo;
