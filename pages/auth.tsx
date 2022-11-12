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

  useEffect(() => {}, []);

  return (
    <div className={styles.wrapper}>
      <AuthHeader isLoading={isLoading} />

      {authState === "signupBeforeInput" ? <SignupBeforeInput /> : ""}
      {authState === "signupBeforeConfirm" ? <SignupBeforeConfirm /> : ""}
      {authState === "signupBeforeComplete" ? <SignupBeforeComplete /> : ""}

      {authState === "signupAfterInput" ? <SignupAfterInput /> : ""}
      {authState === "signupAfterConfirm" ? <SignupAfterConfirm /> : ""}

      {authState === "loginInput" ? <LoginInput /> : ""}
    </div>
  );
};

export default Auth;