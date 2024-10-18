import { RedisOptions } from "ioredis";
import { Options } from "nodemailer/lib/smtp-pool";

export interface MailerConfig {
  nodemailer: Options;
  redis: RedisOptions;
}
