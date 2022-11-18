import styles from "../../styles/auth.module.scss";
import { db } from "../../lib/firebase";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { collection, getDocs } from "firebase/firestore";

const SignupAfterAuth = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const authId = location.pathname.substring(6)
    console.log(authId);

    const checkEmail = async () => {
      const querySnapshot = await getDocs(collection(db, "authenticatingUsers"));
      let check = false;

      querySnapshot.forEach((doc) => {
        if (doc.id === authId) {
          check = true;
          setEmail(doc.data().email);
        }
      });
      if (check) {
        setIsLoading(false);
      } else {
        router.push("/");
      }
    };
    checkEmail();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const query = {
      email: email,
      name: "signupAfterInput"
    }

    router.push({ pathname: "/auth", query: query }, "/auth");
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
        <title>THREE - Sign Up</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.top}>
          <div></div>
          <p>THREE</p>
          <div></div>
        </div>
        <div className={styles.center}>
          <img
            className={`${styles.centerImg} ${isLoading ? styles.loading : ""}`}
            src="../THREE_logo.svg"
            alt=""
          />
        </div>
      </div>
      <div className={styles.formWrap}>
        <div className={styles.container}>
          <div className={styles.head}>
            <div></div>
            <h1>CREATE YOUR ACCOUNT</h1>
            <div></div>
          </div>
          <div className={styles.main}>
            <div className={styles.inner}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                  以下のメールアドレスでお間違い無いですか。
                </label>
                <p className={styles.centerLabel}>{email}</p>
                <p className={styles.attention}></p>
                <button
                  type="submit"
                  className={`${isLoading ? styles.sent : ""}`}
                >
                  <div></div>
                  <p>Continue</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupAfterAuth;
