import { serviceIds } from "@/data/services";

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { name: 100, email: 254, subject: 150, message: 3000, messageMin: 10 } as const;

/** Shared by the browser form and the API route so both enforce identical rules. */
export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>): {
  data: ContactInput;
  errors: ContactErrors;
} {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: ContactInput = {
    name: str(input.name),
    email: str(input.email),
    subject: str(input.subject),
    service: str(input.service),
    message: str(input.message),
  };
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Please enter your full name.";
  else if (data.name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (!data.subject) errors.subject = "Please add a subject.";
  else if (data.subject.length > LIMITS.subject) errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;

  if (!data.service || !serviceIds.includes(data.service)) errors.service = "Please choose a service.";

  if (!data.message) errors.message = "Please write a message.";
  else if (data.message.length < LIMITS.messageMin)
    errors.message = `Message should be at least ${LIMITS.messageMin} characters.`;
  else if (data.message.length > LIMITS.message) errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return { data, errors };
}
