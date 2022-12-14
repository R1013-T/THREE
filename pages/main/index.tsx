import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";

const MainIndex = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
    auth.signOut();
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

export default MainIndex;
