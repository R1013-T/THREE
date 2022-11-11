import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/main");
      } else {
        router.push("/")
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>THREE</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jtf0vez.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
