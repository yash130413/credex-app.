import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const integrationSchema = z.object({
  provider: z.enum(["openai", "anthropic", "gemini", "cohere", "mistral", "custom"]),
  apiKey: z.string().min(10, "API key appears too short"),
  label: z.string().min(1, "Label is required").max(50),
});

export const auditSchema = z.object({
  name: z.string().min(1, "Audit name is required").max(100),
  providerId: z.string().min(1, "Select a provider"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export const leadCaptureSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  company: z.string().min(1, "Company name is required").max(100),
  role: z.string().min(1, "Select your role"),
  teamSize: z.string().min(1, "Select your team size"),
  // Honeypot field — must always be empty. Validated server-side via isHoneypotTripped().
  // Included here so Zod doesn't strip it before the route handler can inspect it.
  website: z.string().optional(),
});

// LeadCaptureInput excludes the honeypot from the form type — the field is
// registered directly in the form component and never part of business logic.
export type LeadCaptureInput = Omit<z.infer<typeof leadCaptureSchema>, "website"> & {
  website?: string;
};

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type IntegrationInput = z.infer<typeof integrationSchema>;
export type AuditInput = z.infer<typeof auditSchema>;
