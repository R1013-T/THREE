import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const AuthErrors = (e: string) => {
//   let errorMessage;
//   switch (e) {
//     case "auth/email-already-in-use":
//       errorMessage = "このメールアドレスはすでに登録済みです。";
//       break;
//     case "auth/wrong-password":
//       errorMessage = "メールアドレスまたはパスワードが違います。";
//       break;
//     case "auth/too-many-requests":
//       errorMessage =
//         "ログインに何度も失敗したため、このアカウントへのアクセスは一時的に無効になっています。時間を空けてもう一度試してください。";
//       break;
//     default:
//       errorMessage = e;
//   }
//   return errorMessage;
// };

// export default AuthErrors;
