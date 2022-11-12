import styles from "../../../../styles/auth.module.scss";

import {RiMailSendLine } from "react-icons/ri"
import { IoChevronBackSharp } from "react-icons/io5";

interface Props {
  changeAuthState: Function;
  email: string;
}

const Confirm = (props: Props) => {
  const handleBack = () => {
    props.changeAuthState("signupBeforeInput");
  };

  const handleSubmit = () => {};

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
            <label htmlFor="email">以下のメールアドレスに認証メールを送信します。</label>
            <p className={styles.centerLabel}>{props.email}</p>
            <p className={styles.attention}></p>
            <button type="submit">
              <div><RiMailSendLine /></div>
              <p>Send</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
