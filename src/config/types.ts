import { RedisOptions } from "ioredis";

export interface TransportOptions {
  host?: string;
  port?: number;
  secure?: boolean;
  auth: {
    type?: string;
    user: string;
    pass: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
  };
  pool?: boolean;
  maxConnections?: number;
  maxMessages?: number;
  rateLimit?: number;
  service?: string;
}

export interface MailerConfig {
  nodemailer: TransportOptions;
  redis: RedisOptions;
}
