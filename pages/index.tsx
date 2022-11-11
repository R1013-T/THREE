import styles from "../styles/top.module.scss";
import AuthHeader from "../components/auth/AuthHeader";

import { useState } from "react";
import Head from "next/head";

import { FcGoogle } from "react-icons/fc";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>THREE</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthHeader isLoading={isLoading} />
      <main className={styles.main}>
        <div className={styles.inner}>
          <button className={styles.singup}>Sing up</button>
          <button className={styles.login}>Log in</button>
          <div className={styles.or}>or</div>
          <button className={styles.googleLogin}>
            <div className={styles.googleInner}>
              <div>
                <FcGoogle />
              </div>
              <p>Log in with Google</p>
              <div></div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
