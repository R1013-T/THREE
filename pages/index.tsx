import styles from "../styles/Top.module.scss";
import AuthHeader from "../components/auth/AuthHeader";
import { auth } from "../lib/firebase";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import AuthMenu from "../components/auth/AuthMenu";
import Head from "next/head";

if (typeof document !== "undefined") {
  const touchHandler = (event: any) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  };
  document.addEventListener("touchstart", touchHandler, {
    passive: false,
  });
  document.addEventListener(
    "touchmove",
    (event: any) => {
      event.preventDefault();
    },
    { passive: false }
  );
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [menuHidden, setMenuHidden] = useState(true);

  const signupQuery = {
    name: "signupBeforeInput",
  };
  const loginQuery = {
    name: "loginInput",
  };

  const changeIsLoading = (state: boolean) => {
    setIsLoading(state);
  };

  const handleSignup = () => {
    router.push({ pathname: "auth", query: signupQuery }, "auth");
  };

  const handleLogin = () => {
    router.push({ pathname: "auth", query: loginQuery }, "auth");
  };

  const changeMenuHidden = (state: boolean) => {
    setMenuHidden(state);
  };

  const handleGoogleLogin = async () => {
    changeIsLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className={styles.wrapper}>
      {menuHidden ? "" : <AuthMenu changeMenuHidden={changeMenuHidden} />}
      <AuthHeader isLoading={isLoading} changeMenuHidden={changeMenuHidden} />
      <main className={styles.main}>
        <div className={styles.inner}>
          <button className={styles.singup} onClick={handleSignup}>
            Sing up
          </button>
          <button className={styles.login} onClick={handleLogin}>
            Log in
          </button>
          <div className={styles.or}>or</div>
          <button className={styles.googleLogin} onClick={handleGoogleLogin}>
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
