import { resend } from "@/lib/resend";
import LeadWelcomeEmail, { type LeadWelcomeEmailProps } from "@/emails/lead-welcome";

export type SendLeadEmailParams = LeadWelcomeEmailProps & { to: string };

export async function sendLeadEmail({ to, ...props }: SendLeadEmailParams): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Credex <onboarding@resend.dev>",
    to,
    subject: "Welcome to Credex — you're on the list",
    react: LeadWelcomeEmail(props),
  });

  if (error) {
    console.error("[sendLeadEmail]", error);
  }
}
