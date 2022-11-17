import styles from "../../../../styles/auth.module.scss";

import { RiMailCheckLine } from "react-icons/ri";
import { IoChevronBackSharp } from "react-icons/io5";

interface Props {
  changeAuthState: Function;
  changeIsLoading: Function;
  email: string;
}

const Complete = (props: Props) => {
  const handleBack = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div></div>
        <h1>CREATE YOUR ACCOUNT</h1>
        <div></div>
      </div>
      <div className={styles.main}>
        <div className={styles.inner}>
          <form>
            <label htmlFor="email">
              以下のメールアドレスに認証メールを送信しました。メールのボタンから認証を続けて下さい。
            </label>
            <p className={styles.centerLabel}>{props.email}</p>
            <p className={styles.attention}></p>
            <button className={styles.sent} type="button">
              <div>
                <RiMailCheckLine />
              </div>
              <p>Sent</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Complete;
