import styles from "../../styles/auth.module.scss";

import Head from "next/head";

import { RiMenu4Fill } from "react-icons/ri";

interface Props {
  isLoading: boolean
}

const AuthHeader = (props: Props) => {
  return (
    <div className={styles.header}>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/jtf0vez.css" />
      </Head>
      <div className={styles.top}>
        <div>
          <RiMenu4Fill />
        </div>
        <p>THREE</p>
        <div></div>
      </div>
      <div className={styles.center}>
        <img className={`${styles.centerImg} ${props.isLoading ? styles.loading : ""}`} src="THREE_logo.svg" alt="" />
      </div>
    </div>
  );
};

export default AuthHeader;
