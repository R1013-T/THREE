import styles from "../../../styles/auth.module.scss";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IoChevronBackSharp } from "react-icons/io5";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface Props {
  changeIsLoading: Function;
}

const Input = (props: Props) => {
  const router = useRouter();

  const [attentionFlag, setAttentionFlag] = useState(true);
  const [attentionDesc, setAttentionDesc] =
    useState("メールアドレスを入力してください。");
  const [ngMoveFlag, setNgMoveFlag] = useState(false);
  const [changePage, setChangePage] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("email");

  const [inputState, setInputState] = useState("email");
  const [inputLabel, setInputLabel] = useState("メールアドレス");
  const [inputPlaceholder, setInputPlaceholder] = useState("Email Address");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    switch (inputState) {
      case "email":
        router.push("/");
        break;
      case "password":
        setInputState("email");
        setInputValue("");
        setChangePage("back");
        setTimeout(function () {
          setChangePage("");
        }, 400);
        break;
      default:
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setAttentionFlag(false);
    setAttentionDesc("");
    switch (inputState) {
      case "email":
        const regex =
          /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
        if (!e.currentTarget.value) {
          setAttentionFlag(true);
          setAttentionDesc("メールアドレスを入力してください。");
        } else if (!regex.test(e.currentTarget.value)) {
          setAttentionFlag(true);
          setAttentionDesc("メールアドレスが間違っています。");
        }
        break;
      case "password":
        if (!e.currentTarget.value) {
          setAttentionFlag(true);
          setAttentionDesc("パスワードを入力してください。");
        }
        break;
      default:
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attentionFlag) {
      setNgMoveFlag(true);
      setTimeout(function () {
        setNgMoveFlag(false);
      }, 300);
    } else {
      props.changeIsLoading(true);
      switch (inputState) {
        case "email":
          let emailCheck = false;

          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            if (doc.data().email === inputValue) {
              emailCheck = true;
            }
          });
          props.changeIsLoading(false);

          if (emailCheck) {
            setEmail(inputValue);
            setInputState("password");
            setChangePage("next");
            setTimeout(function () {
              setChangePage("");
            }, 400);
          } else {
            setAttentionFlag(true);
            setAttentionDesc("未登録のメールアドレスです。");
            setNgMoveFlag(true);
            setTimeout(function () {
              setNgMoveFlag(false);
            }, 300);
          }

          break;
        case "password":
          await signInWithEmailAndPassword(auth, email, inputValue)
            .catch((e) => {
              let errMsg = "";
              switch (e.code) {
                case "auth/wrong-password":
                  errMsg = "パスワードが違います。";
                  break;
                default:
                  errMsg = "ログイン出来ません。"
              }
              setAttentionFlag(true)
              setAttentionDesc(errMsg)
              console.log(e.code)
            });
          props.changeIsLoading(false);
          break;
        default:
      }
    }
  };

  useEffect(() => {
    setAttentionFlag(true);
    setInputValue("");
    switch (inputState) {
      case "email":
        setInputLabel("メールアドレス");
        setInputPlaceholder("Email Address");
        setAttentionDesc("メールアドレスを入力してください。");
        setInputType("text");
        break;
      case "password":
        setInputLabel("パスワード");
        setInputPlaceholder("Password");
        setAttentionDesc("パスワードを入力してください。");
        setInputType("password");
        break;
      default:
    }
    const $input = document.getElementById("email");
    if ($input) {
      $input.focus();
    }
  }, [inputState]);

  const handleBlur = () => {
    scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.backButton} onClick={handleBack}>
          <IoChevronBackSharp className={styles.backImage} />
          back
        </div>
        <h1>LOG IN TO YOUR ACCOUNT</h1>
        <div></div>
      </div>
      <div
        className={`${styles.main} ${
          changePage === "next" ? styles.nextInput : ""
        } ${changePage === "back" ? styles.backInput : ""}`}
      >
        <div className={styles.inner}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">{inputLabel}</label>
            <input
              type={inputType}
              id="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={inputPlaceholder}
              value={inputValue}
            />
            <p className={styles.attention}>{attentionDesc}</p>
            <button type="submit" className={ngMoveFlag ? styles.ng : ""}>
              <div>
                {attentionFlag ? (
                  <AiOutlineCloseCircle color="#ea4141" />
                ) : (
                  <AiOutlineCheckCircle color="#60c538" />
                )}
              </div>
              <p>Continue</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Input;
