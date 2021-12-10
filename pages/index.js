import { useEffect, useContext } from "react";
import App from "../components/App";
import { Context } from "../Context/Context";
import { getAll } from "../Services/SubCategories";

export default function Home({ categories }) {
  const context = useContext(Context);
  useEffect(() => {
    context.handle.handleCategories(categories);
  }, []);
  return <App />;
}

export const getStaticProps = async () => {
  const data = await getAll();
  if (data === null) return;
  let categories = [];
  for (let i = 0; i < data.length; i += 5) {
    const tmp = data.slice(i, i + 5);
    categories.push(tmp);
  }
  return {
    props: {
      categories,
    },
  };
};
