import React from "react";
import Head from "next/head";
import GardenAdmin from "../components/GardenAdmin";
import css from "../styles/Home.module.scss";
import Header from "../components/Header";

function Dashboard() {
  return (
    <div className={css.container}>
      <Head>
        <title>Plantarium</title>
        <meta name="description" content="Plantarium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={[css.main, css.admin].join(" ")}>
        <Header isLog={true} />
        <GardenAdmin />
      </main>
    </div>
  );
}

export default Dashboard;
