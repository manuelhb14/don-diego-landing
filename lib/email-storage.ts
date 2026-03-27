const EMAIL_KEY = "virtual_staging_email";

export function getStoredEmail() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(EMAIL_KEY);
}

export function setStoredEmail(email: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EMAIL_KEY, email);
}
