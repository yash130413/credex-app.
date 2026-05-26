import { resend } from "@/lib/resend";
import AuditReadyEmail, { type AuditReadyEmailProps } from "@/emails/audit-ready";

export type SendAuditEmailParams = AuditReadyEmailProps & { to: string };

export async function sendAuditEmail({ to, ...props }: SendAuditEmailParams): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Credex <onboarding@resend.dev>",
    to,
    subject: `Your AI spend audit is ready — ${props.auditTitle}`,
    react: AuditReadyEmail(props),
  });

  if (error) {
    console.error("[sendAuditEmail]", error);
  }
}
