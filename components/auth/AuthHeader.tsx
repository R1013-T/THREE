import styles from "../../styles/auth.module.scss";

import Head from "next/head";

import { RiMenu4Fill } from "react-icons/ri";
import { useRouter } from "next/router";

interface Props {
  isLoading: boolean;
  changeMenuHidden: Function
}

const AuthHeader = (props: Props) => {
  const router = useRouter()

  const handelMenu = () => {
    props.changeMenuHidden(false)
  }

  const handleClickLogo = () => {
    router.push("/")
  }

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div onClick={handelMenu}>
          <RiMenu4Fill />
        </div>
        <p onClick={handleClickLogo}>THREE</p>
        <div></div>
      </div>
      <div className={styles.center}>
        <img className={`${styles.centerImg} ${props.isLoading ? styles.loading : ""}`} src="THREE_logo.svg" alt="" />
      </div>
    </div>
  );
};

export default AuthHeader;
