import nodemailer from "nodemailer";

const NOTIFY_TO = [
  "sales@magicworksitsolutions.com",
];

function makeTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendNotification(subject: string, html: string) {
  try {
    const transport = makeTransport();
    if (!transport) return; // SMTP not configured
    await transport.sendMail({
      from:    '"MagicWorks Website" <noreply@magicworksitsolutions.com>',
      to:      NOTIFY_TO.join(", "),
      subject,
      html,
    });
  } catch (err) {
    console.error("[email] sendNotification failed:", err);
  }
}
