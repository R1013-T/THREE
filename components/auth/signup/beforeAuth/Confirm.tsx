import styles from "../../../../styles/auth.module.scss"

interface Props {
  changeAuthState: Function;
  email: string;
}

const Confirm = (props: Props) => {
  return (
    <div className={styles.container}>
      signup before confirm <p>{props.email}</p>
    </div>
  );
};

export default Confirm;
