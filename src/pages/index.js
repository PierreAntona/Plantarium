import Head from "next/head";
import Footer from "../components/Footer";
import GardenModeling from "../components/GardenModeling";
import Header from "../components/Header";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Plantarium</title>
        <meta name="description" content="Plantarium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <GardenModeling />
        <Footer />
      </main>
    </div>
  );
}
