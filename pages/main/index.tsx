import { auth } from "../../lib/firebase";

const index = () => {

  const handleLogout = () => {
    auth.signOut()
  };

  return (
    <div>
      #main
      <br />
      <div>
        <p>{auth.currentUser?.email}</p>
        <p>{auth.currentUser?.displayName}</p>
      </div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default index;
