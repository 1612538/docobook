import SignIn from "../../Components/SignIn";
import Head from "next/head";
const SignInPage = () => {
  return (
    <div>
      <Head>
        <title>DocoBook</title>
        <meta name="description" content="Light novel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SignIn></SignIn>
      </main>
    </div>
  );
};

export default SignInPage;
