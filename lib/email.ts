import { Resend } from "resend";
import { isResendConfigured, siteUrl } from "@/lib/env";

const FROM = process.env.EMAIL_FROM ?? "UpStartMBA <onboarding@resend.dev>";

/**
 * Sends the post-signup welcome email. No-ops when RESEND_API_KEY is unset
 * and never throws — email failures must not break signup.
 */
export async function sendWelcomeEmail(to: string, name: string | null) {
  if (!isResendConfigured) return;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const firstName = name?.split(" ")[0] || "there";

    await resend.emails.send({
      from: FROM,
      to,
      subject: "Welcome to UpStartMBA 🚀",
      html: `
        <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1e293b;">
          <h1 style="font-size: 22px; color: #312e81;">Welcome aboard, ${firstName}!</h1>
          <p>You just took the first step toward landing a tech role. Here's how to get the most out of UpStartMBA:</p>
          <ol style="line-height: 1.8;">
            <li><strong>Browse the job board</strong> — curated tech roles where MBAs actually get hired.</li>
            <li><strong>Track every application</strong> — keep your pipeline organized from "saved" to "offer".</li>
            <li><strong>Read the playbooks</strong> — recruiting timelines, interview prep, and negotiation guides written for MBA candidates.</li>
          </ol>
          <p style="margin: 28px 0;">
            <a href="${siteUrl()}/dashboard" style="background: #312e81; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Go to your dashboard</a>
          </p>
          <p style="color: #64748b; font-size: 13px;">You're receiving this because you created an UpStartMBA account.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}
