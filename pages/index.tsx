import Head from "next/head";
import { useState } from "react";
import AuthHeader from "../components/auth/AuthHeader";
import styles from "../styles/auth.module.scss";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>THREE</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthHeader isLoading={isLoading}/>
      <main className={styles.main}>
        <h1>#Top Page</h1>
      </main>
    </div>
  );
}
