import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** ISO date string e.g. "2002-04-05" — age increases automatically after each birthday. */
export function calculateAge(
  birthDateIso: string,
  referenceDate: Date = new Date()
): number {
  const birth = new Date(birthDateIso + "T12:00:00");
  if (Number.isNaN(birth.getTime())) return 0;

  let age = referenceDate.getFullYear() - birth.getFullYear();
  const birthdayPassedThisYear =
    referenceDate.getMonth() > birth.getMonth() ||
    (referenceDate.getMonth() === birth.getMonth() &&
      referenceDate.getDate() >= birth.getDate());

  if (!birthdayPassedThisYear) age -= 1;
  return Math.max(0, age);
}
