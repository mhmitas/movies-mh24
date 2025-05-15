import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getPlaiceholder } from "plaiceholder";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function formatDuration(minutes: number) {
  if (minutes <= 0) return '0m';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0 && remainingMinutes === 0) {
    return `${hours}h`;
  } else if (hours === 0 && remainingMinutes > 0) {
    return `${remainingMinutes}m`;
  } else {
    return `${hours}h ${remainingMinutes}m`;
  }
}
