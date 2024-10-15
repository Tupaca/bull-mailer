import nodemailer from "nodemailer";
import { getMailConfig } from "../config";

export const createTransporter = () => {
  const { nodemailer: config } = getMailConfig();

  const transporter = nodemailer.createTransport({
    ...config,
    auth: {
      user: config.auth?.user,
      pass: (config.auth as { pass: string }).pass,
    },
    pool: config.pool || true,
    secure: config.secure || false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify((error) => {
    if (error) {
      console.error("Nodemailer error", error);
    } else {
      console.info("🚀 Nodemailer Ready");
    }
  });

  return transporter;
};
