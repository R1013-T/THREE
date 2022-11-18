interface Props {
  changeAuthState: Function;
  email: string | string[];
  password: string;
  userName: string;
}

const Confirm = (props: Props) => {
  return (
    <>
      <p>{props.email}</p>
      <p>{props.password}</p>
      <p>{props.userName}</p>
    </>
  );
};

export default Confirm;
