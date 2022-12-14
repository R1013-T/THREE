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
import AuthMenu from "../components/auth/AuthMenu";
import LoadingWrap from "../components/auth/LoadingWrap";

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

const Auth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [menuHidden, setMenuHidden] = useState(true);
  const [authState, setAuthState] = useState(router.query.name);
  const [headTitle, setHeadTitle] = useState("");
  const [email, setEmail] = useState<string | string[]>("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const changeAuthState = (state: string) => {
    setAuthState(state);
  };
  const changeIsLoading = (state: boolean) => {
    setIsLoading(state);
  };
  const changeMenuHidden = (state: boolean) => {
    setMenuHidden(state);
  };

  const changeEmail = (email: string) => {
    setEmail(email);
  };
  const changePassword = (password: string) => {
    setPassword(password);
  };
  const changeUserName = (userName: string) => {
    setUserName(userName);
  };

  useEffect(() => {
    if (!authState) return;
    console.log(authState);
    if (authState[0] === "s") {
      setHeadTitle("Sign Up");
    } else {
      setHeadTitle("Log in");
    }

    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [authState]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
        />
        <title>THREE - {headTitle}</title>
      </Head>
      {menuHidden ? "" : <AuthMenu changeMenuHidden={changeMenuHidden} />}
      <AuthHeader isLoading={isLoading} changeMenuHidden={changeMenuHidden} />
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
            changeIsLoading={changeIsLoading}
          />
        ) : (
          ""
        )}
        {authState === "signupBeforeComplete" ? (
          <SignupBeforeComplete
            changeAuthState={changeAuthState}
            email={email}
            changeIsLoading={changeIsLoading}
          />
        ) : (
          ""
        )}

        {authState === "signupAfterInput" ? (
          <SignupAfterInput
            changeAuthState={changeAuthState}
            changePassword={changePassword}
            changeUserName={changeUserName}
          />
        ) : (
          ""
        )}
        {authState === "signupAfterConfirm" ? (
          <SignupAfterConfirm
            changeAuthState={changeAuthState}
            changeIsLoading={changeIsLoading}
            email={email}
            password={password}
            userName={userName}
          />
        ) : (
          ""
        )}

        {authState === "loginInput" ? (
          <LoginInput changeIsLoading={changeIsLoading} />
        ) : (
          ""
        )}

        {isLoading ? <LoadingWrap /> : ""}
      </div>
    </div>
  );
};

export default Auth;
