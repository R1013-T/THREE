import styles from "../../../../styles/auth.module.scss";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoChevronBackSharp } from "react-icons/io5";
import { auth, db } from "../../../../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

interface Props {
  changeAuthState: Function;
  changeIsLoading: Function;
  email: any;
  password: string;
  userName: string;
}

const Confirm = (props: Props) => {
  const router = useRouter();

  const [passwordInputType, setPasswordInputType] = useState("password");

  const handleBack = () => {
    props.changeAuthState("signupAfterInput");
    scrollTo(0, 0);
  };

  const scrollTop = () => {
    scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    scrollTo(0, 0);

    props.changeIsLoading(true);
    await inputFirestore();
    await signUpFirebase();
  };

  const inputFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: props.email,
        password: props.password,
      });
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("エラーが発生しました。最初からやり直してください。");
      router.push("/");
    }
  };

  const signUpFirebase = async () => {
    await createUserWithEmailAndPassword(auth, props.email, props.password)
      .then(() => {
        const user = auth.currentUser;
        if (!user) return;
        updateProfile(user, {
          displayName: props.userName,
        }).catch((e) => {
          console.log(e);
          alert("エラーが発生しました。");
          router.push("/");
        });
      })
      .then(() => {
        props.changeIsLoading(false);
        router.push("/main");
      })
      .catch((e) => {
        console.log(e);
        alert("エラーが発生しました。");
        router.push("/");
      });
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
