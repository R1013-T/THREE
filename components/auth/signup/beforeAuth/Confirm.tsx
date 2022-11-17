import styles from "../../../../styles/auth.module.scss";
import { db } from "../../../../lib/firebase";

import { useRouter } from "next/router";

import { RiMailSendLine } from "react-icons/ri";
import { IoChevronBackSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { init, send } from "emailjs-com";
import { collection, addDoc, getDocs } from "firebase/firestore";
interface Props {
  changeAuthState: Function;
  changeIsLoading: Function;
  email: string;
}

const Confirm = (props: Props) => {
  const router = useRouter();

  const handleBack = () => {
    props.changeAuthState("signupBeforeInput");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.changeIsLoading(true);

    const checkEmail = await checkAlreadyUseEmail()
    if (checkEmail) {
      alert("既に登録済みメールアドレスです。")
      props.changeAuthState("loginInput")
    } else {
      const userId = await inputAuthFirestore();
      if (userId) {
        await sendAuthMail(userId);
      }
    }

    props.changeIsLoading(false);
  };

  const checkAlreadyUseEmail = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let check = false
    querySnapshot.forEach((doc) => {
      if (doc.data().email === props.email) {
        check = true
      }
    });
    return check
  };

  const inputAuthFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "authenticatingUsers"), {
        email: props.email,
      });
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("エラーが発生しました。最初からやり直してください。");
      router.push("/");
    }
  };

  const sendAuthMail = async (userId: string) => {
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const TEMPLATE_PALMS = {
      email: props.email,
      url: document.location.href + "/" + userId,
    };

    if (PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID) {
      init(PUBLIC_KEY);
      await send(SERVICE_ID, TEMPLATE_ID, TEMPLATE_PALMS).catch((e) => {
        console.error("Error sending authentication mail: ", e);
        alert("エラーが発生しました。最初からやり直してください。");
        router.push("/");
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.backButton} onClick={handleBack}>
          <IoChevronBackSharp className={styles.backImage} />
          back
        </div>
        <h1>CREATE YOUR ACCOUNT</h1>
        <div></div>
      </div>
      <div className={styles.main}>
        <div className={styles.inner}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              以下のメールアドレスに認証メールを送信します。
            </label>
            <p className={styles.centerLabel}>{props.email}</p>
            <p className={styles.attention}></p>
            <button type="submit">
              <div>
                <RiMailSendLine />
              </div>
              <p>Send</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
