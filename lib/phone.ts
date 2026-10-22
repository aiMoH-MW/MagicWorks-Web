/**
 * Phone validation shared by the landing-page form (client) and /api/leads (server).
 *
 * Accepts:
 *  - Indian mobiles: 10 digits starting 6-9, optionally prefixed +91, 91 or 0
 *    (spaces, dashes, dots and brackets are ignored)
 *  - International numbers written with a leading + (8 to 15 digits, E.164)
 * Rejects everything else, plus obvious junk such as 9999999999 or 1234567890.
 */

export const PHONE_ERROR =
  "Please enter a valid 10-digit mobile number (or include your country code, e.g. +971...).";

/** Returns a cleaned number (+91XXXXXXXXXX or +<intl>) or null if invalid. */
export function normalizePhone(raw: string): string | null {
  const input = (raw ?? "").trim();
  if (!input) return null;
  if (/[^\d\s+().-]/.test(input)) return null; // letters or odd symbols

  const hasPlus = input.startsWith("+");
  const digits = input.replace(/\D/g, "");

  if (hasPlus && !digits.startsWith("91")) {
    // International number
    if (digits.length < 8 || digits.length > 15) return null;
    if (/^(\d)\1+$/.test(digits)) return null;
    return `+${digits}`;
  }

  // Indian number: strip 91 / 0 prefix
  let national = digits;
  if (national.length === 12 && national.startsWith("91")) national = national.slice(2);
  else if (national.length === 11 && national.startsWith("0")) national = national.slice(1);

  if (!/^[6-9]\d{9}$/.test(national)) return null;
  if (/^(\d)\1{9}$/.test(national)) return null; // 9999999999
  if (["9876543210", "1234567890", "9123456789"].includes(national)) return null;
  return `+91${national}`;
}

export function isValidPhone(raw: string): boolean {
  return normalizePhone(raw) !== null;
}
