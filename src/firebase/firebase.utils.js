import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAJpYZKVZoE4lU2xCiuS0j7itlnpKvTn1k",
  authDomain: "crwn-db-c39f3.firebaseapp.com",
  databaseURL: "https://crwn-db-c39f3.firebaseio.com",
  projectId: "crwn-db-c39f3",
  storageBucket: "",
  messagingSenderId: "101073050654",
  appId: "1:101073050654:web:ce1490c69bc1db57"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  console.log(userRef);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const signinWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
