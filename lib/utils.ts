import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const BASE_URL = process.env.NEXT_PUBLIC_DICTIONARY_API_BASE_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// All fetch functions