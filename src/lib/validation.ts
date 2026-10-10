import { toBnDigits } from "./bn";

export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignUpValues extends SignInValues {
  name: string;
  confirmPassword: string;
}

/** Returns an error message, or null when everything is fine. */
export function validateSignIn({
  email,
  password,
}: SignInValues): string | null {
  if (!EMAIL_PATTERN.test(email.trim())) return "সঠিক ইমেইল ঠিকানা দিন।";
  if (password.length === 0) return "পাসওয়ার্ড লিখুন।";
  return null;
}

export function validateSignUp(values: SignUpValues): string | null {
  if (values.name.trim().length === 0) return "আপনার নাম লিখুন।";
  if (!EMAIL_PATTERN.test(values.email.trim())) return "সঠিক ইমেইল ঠিকানা দিন।";
  if (values.password.length < MIN_PASSWORD_LENGTH) {
    return `পাসওয়ার্ড কমপক্ষে ${toBnDigits(MIN_PASSWORD_LENGTH)} অক্ষরের হতে হবে।`;
  }
  if (values.password !== values.confirmPassword)
    return "পাসওয়ার্ড দুটি মিলছে না।";
  return null;
}

export const MAX_NAME_LENGTH = 60;

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length === 0) return "আপনার নাম লিখুন।";
  if (trimmed.length > MAX_NAME_LENGTH) {
    return `নাম সর্বোচ্চ ${toBnDigits(MAX_NAME_LENGTH)} অক্ষরের হতে পারবে।`;
  }
  return null;
}
