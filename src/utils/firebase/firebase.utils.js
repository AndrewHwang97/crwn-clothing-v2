import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCQ8niK9W2rhpinMKdmKwnvWnd7ACzw_xE",
    authDomain: "crwn-clothing-db-776ee.firebaseapp.com",
    projectId: "crwn-clothing-db-776ee",
    storageBucket: "crwn-clothing-db-776ee.appspot.com",
    messagingSenderId: "1055951983187",
    appId: "1:1055951983187:web:d6afa21ae9b5c938c6eca6"
};

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('error creating user', error.message)
        }

        return userDocRef
    }
}