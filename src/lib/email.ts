import nodemailer from "nodemailer";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "kazammaj@gmail.com";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error("EMAIL_NOT_CONFIGURED");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const safeName = name.replace(/[\r\n\0<>]/g, "").trim().slice(0, 120);
  const safeEmail = email.replace(/[\r\n\0<>]/g, "").trim().slice(0, 254);
  const safeMessage = message.replace(/\0/g, "").trim().slice(0, 5000);

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to: TO_EMAIL,
    replyTo: `"${safeName}" <${safeEmail}>`,
    subject: `Portfolio message from ${safeName}`,
    text: [
      `You received a new message from your portfolio website.`,
      ``,
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      ``,
      `Message:`,
      safeMessage,
      ``,
      `— Reply directly to this email to reach ${safeName}.`,
    ].join("\n"),
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;color:#0f172a">
        <p style="margin:0 0 16px;font-size:14px;color:#64748b">New message from your portfolio</p>
        <h2 style="margin:0 0 20px;font-size:20px;color:#0891b2">From: ${escapeHtml(safeName)}</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          <tr>
            <td style="padding:8px 0;font-weight:600;width:80px;vertical-align:top">Name</td>
            <td style="padding:8px 0">${escapeHtml(safeName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;vertical-align:top">Email</td>
            <td style="padding:8px 0">
              <a href="mailto:${escapeHtml(safeEmail)}" style="color:#0891b2">${escapeHtml(safeEmail)}</a>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 8px;font-weight:600">Message</p>
        <p style="margin:0;padding:16px;background:#f1f5f9;border-radius:8px;white-space:pre-wrap;line-height:1.6">${escapeHtml(safeMessage)}</p>
        <p style="margin:24px 0 0;font-size:12px;color:#94a3b8">Reply to this email to respond to the sender.</p>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
