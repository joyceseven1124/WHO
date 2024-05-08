// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.NEXT_FIREBASE_APIKEY,
  // authDomain: process.env.NEXT_FIREBASE_AUTHDOMAIN,
  // projectId: process.env.NEXT_FIREBASE_PROJECTID,
  // storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_FIREBASE_SENDERID,
  // appId: process.env.NEXT_FIREBASE_APPID,
  // measurementId: process.env.NEXT_FIREBASE_MEASUREMENTID,
  // 不這樣會讀不到資料
  apiKey: 'AIzaSyDdA3ONmDTmpSerEYDmDgQbtcjjZRJqW5A',
  authDomain: 'whoiam-38f06.firebaseapp.com',
  projectId: 'whoiam-38f06',
  storageBucket: 'whoiam-38f06.appspot.com',
  messagingSenderId: '676382247890',
  appId: '1:676382247890:web:e871f64ee6bc8b1874960b',
  measurementId: 'G-KR8C1X955G',
};

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore(app);

// export { db };

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth(app);
// auth.languageCode = 'it';

export { auth, db };
