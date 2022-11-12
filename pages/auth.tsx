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

const Auth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState(router.query.name);
  const [email, setEmail] = useState("");

  const changeAuthState = (state: string) => {
    setAuthState(state);
  };
  const changeEmail = (email: string) => {
    setEmail(email);
  };

  return (
    <div className={styles.wrapper}>
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
