import { useEffect, useState } from "react";
import db from "../../firebase/firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import useStore from "../../store/users";
import { Alert, Button, Stack, Typography } from "@mui/joy";

const LoginEmail = ({ errorAlert }) => {
  // const [message, setMessage] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [emailLogin, setEmailLogin] = useState("");
  // const [passwordLogin, setPasswordLogin] = useState("");
  // const [error, setError] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      if (user !== null) {
        const username = user.displayName;
        const email = user.email;
        // const admin = user.admin;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
      }
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Login succesfully!</Alert>
        </Stack>
      );
    } catch (error) {
      errorAlert();
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">
            Password reset email sent! — check it out!
          </Alert>
        </Stack>
      );
    } catch (error) {
      errorAlert();
    }
  };

  const handleLogoutSubmit = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      // Sign-out successful.
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="info">You have logged out!</Alert>
        </Stack>
      );
    } catch (error) {
      errorAlert();
    }
  };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       dispatch(
  //         setUser({
  //           id: user.uid,
  //           username: username,
  //           email: user.email,
  //           admin: false,
  //         })
  //       );
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // //////LOGIN/////

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const providers = await fetchSignInMethodsForEmail(auth, emailLogin);
  //     if (providers.length === 0) {
  //       setError("Email address not registered. Please sign up.");
  //       return;
  //     }
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       emailLogin,
  //       passwordLogin
  //     );
  //     dispatch(setUser(user));

  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Sign in failed!", error);
  //     setError(error.message);
  //   }
  // };

  // ////SINGOUT/////

  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     // Limpiar el estado global del usuario
  //     dispatch(clearUser());
  //     //setUser(null);
  //   } catch (error) {
  //     console.error("Error al cerrar sesion", error);
  //     setError(error.message);
  //   }
  // };
  return (
    <>
      <div>
        <Typography level="h4" component="h1">
          <b>Welcome!</b>
        </Typography>
        <Typography level="body2">Sign in to continue.</Typography>
      </div>
      {/* <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl> */}
      <div className={"firebaseui-auth-container"}></div>
      <div id="loader">Loading...</div>
    </>
  );
};

export default LoginEmail;
