const MESSAGES = new Map<string, string>([
  ["INVALID_EMAIL_OR_PASSWORD", "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।"],
  ["USER_ALREADY_EXISTS", "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।"],
  [
    "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
    "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।",
  ],
  ["INVALID_EMAIL", "সঠিক ইমেইল ঠিকানা দিন।"],
  ["PASSWORD_TOO_SHORT", "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"],
  ["PASSWORD_TOO_LONG", "পাসওয়ার্ড অনেক বড় হয়ে গেছে।"],
  ["PROVIDER_NOT_FOUND", "এই লগইন পদ্ধতি এখনো চালু করা হয়নি।"],
]);

interface AuthErrorLike {
  code?: string;
}

export function getAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
  fallback: string,
): string {
  return (error?.code && MESSAGES.get(error.code)) || fallback;
}
