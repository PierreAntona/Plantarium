import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import GardenAdmin from "../components/GardenAdmin";
import GardenModeling from "../components/GardenModeling";
import Header from "../components/Header";
import css from "../styles/Home.module.scss";

export default function Home() {
  const [isLog, setIsLog] = useState(false);
  return (
    <div className={css.container}>
      <Head>
        <title>Plantarium</title>
        <meta name="description" content="Plantarium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={
          isLog
            ? [css.main, css.admin].join(" ")
            : [css.main, css.modeling].join(" ")
        }
      >
        <Header isLog={isLog} />
        {isLog ? (
          <GardenAdmin />
        ) : (
          <>
            <GardenModeling />
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}
