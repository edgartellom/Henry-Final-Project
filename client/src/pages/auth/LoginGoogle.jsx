import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";

import React from "react";

const LoginGoogle = ({ errorAlert }) => {
  // // Build Firebase credential with the Google ID token.
  // const provider = new GoogleAuthProvider();
  // provider.setCustomParameters({
  //   login_hint: "user@example.com",
  // });
  // const credential = GoogleAuthProvider.credential(idToken);

  // Sign in with credential from the Google user.
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLoginSubmit = async () => {
    try {
      const result = await signInWithCredential(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
        });
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };

  return <div>LoginGoogle</div>;
};

export default LoginGoogle;
