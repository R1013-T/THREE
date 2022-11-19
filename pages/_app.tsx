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
    if (router.asPath === "/auth/[auth_id]") return;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/main");
      } else {
        router.push("/");
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>THREE</title>
        <meta name="description" content="2023 TECH.C. School Anniversary - WebAR脱出ゲーム" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="THREE" />
        <meta
          property="og:description"
          content="2023 TECH.C. School Anniversary - WebAR脱出ゲーム"
        />
        <meta property="og:site_name" content="THREE" />
        <meta property="og:image" content="THREE_logo.svg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/jtf0vez.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
