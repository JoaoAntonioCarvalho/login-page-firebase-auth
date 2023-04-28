const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } = require("firebase/auth");

//creates new user
const createUser = async function (auth, email, password) {
  let succeed;

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      succeed = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      succeed = false;
    });
  return succeed
};


//login to user that already exists
const loginUser = async function (auth, email, password) {
  let succeed;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      succeed = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      succeed = false;
    });
  return succeed
};


//send update password email
const sendEmailUpdatePassword = async function (auth, email) {
  let succeed;

  await sendPasswordResetEmail(auth, email)
    .then(() => {
      succeed = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      succeed = false;
    });
  return succeed
};

module.exports = { createUser, loginUser, sendEmailUpdatePassword }