import styles from "../../../../styles/auth.module.scss";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IoChevronBackSharp } from "react-icons/io5";
import { BsShieldCheck, BsShieldX, BsShieldExclamation } from "react-icons/bs";

interface Props {
  changeAuthState: Function;
  changePassword: Function;
  changeUserName: Function;
}

const Input = (props: Props) => {
  const router = useRouter();
  const [attentionFlag, setAttentionFlag] = useState<string>("ng");
  const [attentionDesc, setAttentionDesc] =
    useState("パスワードを入力してください。");
  const [ngMoveFlag, setNgMoveFlag] = useState(false);
  const [changePage, setChangePage] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("password");

  const [inputState, setInputState] = useState("password");
  const [inputLabel, setInputLabel] = useState("パスワード");
  const [inputPlaceholder, setInputPlaceholder] = useState("Password");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");

  const handleBlur = () => {
    scrollTo(0, 0);
  };

  const checkPassword = (password: string) => {
    const okRegex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,100}$/;
    const ngRegex = /^[a-zA-Z0-9.?\/-]{0,100}$/;
    if (!password) {
      setAttentionFlag("ng");
      setAttentionDesc("パスワードを入力してください。");
    } else {
      if (okRegex.test(password)) {
      } else if (ngRegex.test(password)) {
        if (password.length >= 6) {
          setAttentionFlag("attention");
          setAttentionDesc("安全ではないパスワードです。");
        } else {
          setAttentionFlag("ng");
          setAttentionDesc("６文字以上入力してください。");
        }
      } else {
        setAttentionFlag("ng");
        setAttentionDesc("使用出来ない文字が含まれています。");
      }
    }
  };
  const checkConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setAttentionFlag("ng");
      setAttentionDesc("パスワード(確認)を入力してください。");
    } else if (password !== confirmPassword) {
      setAttentionFlag("ng");
      setAttentionDesc("パスワードと一致しません。");
    }
  };
  const checkUserName = (userName: string) => {
    if (!userName) {
      setAttentionFlag("ng");
      setAttentionDesc("ユーザーネームを入力してください。");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttentionFlag("ok");
    setAttentionDesc("");
    setInputValue(e.currentTarget.value);
    switch (inputState) {
      case "password":
        checkPassword(e.currentTarget.value);
        break;
      case "passwordConfirm":
        checkConfirmPassword(e.currentTarget.value);
        break;
      case "userName":
        checkUserName(e.currentTarget.value);
        break;
      default:
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attentionFlag === "ng") {
      setNgMoveFlag(true);
      setTimeout(function () {
        setNgMoveFlag(false);
      }, 300);
    } else {
      switch (inputState) {
        case "password":
          setPassword(inputValue);
          setInputState("passwordConfirm");
          nextInput();
          break;
        case "passwordConfirm":
          setPasswordConfirm(inputValue);
          setInputState("userName");
          nextInput();
          break;
        case "userName":
          setUserName(inputValue);
          break;
        default:
      }
    }
  };

  const nextInput = () => {
    setInputValue("");
    setChangePage("next");
    setTimeout(function () {
      setChangePage("");
    }, 400);
  };

  const handleBack = () => {
    switch (inputState) {
      case "passwordConfirm":
        setInputState("password");
        break;
      case "userName":
        setInputState("passwordConfirm");
        break;
      default:
    }
    setInputValue("");
    setChangePage("back");
    setTimeout(function () {
      setChangePage("");
    }, 400);
  };

  useEffect(() => {
    if (!userName) return
    props.changePassword(password)
    props.changeUserName(userName)
    props.changeAuthState("signupAfterConfirm")
  },[userName])

  useEffect(() => {
    setAttentionFlag("ng");
    switch (inputState) {
      case "password":
        setInputLabel("パスワード");
        setInputPlaceholder("Password");
        setAttentionDesc("パスワードを入力してください。");
        setInputType("password");
        break;
      case "passwordConfirm":
        setInputLabel("パスワード(確認)");
        setInputPlaceholder("Password Confirm");
        setAttentionDesc("パスワード(確認)を入力してください。");
        setInputType("password");
        break;
      case "userName":
        setInputLabel("ユーザーネーム");
        setInputPlaceholder("User Name");
        setAttentionDesc("ユーザーネームを入力してください。");
        setInputType("text");
        break;
      default:
    }
  }, [inputState]);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.backButton} onClick={handleBack}>
          {inputState !== "password" ? (
            <IoChevronBackSharp className={styles.backImage} />
          ) : (
            ""
          )}
          {inputState !== "password" ? "back" : ""}
        </div>
        <h1>CREATE YOUR ACCOUNT</h1>
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
            <p
              className={`${styles.attention} ${
                attentionFlag === "attention" ? styles.at : ""
              }`}
            >
              {attentionDesc}
            </p>
            <button type="submit" className={ngMoveFlag ? styles.ng : ""}>
              <div>
                {attentionFlag === "ok" ? (
                  <BsShieldCheck color="#60c538" />
                ) : (
                  ""
                )}
                {attentionFlag === "ng" ? <BsShieldX color="#ea4141" /> : ""}
                {attentionFlag === "attention" ? (
                  <BsShieldExclamation color="#f8d216" />
                ) : (
                  ""
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
