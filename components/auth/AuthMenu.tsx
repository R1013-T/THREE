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
      <div className={styles.hideButtonWrap}>
        <AiOutlinePlus className={styles.hideButton} onClick={handleHide} />
      </div>
      <div className={styles.menuInner}>
        <div className={styles.listWrapper}>
          <div className={styles.menuWrap1}>
            <button className={styles.menu1}>Menu1</button>
          </div>
          <div className={styles.menuWrap1}>
            <button className={styles.menu1}>Menu2</button>
          </div>
          <div className={styles.menuWrap1}>
            <button className={styles.menu1}>Menu3</button>
          </div>
          <div className={styles.menuWrap1}>
            <button className={styles.menu1}>Menu4</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthMenu;
