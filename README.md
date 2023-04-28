
# Login page using firebase auth

Uma página de login completa usando express para criar e manusear api e servidores, e usando firebase para autenticar, criar e redefinir senhas de usuarios.

![login]('/images_README/login-page.png')
![reset-password]('/images_README/reset-password.png')
![sign-up]('/images_README/sign-up.png')



## Demonstração

Crie um projeto no firebase (https://firebase.google.com/docs/web/setup?hl=pt-br) e pegar as informações concedidas pelo firebase relativas ao seu app. Essas informações devem ser colocadas no auth/firebaseConfig.js.
Lembre-se, na hora de criar não adicione o google analytics para seu app e selecione Web APP.

Para abrir os servidores, no console, entre na pasta onde está o projeto e digite:
```
npm start
```

O link para a sua pagina irá aparecer no console:

![console]('./images_README/console-1.png')

Ao fazer isso, vá para a url indicada e você estará pronto para usar normalmente a pagina de login.

A comunicação é toda feita por alert() na propria pagina de login.


## Autores

- [João Carvalho](https://github.com/JoaoAntonioCarvalho/)

