const { getAuth } = require("firebase/auth");
const { app } = require('./firebaseConfig.js');
const { createUser, loginUser, sendEmailUpdatePassword } = require('./manageLogin.js');

const auth = getAuth(app);

const createLoginPromise = (auth, email, password) => {
  return new Promise(async (resolve, reject) => {
    await loginUser(auth, email, password)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  })
};

const login = async function (email, password) {
  let resultado;

  await createLoginPromise(auth, email, password)
    .then(result => {
      console.log(result); //true or false
      resultado = result;
    })
    .catch(error => {
      console.log(error);
    });
  return resultado
};

const createUserPromise = (auth, email, password) => {
  return new Promise(async (resolve, reject) => {
    await createUser(auth, email, password)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const createNewUser = async function (email, password) {
  let resultado;

  await createUserPromise(auth, email, password)
    .then(result => {
      resultado = result; //true or false
    })
    .catch(error => {
      console.error(error);
    });
  return resultado
};

const sendEmailPromise = (auth, email) => {
  return new Promise(async (resolve, reject) => {
    await sendEmailUpdatePassword(auth, email)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  })
}

const sendEmailForgotPasswword = async function (email) {
  let resultado;

  await sendEmailPromise(auth, email)
    .then(result => {
      console.log(result);
      resultado = result;
    })
    .catch(error => {
      console.log(error);
    });
  return resultado
};

module.exports = { login, createNewUser, sendEmailForgotPasswword }