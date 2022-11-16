import styles from "../../../../styles/auth.module.scss";

import { useRouter } from "next/router";

import { RiMailSendLine } from "react-icons/ri";
import { IoChevronBackSharp } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { init, send } from "emailjs-com";
interface Props {
  changeAuthState: Function;
  changeIsLoading: Function;
  email: string;
}

const Confirm = (props: Props) => {
  const router = useRouter()

  const handleBack = () => {
    props.changeAuthState("signupBeforeInput");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.changeIsLoading(true)
    

    await sendAuthMail()
    await inputAuthFirestore()
    

    props.changeIsLoading(false)
  };

  const sendAuthMail = async () => {
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const CURRENT_UUID = uuidv4();
    const TEMPLATE_PALMS = {
      email: props.email,
      url: document.location.href + "/" + CURRENT_UUID,
    };

    if (PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID) {
      init(PUBLIC_KEY);
      await send(SERVICE_ID, TEMPLATE_ID, TEMPLATE_PALMS)
        .catch((e) => {
          console.log(e);
          alert('エラーが発生しました。最初からやり直してください。')
          router.push('/')
        });
    }
  }

  const inputAuthFirestore = () => {
    
  }

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
