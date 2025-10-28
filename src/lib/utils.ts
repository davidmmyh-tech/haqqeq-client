import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsedDate(date?: string | null) {
  const stringData = date || '';
  return new Date(stringData).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDuration(sec: number | null) {
  if (sec == null || !isFinite(sec)) return '--:--';
  const s = Math.floor(sec);
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

export function remote(route: string) {
  return `${BASE_URL}/${route}`;
}

export function isHere(to: string, location: string) {
  if (to === '/' && location === '/') return true;
  return to !== '/' && decodeURIComponent(location).includes(to);
}
