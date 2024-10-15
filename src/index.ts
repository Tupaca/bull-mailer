import { MailerConfig } from "./config/types";

import { initializeMailConfig } from "./config";
import { sendEmail } from "./mailer/index";

const initializeMailer = (config: MailerConfig) => {
  initializeMailConfig(config);
}

export { initializeMailer, sendEmail };
