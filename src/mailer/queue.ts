import Bull from "bull";
import { createTransporter } from "./transporter";
import { EmailOptions } from "../types";
import { getMailConfig } from "../config";

const REDIS_URL = getMailConfig()?.redis.path;
const REDIS_PORT = getMailConfig()?.redis.port;

export const emailQueue = new Bull<EmailOptions>("emailQueue", {
  redis: { port: REDIS_PORT, host: REDIS_URL },
});

const logPendingJobs = async () => {
  try {
    const pendingJobs = await emailQueue.getJobs([
      "waiting",
      "active",
      "delayed",
    ]);
    console.info(`Email Queue has ${pendingJobs.length} job(s) in the queue:`);

    pendingJobs.forEach(({ data }) => {
      const { subject, to } = data;

      console.info(`- To: ${to} - Subject: "${subject}"`);
    });
  } catch (error) {
    console.error("[Email Queue] Error fetching pending jobs:", error);
  }
};

logPendingJobs();

emailQueue.process(async (job) => {
  try {
    const transporter = createTransporter();
    const { to, from, subject, text, html } = job.data;
    let info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    });
    console.info("Correo enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar correo:", error);
    throw error;
  }
});

emailQueue.on("completed", ({ data }) => {
  const { subject, to } = data;

  console.info(`[EmailQueue - OK] - To: ${to} - Subject: "${subject}"`);
});

emailQueue.on("failed", ({ data, attemptsMade }, error) => {
  const { subject, to } = data;

  const attempt = attemptsMade || 0;

  console.error(
    `[EmailQueue - FAIL #${attempt}] - To: ${to} - Subject: "${subject}", Error:`,
    error
  );
});

emailQueue.on("error", (error) => {
  console.error("[Email Queue] Error:", error);
});

export const enqueueEmail = async (
  { to, from, subject, text, html }: EmailOptions
) => {
  await emailQueue.add(
    { to, from, subject, text, html },
    {
      attempts: Number.MAX_SAFE_INTEGER,
      backoff: {
        type: "exponential",
        delay: 60000,
      },
    }
  );
};
