import type { PriceChange, Product, Unit } from "@/types";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const BN_WEEKDAYS: Record<string, string> = {
  Sunday: "রবিবার",
  Monday: "সোমবার",
  Tuesday: "মঙ্গলবার",
  Wednesday: "বুধবার",
  Thursday: "বৃহস্পতিবার",
  Friday: "শুক্রবার",
  Saturday: "শনিবার",
};

export const UNIT_LABEL: Record<Unit, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const UNIT_SHORT: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

/** "1,290.5" -> "১,২৯০.৫" */
export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** "১,২৯০" -> 1290 (used when a price only exists as Bengali text) */
export function bnToNumber(text: string): number {
  const ascii = text
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, "");
  const n = Number(ascii);
  return Number.isNaN(n) ? 0 : n;
}

/** 148 -> "১৪৮", 1850 -> "১,৮৫০", 63.5 -> "৬৩.৫০" (matches Figma) */
export function formatPrice(value: number): string {
  const text = Number.isInteger(value)
    ? value.toLocaleString("en-US")
    : value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  return toBnDigits(text);
}

export function formatTaka(value: number): string {
  return `${formatPrice(value)} টাকা`;
}

/** -2.9 -> "২.৯%" */
export function formatPercent(pct: number): string {
  return `${toBnDigits(Math.abs(pct).toFixed(1))}%`;
}

export interface ChangeBadge {
  symbol: "▲" | "▼" | "—";
  text: string;
  dir: PriceChange["dir"];
}

/** Badge text such as "▲ ২.১%", "▼ ২.৯%", "— ০.০%" */
export function getChangeBadge(change: PriceChange): ChangeBadge {
  const symbol = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
  const pct = change.dir === "flat" ? 0 : change.pct;
  return { symbol, text: `${symbol} ${formatPercent(pct)}`, dir: change.dir };
}

/** "বুধবার, ৭ অক্টোবর, ২০২৬" (Dhaka time, same on server and client) */
export function getBanglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? "";
  const weekday = BN_WEEKDAYS[get("weekday")] ?? "";
  const month = BN_MONTHS[Number(get("month")) - 1] ?? "";
  return `${weekday}, ${toBnDigits(get("day"))} ${month}, ${toBnDigits(get("year"))}`;
}

/** "গতকালের তুলনায় আজ দাম বেড়েছে · ২ টাকা" */
export function getChangeSentence(product: Product): string {
  const diff = Math.abs(product.today - product.yesterday);
  if (product.change.dir === "up") {
    return `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatTaka(diff)}`;
  }
  if (product.change.dir === "down") {
    return `গতকালের তুলনায় আজ দাম কমেছে · ${formatTaka(diff)}`;
  }
  return "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
}
