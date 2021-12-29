import UserProfile from "../../components/UserProfile";
import { getOne } from "../../Services/Users";
import { useRouter } from "next/router";
import Loading from "../../Components/Loading";

export default function Home({ user }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loading></Loading>;
  }
  return <UserProfile user={user} type="user" />;
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
