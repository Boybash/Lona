const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info
      const user = result.user;
      console.log("Signed in user:", user);
    })
    .catch((error) => {
      console.error("Error during sign-in:", error.message);
    });
};
