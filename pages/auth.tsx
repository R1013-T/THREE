import styles from "../styles/auth.module.scss";
import AuthHeader from "../components/auth/AuthHeader";
import SignupBeforeInput from "../components/auth/signup/beforeAuth/Input";
import SignupBeforeConfirm from "../components/auth/signup/beforeAuth/Confirm";
import SignupBeforeComplete from "../components/auth/signup/beforeAuth/Complete";
import SignupAfterInput from "../components/auth/signup/AfterAuth/Input";
import SignupAfterConfirm from "../components/auth/signup/AfterAuth/Confirm";
import LoginInput from "../components/auth/login/Input";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

const Auth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState(router.query.name);
  const [headTitle, setHeadTitle] = useState("")
  const [email, setEmail] = useState("");

  const changeAuthState = (state: string) => {
    setAuthState(state);
  };
  const changeEmail = (email: string) => {
    setEmail(email);
  };

  useEffect(() => {
    if (!authState) return
    if (authState[0] === 's') {
      setHeadTitle("Sign Up")
    } else {
      setHeadTitle("Log in")
    }
  },[authState])

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
        <title>THREE - {headTitle}</title>
      </Head>
      <AuthHeader isLoading={isLoading} />
      <div className={styles.formWrap}>
        {authState === "signupBeforeInput" ? (
          <SignupBeforeInput
            changeAuthState={changeAuthState}
            changeEmail={changeEmail}
          />
        ) : (
          ""
        )}
        {authState === "signupBeforeConfirm" ? (
          <SignupBeforeConfirm
            changeAuthState={changeAuthState}
            email={email}
          />
        ) : (
          ""
        )}
        {authState === "signupBeforeComplete" ? (
          <SignupBeforeComplete changeAuthState={changeAuthState} />
        ) : (
          ""
        )}

        {authState === "signupAfterInput" ? <SignupAfterInput /> : ""}
        {authState === "signupAfterConfirm" ? <SignupAfterConfirm /> : ""}

        {authState === "loginInput" ? <LoginInput /> : ""}
      </div>
    </div>
  );
};

export default Auth;
