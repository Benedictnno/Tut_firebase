import React , {useState}from "react";
import { auth,googleProvider } from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup ,signOut} from "firebase/auth"

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log(auth?.currentUser?.photoURL);

  async function signIn() {
    try {
      await createUserWithEmailAndPassword(auth,email,password)  
    } catch (error) {
      console.error(error);
    }
  }


  async function googleSignIn() {
    try {
      await signInWithPopup(auth, googleProvider);  
    } catch (error) {
      console.error(error);
    }
  }


  async function Logout() {
    try {
      await signOut(auth);  
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={googleSignIn}>Sign In with Google</button>
      <button onClick={Logout}>Logout</button>
    </div>
  );
};

export default Auth;
