import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useContext, createContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  where,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGREePpMBB5tXIQ-N7xewhlrFCUfIoN4w",
  authDomain: "stickynotes-c9e53.firebaseapp.com",
  projectId: "stickynotes-c9e53",
  storageBucket: "stickynotes-c9e53.appspot.com",
  messagingSenderId: "406614987400",
  appId: "1:406614987400:web:e2e64d34dbfb616b2ec53d",
  measurementId: "G-PD1XDN4QSF",
};

const app = initializeApp(firebaseConfig);
const firebaseContext = createContext();
const db = getFirestore(app);
const auth = getAuth(app);

export const FirebaseProvider = ({ children }) => {
  // signup & signin Logic

  const [user, Setuser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) Setuser(user);
      else Setuser(null);
    });
  }, []);
  const isLoggedIn = user ? true : false;

  const signUp = async (uname, email, pswd) => {
    const res = await createUserWithEmailAndPassword(auth, email, pswd);
    const updateName = await updateProfile(auth.currentUser, {
      displayName: uname.toLowerCase(),
    });
    return res.user;
  };
  const signIn = async (email, pswd) => {
    const res = await signInWithEmailAndPassword(auth, email, pswd);
    return res.user;
  };
  const signOutuser = () => signOut(auth);

  // Notes Logic

  const addNote = async (title, desc) => {
    const current = new Date();
    const docRef = await addDoc(collection(db, "notes"), {
      title: title,
      description: desc,
      created: Timestamp.now(),
      uid: user.uid,
    });
    console.log("Success");
  };

  const getNotes = async () =>
    await getDocs(
      query(
        collection(db, "notes"),
        where("uid", "==", user.uid),
        orderBy("created", "desc")
      )
    );
  const getNote = async (id) => await getDoc(doc(db, "notes", id));
  const deleteNote = async (id) => await deleteDoc(doc(db, "notes", id));
  const updateNote = async (id, title, desc) =>
    await updateDoc(doc(db, "notes", id), {
      title: title,
      description: desc,
    });

  return (
    <firebaseContext.Provider
      value={{
        addNote,
        getNotes,
        getNote,
        deleteNote,
        updateNote,
        signIn,
        signUp,
        isLoggedIn,
        signOutuser,
        user,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(firebaseContext);
