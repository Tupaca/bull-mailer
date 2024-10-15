import { emailQueue, enqueueEmail } from "../src/mailer/queue";
import { createTransporter } from "../src/mailer/transporter";

jest.mock("bull");
jest.mock("../src/mailer/transporter");

describe("Email Queue Tests", () => {
  let mockAdd: jest.Mock;
  let mockProcess: jest.Mock;
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    mockAdd = jest.fn();
    mockProcess = jest.fn();
    mockSendMail = jest.fn().mockResolvedValue({ messageId: "123" });

    (emailQueue.add as jest.Mock) = mockAdd;
    (emailQueue.process as jest.Mock) = mockProcess;
    (createTransporter as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add an email to the queue", async () => {
    const emailOptions = {
      to: "test@example.com",
      from: "no-reply@example.com",
      subject: "Test Email",
      text: "Test",
      html: "<p>Test</p>",
    };

    await enqueueEmail(emailOptions);

    expect(mockAdd).toHaveBeenCalledTimes(1);
    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "test@example.com",
        from: "no-reply@example.com",
        subject: "Test Email",
        text: "Test",
        html: "<p>Test</p>",
      }),
      expect.objectContaining({
        attempts: Number.MAX_SAFE_INTEGER,
        backoff: { type: "exponential", delay: 60000 },
      })
    );
  });

  it("should process an email and send it via transporter", async () => {
    const job = {
      data: {
        to: "user@example.com",
        from: "no-reply@example.com",
        subject: "Hello",
        text: "Test Email",
        html: "<p>Hello</p>",
      },
    };

    mockProcess.mockImplementationOnce(async (jobProcessor) => {
      await jobProcessor(job);
    });

    await emailQueue.process(async (job) => {
      const transporter = createTransporter();
      const { to, from, subject, text, html } = job.data;
      await transporter.sendMail({ from, to, subject, text, html });
    });

    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith({
      from: "no-reply@example.com",
      to: "user@example.com",
      subject: "Hello",
      text: "Test Email",
      html: "<p>Hello</p>",
    });
  });

});
