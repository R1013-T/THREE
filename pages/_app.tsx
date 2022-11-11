import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { auth } from "../lib/firebase";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const currentUser = auth.currentUser
    if (currentUser) {
      console.log(currentUser)
    } else {
      console.log('no')
    }
  })

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
