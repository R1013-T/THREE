import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";

const index = () => {
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
    router.push("./");
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
