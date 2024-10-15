import { EmailOptions } from "../types";
import { enqueueEmail } from "./queue";

export const sendEmail = ({ to, from, subject, text, html }: EmailOptions) =>
  enqueueEmail({ to, from, subject, text, html });
