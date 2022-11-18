import styles from "../../../../styles/auth.module.scss";

import { useState } from "react";
import Head from "next/head";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoChevronBackSharp } from "react-icons/io5";

interface Props {
  changeAuthState: Function;
  email: string | string[];
  password: string;
  userName: string;
}

const Confirm = (props: Props) => {
  const [passwordInputType, setPasswordInputType] = useState("password");

  const handleBack = () => {
    props.changeAuthState("signupAfterInput")
    scrollTo(0,0)
  };

  const scrollTop = () => {
    scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    scrollTo(0, 0);
  };

  const handleHiddenButton = () => {
    scrollTo(0, 0);
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.backButton} onClick={handleBack}>
          <IoChevronBackSharp className={styles.backImage} />
          back
        </div>
        <h1>CREATE YOUR ACCOUNT</h1>
        <div></div>
      </div>
      <div className={`${styles.main} ${styles.normal}`}>
        <div className={styles.inner}>
          <form onSubmit={handleSubmit}>
            <label className={styles.confirmLabel}>ユーザーネーム</label>
            <input
              className={styles.confirmInput}
              type="text"
              value={props.userName}
              readOnly
              onBlur={scrollTop}
              onFocus={scrollTop}
            />
            <label className={styles.confirmLabel}>メールアドレス</label>
            <input
              className={styles.confirmInput}
              type="text"
              value={props.email}
              readOnly
              onBlur={scrollTop}
              onFocus={scrollTop}
            />
            <label className={styles.confirmLabel}>パスワード</label>
            <div className={styles.passwordWrap}>
              <input
                className={styles.confirmPasswordInput}
                type={passwordInputType}
                value={props.password}
                readOnly
                onBlur={scrollTop}
                onFocus={scrollTop}
              />
              <div
                className={styles.passwordHiddenButton}
                onClick={handleHiddenButton}
              >
                {passwordInputType === "password" ? (
                  <VscEye />
                ) : (
                  <VscEyeClosed />
                )}
              </div>
            </div>
            <button className={styles.confirmButton} type="submit">
              <p>Continue</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
