import React, { useState } from "react";
import Head from "next/head";
import css from "../styles/Home.module.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignIn from "../components/Account/SignIn";
import SignUp from "../components/Account/SignUp";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();

  return (
    <div className={css.container}>
      <Head>
        <title>Plantarium - Connexion</title>
        <meta name="description" content="Plantarium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={css.main}>
        <Header isLog={false} active="login" />
        {router.query.page === "login" && <SignIn />}
        {router.query.page === "signin" && <SignUp />}
        <Footer />
      </main>
    </div>
  );
}

export default Login;
