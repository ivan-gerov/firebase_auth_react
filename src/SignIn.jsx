import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export const BasicSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (event) => {
    event.preventDefault();

    try {
      let result = await createUserWithEmailAndPassword(auth, email, password);
      alert("Successfully signed up!");
      const response = await fetch(
        "http://127.0.0.1:8000/create-user-profile/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.user.accessToken}`, // here we are sending the token as part of the Authorization header
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        });
      debugger;
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <form onSubmit={signUp}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export const GoogleSignIn = () => {
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user); // This will give you all the user details

      const response = await fetch(
        "http://127.0.0.1:8000/create-user-profile/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.user.accessToken}`, // here we are sending the token as part of the Authorization header
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log("Error signing in with Google: ", error.message);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};
