import { useEffect, useContext } from "react";
import BookCreate from "../../Components/BookCreate";
import { Context } from "../../Context/Context";
import { ParseGetAll, getOne } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";

const CreateBook = ({ category }) => {
  const context = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      if (
        context.state.countries === null ||
        context.state.countries.length === 0
      ) {
        const countries = await ParseGetAll2();
        context.handle.handleCountries(countries);
      }
      if (
        context.state.categories === null ||
        context.state.categories.length === 0
      ) {
        const categories = await ParseGetAll();
        context.handle.handleCategories(categories);
      }
    };
    fetchData();
    return () => {
      context.handle.handleBooks(null);
    };
  }, []);
  return <BookCreate />;
};

export default CreateBook;
