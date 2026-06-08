const NOTIFY_TO = [
  "mohan@magicworksitsolutions.com",
  "swapnil@magicworksitsolutions.com",
  "krutika.jigyasi@magicworksitsolutions.com",
];

export async function sendNotification(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // silently skip if not configured
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MagicWorks Website <noreply@magicworksitsolutions.com>",
        to: NOTIFY_TO,
        subject,
        html,
      }),
    });
  } catch {
    // email is non-critical — never block the main response
  }
}
