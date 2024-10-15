# @tupaca/mailer

Este proyecto es un servicio de envío de correos electrónicos utilizando Nodemailer y Redis.

## Instalación

```sh
npm install @tupaca/mailer
```

```sh
yarn add @tupaca/mailer
```

## Scripts
```sh
build: Compila el proyecto TypeScript.
start: Inicia el proyecto.
test: Ejecuta las pruebas.
```

## Inicializacion
import { initializeMailer } from "@tupaca/mailer";

```js
const config: MailerConfig = {
  nodemailer: {
    host: "smtp.example.com",
    port: 587,
    auth: {
      user: "user@example.com",
      pass: "password",
    },
  },
  redis: {
    path: "redis://localhost:6379",
    port: 6379,
  },
};

initializeMailer(config);
```

## Envio de mail
```js
import { sendEmail } from "./src/mailer";
import { EmailOptions } from "./src/types";

const emailOptions: EmailOptions = {
  to: "destinatario@example.com",
  from: "remitente@example.com",
  subject: "Asunto del correo",
  text: "Contenido del correo",
  html: "<p>Contenido del correo</p>",
};

sendEmail(emailOptions);
```


Este `README.md` proporciona una visión general del proyecto, cómo instalarlo, configurarlo y usarlo. Puedes ajustarlo según tus necesidades específicas.
