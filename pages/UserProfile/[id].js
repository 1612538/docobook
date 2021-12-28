import { useEffect, useContext } from "react";
import UserProfile from "../../components/UserProfile";
import { Context } from "../../Context/Context";
import { Context as UserContext } from "../../Context/User";
import { ParseGetAll } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";
import { getAllByUploader } from "../../Services/Books";
import { getOne } from "../../Services/Users";
import { useRouter } from "next/router";
import Loading from "../../Components/Loading";

export default function Home({ user }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading></Loading>;
  }
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
  const paths = [{ params: { id: "1" } }];
  return {
    paths,
    fallback: true,
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
