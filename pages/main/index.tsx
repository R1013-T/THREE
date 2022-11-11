import { auth } from "../../lib/firebase";

const index = () => {

  const handleLogout = () => {
    auth.signOut()
  };

  return (
    <div>
      #main
      <br />
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default index;
