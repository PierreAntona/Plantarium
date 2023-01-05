import React, { useState } from "react";
import Head from "next/head";
import css from "../styles/Home.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignIn from "../components/Account/SignIn";
import SignUp from "../components/Account/SignUp";

function Login() {
  const [alreadyAnAccount, setAlreadyAnAccount] = useState(true);

  return (
    <div className={css.container}>
      <Head>
        <title>Plantarium - Connexion</title>
        <meta name="description" content="Plantarium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={css.main}>
        <Header active="login" />
        {alreadyAnAccount ? (
          <SignIn
            alreadyAnAccount={alreadyAnAccount}
            setAlreadyAnAccount={setAlreadyAnAccount}
          />
        ) : (
          <SignUp
            alreadyAnAccount={alreadyAnAccount}
            setAlreadyAnAccount={setAlreadyAnAccount}
          />
        )}
        <Footer />
      </main>
    </div>
  );
}

export default Login;
