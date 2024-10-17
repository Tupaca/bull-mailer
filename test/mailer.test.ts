import { sendEmail } from "../src/mailer";
import { enqueueEmail } from "../src/mailer/queue";

jest.mock("../src/mailer/queue");

describe("Mailer", () => {
  it("agregar un correo electrónico a la cola", async () => {
    const emailOptions = {
      to: "destinatario@example.com",
      from: '"Tupaca" <no-reply@example.com>',
      subject: "Asunto de prueba",
      text: "Mensaje de prueba",
      html: "<p>Mensaje de prueba</p>",
    };

    await sendEmail(emailOptions);

    expect(enqueueEmail).toHaveBeenCalledWith(emailOptions);
  });
});
