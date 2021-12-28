import { useEffect, useContext } from "react";
import UserProfile from "../../components/UserProfile";
import { Context } from "../../Context/Context";
import { Context as UserContext } from "../../Context/User";
import { ParseGetAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getAllByUploader } from "../../Services/Books";
import { getOne } from "../../Services/Users";

export default function Home({ categories, countries, user }) {
  const context = useContext(Context);
  const userContext = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const listBooks = await getAllByUploader(user.id);
      context.handle.handleBooks(listBooks);
      const categories = await ParseGetAll();
      context.handle.handleCategories(categories);
      const countries = await ParseGetAll2();
      context.handle.handleCountries(countries);
    };
    userContext.handle.handleUser(user);
    fetchData();
  }, []);
  return <UserProfile />;
}

export const getStaticPaths = async () => {
  const url = "http://localhost:1337/";
  const res = await fetch(url + "users");
  const users = await res.json();
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const user = await getOne(params.id);
  return {
    props: {
      user,
    },
  };
};
