import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
const AdminPage = () => {
  const router = useRouter();
  useEffect(() => {
    
    router.push("Admin/ManageBook");
    return () => {
      
    }
  }, [])
  return (
    <div>
      <Head>
        <title>DocoBook</title>
        <meta name="description" content="Light novel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      </main>
    </div>
  );
};

export default AdminPage;
