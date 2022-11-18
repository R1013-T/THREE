import styles from "../../../../styles/auth.module.scss";

import { useRouter } from "next/router";
import { useState } from "react";

import { IoChevronBackSharp } from "react-icons/io5";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
  changeAuthState: Function;
  changeEmail: Function;
}

const Input = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [attentionFlag, setAttentionFlag] = useState(true);
  const [attentionDesc, setAttentionDesc] =
    useState("メールアドレスを入力してください。");
  const [ngMoveFlag, setNgMoveFlag] = useState(false);
  const handleBack = () => {
    router.push("/");
  };

  const handleBlur = () => {
    scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    if (!e.currentTarget.value) {
      setAttentionFlag(true);
      setAttentionDesc("メールアドレスを入力してください。");
    } else if (!checkEmailValidation(e.currentTarget.value)) {
      setAttentionFlag(true);
      setAttentionDesc("メールアドレスではありません。");
    } else {
      setAttentionFlag(false);
      setAttentionDesc("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attentionFlag) {
      setNgMoveFlag(true);
      setTimeout(function () {
        setNgMoveFlag(false);
      }, 350);
    } else {
      props.changeEmail(email)
      props.changeAuthState('signupBeforeConfirm')
    }
  };

  const checkEmailValidation = (email: string) => {
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      return true;
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
      <div className={styles.main}>
        <div className={styles.inner}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="text"
              id="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Email Address"
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
