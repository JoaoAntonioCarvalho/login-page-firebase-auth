const express = require('express');
const app = express();
const { login, createNewUser, sendEmailForgotPasswword } = require('../../auth/login.js');
const cors = require('cors');

app.use(cors());

app.get('/login', async (req, res) => {
  let email = req.query.email;
  let password = req.query.password;

  let data = await login(email, password)
  if (data) {
    res.status = 200;
    res.send({ logged: true });
    console.log('logado...')
  } else {
    res.status = 403;
    res.send({ logged: false });
    console.log('erro ao logar...')
  };
});

app.get('/createNewUser', async (req, res) => {
  let email = req.query.email;
  let password = req.query.password;

  let data = await createNewUser(email, password);
  if (data) {
    res.status = 200;
    res.send({ created: true });
  } else {
    res.status = 403;
    res.send({ created: false });
  };
});

app.get('/forgotPassword', async (req, res) => {
  let email = req.query.email;

  if (await sendEmailForgotPasswword(email)) {
    res.status = 200;
    res.send({ emailSent: true });
  } else {
    res.status = 403;
    res.send({ emailSent: false });
  };
});

app.get('/success', (req, res) => {
  res.send('Logado com sucesso! :)');
})

module.exports = { app }