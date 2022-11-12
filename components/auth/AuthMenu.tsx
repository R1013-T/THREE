import styles from "../../styles/auth.module.scss";

import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

interface Props {
  changeMenuHidden: Function;
}

const AuthMenu = (props: Props) => {
  const [hideMoveFlag, setHideMoveFlag] = useState(false);

  const handleHide = () => {
    setHideMoveFlag(true);
    setTimeout(function () {
      props.changeMenuHidden(true);
    }, 300);
  };

  return (
    <div className={`${styles.menu} ${hideMoveFlag ? styles.hide : ""}`}>
      <div className={styles.menuInner}>
      <AiOutlinePlus className={styles.hideButton} onClick={handleHide} />
      </div>
    </div>
  );
};

export default AuthMenu;
