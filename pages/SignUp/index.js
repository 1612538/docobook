import SignUp from "../../Components/SignUp";
import Head from "next/head";
const SignUpPage = () => {
  return (
    <div>
      <Head>
        <title>DocoBook</title>
        <meta name="description" content="Light novel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignUp></SignUp>
      </main>
    </div>
  );
};

export default SignUpPage;
