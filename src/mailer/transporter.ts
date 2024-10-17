import nodemailer from "nodemailer";
import { getMailConfig } from "../config";

export const createTransporter = () => {
  const { nodemailer: config } = getMailConfig();

  const transporter = nodemailer.createTransport({
    ...config,
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
