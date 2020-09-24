import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCwSVoDxY0FUPtD1ce7HlRtfQ8PxNXA9OA",
  authDomain: "crwn-db-63d63.firebaseapp.com",
  databaseURL: "https://crwn-db-63d63.firebaseio.com",
  projectId: "crwn-db-63d63",
  storageBucket: "crwn-db-63d63.appspot.com",
  messagingSenderId: "11767223690",
  appId: "1:11767223690:web:9bb65c57d9316b73132473",
  measurementId: "G-SWMDYT6MWP"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

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
      console.log('error creating user : ', error.message);
    }
  }

  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;