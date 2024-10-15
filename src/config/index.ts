import { MailerConfig } from "./types";

let mailConfig: MailerConfig | null = null;

export const initializeMailConfig = (config: MailerConfig) => {
  mailConfig = { ...config };
};

export const getMailConfig = (): MailerConfig => mailConfig as MailerConfig;
