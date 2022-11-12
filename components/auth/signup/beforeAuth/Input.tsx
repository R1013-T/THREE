import styles from "../../../../styles/auth.module.scss";

import { useRouter } from "next/router";
import { IoChevronBackSharp } from "react-icons/io5";
import { useState } from "react";

const Input = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [attentionFlag, setAttentionFlag] = useState(false)
  const [attentionDesc, setAttentionDesc] = useState("メールアドレスを入力してください。")

  const handleBack = () => {
    router.push("/")
  }

  const handleBlur = () => {
    scrollTo(0,0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setAttentionFlag(false)
    setAttentionDesc("")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onBlur={handleBlur} onChange={handleChange}/>
            <p className={styles.attention}>{attentionDesc}</p>
            <button type="submit" >Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Input;
