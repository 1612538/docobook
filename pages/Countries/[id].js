import { useEffect, useContext } from "react";
import BookFilter from "../../Components/BookFilter";
import { Context } from "../../Context/Context";
import { ParseGetAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2, getOne } from "../../Services/Countries";
import { getAllByCountry } from "../../Services/Books";

const BookInfo = ({ country }) => {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      const Books = await getAllByCountry(country.id.toString());
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
  return <BookFilter category={country} />;
};

export const getStaticPaths = async () => {
  const url = "http://localhost:1337/";
  const res = await fetch(url + "countries");
  const countries = await res.json();
  const paths = countries.map((country) => ({
    params: { id: country.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getOne(params.id);
  return {
    props: {
      key: params.id,
      country,
    },
  };
};

export default BookInfo;
