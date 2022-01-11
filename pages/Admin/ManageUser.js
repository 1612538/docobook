import Head from "next/head";
import Header from "../../Components/components/Header";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import NavBar from "../../Components/components/Admin/NavBar";
import ManageUser from "../../Components/components/Admin/ManageUser";
import { Context as BookContext } from "../../Context/Context";
import { Context as UserContext} from "../../Context/User";
import { getAll } from "../../Services/Users";
import { ParseGetAll, getOne } from "../../Services/SubCategories";
import { ParseGetAll as ParseGetAll2 } from "../../Services/Countries";

const AdminManageUser = () => {
  const context = useContext(BookContext);
  const userContext = useContext(UserContext);
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
      if (
        userContext.state.user === null ||
        userContext.state.user.length === 0
      ) {
        const users = await getAll();
        userContext.handle.handleUsers(users);
      }
    };
    fetchData();
    return () => {
      context.handle.handleBooks(null);
    };
  }, []);
  return (
    <div>
      <Head>
        <title>DocoBook</title>
        <meta name="description" content="Light novel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header></Header>
        <NavBar></NavBar>
        <ManageUser></ManageUser>
      </main>
    </div>
  );
};

export default AdminManageUser;
