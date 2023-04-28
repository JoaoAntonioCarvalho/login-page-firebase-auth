let emailArea = document.getElementById("email-area");
let passwordArea = document.getElementById("password-area");
let submitButton = document.getElementById("submit-button");

function verifyValues(email, password) {
  if (email != '' && password != '') {
    return true;
  };
  return false;
};

async function login(email, password) {
  let status;
  let responseText = undefined;

  await fetch(`http://127.0.0.1:2340/login?email=${email}&password=${password}`)
    .then(async (response) => {
      responseText = await response.text();
      console.log(responseText);
      status = response.status
    })
    .catch((error) => {
      console.log(error);
      alert('Erro ao fazer login. (visivel no console)');
      status = 400;
    });
  return { status, responseText }
};

async function signUp(email, password) {
  let status;
  let responseText = undefined;

  await fetch(`http://127.0.0.1:2340/createNewUser?email=${email}&password=${password}`)
    .then(async (response) => {
      responseText = await response.text();
      console.log(responseText);
      status = response.status;
    })
    .catch((error) => {
      console.log(error);
      alert('Erro ao cadastrar usuario. (visivel no console)');
      status = 400;
    })
  return { status, responseText }
};

async function sendResetEmail(email) {
  let status;
  let responseText = undefined;

  await fetch(`http://127.0.0.1:2340/forgotPassword?email=${email}`)
    .then(async (response) => {
      responseText = await response.text();
      console.log(responseText);
      status = response.status;
    })
    .catch((error) => {
      console.log(error);
      alert('Erro ao enviar email. (visivel no console');
      status = 400;
    });
  return { status, responseText }
};

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let email = emailArea.value;
  let password = passwordArea.value;

  console.log(email, password)

  let isCorrect = verifyValues(email, password);
  if (isCorrect) {
    let data = await login(email, password);
    console.log(data)
    if (data.status == 200) {
      if (data.responseText != undefined) {
        let responseTextObj = JSON.parse(data.responseText);

        if (responseTextObj.logged) {
          //signed in successfully
          window.location.href = 'http://127.0.0.1:2340/success';
        } else {
          alert('Usuario ou senha incorreto');
        }
      } else {
        alert('Erro: response text = undefined')

      }
    } else {
      alert('Erro na request ' + data.status);
    };
  } else {
    alert('Erro: Email ou senha vazios');
  };

  emailArea.value = '';
  passwordArea.value = '';
});

let signUpHtml = `
  <form id="form-login">
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome" required>

  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email" required>

  <label for="senha">Senha:</label>
  <input type="password" id="senha" name="senha" minlength="6" required>

  <label for="confirmar-senha">Confirmar senha:</label>
  <input type="password" id="confirmar-senha" name="confirmar-senha" minlength="6" required>

  <button type="submit" id="cadastrar-button">Cadastrar</button>
  </form>
`;

let signUpLink = document.querySelector('.sign-up');

let signUpButton = document.getElementById("sign-up");
let loginForm = document.getElementById("form-login");
signUpButton.addEventListener('click', (event) => {
  event.preventDefault();

  loginForm.innerHTML = signUpHtml;
  signUpLink.setAttribute("style", "display:none;");
  sendEmailLink.setAttribute("style", "");

  let cadastrarButton = document.getElementById("cadastrar-button");
  cadastrarButton.addEventListener("click", (event) => {
    event.preventDefault();

    let nomeArea = document.getElementById("nome");
    let emailArea = document.getElementById("email");
    let passwordArea = document.getElementById("senha");
    let confirmPasswordArea = document.getElementById("confirmar-senha");

    let nome = nomeArea.value;
    let email = emailArea.value;
    let password = passwordArea.value;
    let confirmPassword = confirmPasswordArea.value;

    if (nome != '' && email != '' && password != '' && confirmPassword != '') {
      if (password == confirmPassword) {
        if (email.includes("@gmail.com")) {
          //cadastrar
          (async () => {
            let data = await signUp(email, password)

            if (data.status == 200) {
              if (data.responseText != undefined) {
                let responseTextObj = JSON.parse(data.responseText);

                if (responseTextObj.created) {
                  alert("cadastrado com sucesso");
                  window.location.href = 'http://127.0.0.1:2341/';
                } else {
                  alert("erro => email ja existe");
                }
              } else {
                alert("Erro: response text = undefined");
              }
            } else {
              alert("Erro na request " + data.status);
            };
          })();
        } else {
          alert("o email deve conter @gmail.com");
        };
      } else {
        alert("as senhas não são identicas");
      };
    } else {
      alert("valores vazios não são validos");
    };
  });
});



let sendEmailResetPassword = `
<form id="form-login">
  <label for="email">E-mail:</label>
  <input type="email" id="email" name="email" required>

  <button type="submit" id="enviar-link-button">Enviar link de redefinição de senha</button>
</form>
`;

let sendEmailLink = document.querySelector('.forgot-password');

let resetPasswordButton = document.getElementById('forgot-password-button');
resetPasswordButton.addEventListener('click', (event) => {
  event.preventDefault();

  loginForm.innerHTML = sendEmailResetPassword;
  sendEmailLink.setAttribute("style", "display:none;");
  signUpLink.setAttribute("style", "");

  let emailArea = document.getElementById("email");

  let buttonResetPassword = document.getElementById('enviar-link-button');
  buttonResetPassword.addEventListener("click", (event) => {
    event.preventDefault();

    let email = emailArea.value;

    if (email != '' && email.includes('@gmail.com')) {
      (async () => {
        let data = await sendResetEmail(email);

        if (data.status == 200) {
          if (data.responseText != undefined) {
            let responseTextObj = JSON.parse(data.responseText);

            if (responseTextObj.emailSent) {
              alert("email enviado com sucesso!");
              window.location.href = 'http://127.0.0.1:2341/';
            } else {
              alert("erro ao enviar email");
            }
          } else {
            alert("Erro: response text = undefined");
          }
        } else {
          alert("Erro na request " + data.status);
        };
      })();
    } else {
      alert('Erro: valor do email invalido');
    }
  });

});