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
    }, 200);
  };

  return (
    <div className={`${styles.menu} ${hideMoveFlag ? styles.hide : ""}`}>
      <div className={`${styles.menuInner} ${hideMoveFlag ? styles.hide : ""}`}>
        <AiOutlinePlus className={styles.hideButton} onClick={handleHide} />
      </div>
    </div>
  );
};

export default AuthMenu;
