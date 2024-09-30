import { type ClassValue, clsx } from "clsx"; // Importing the 'ClassValue' type and 'clsx' function from the 'clsx' library
import { twMerge } from "tailwind-merge"; // Importing 'twMerge' from 'tailwind-merge' to combine and merge Tailwind CSS classes

// 'cn' function to combine and merge CSS class names
// It accepts multiple class names (or arrays of class names) as input and returns a merged result
export function cn(...inputs: ClassValue[]) {
  // 'clsx' handles conditional class name generation, 
  // and 'twMerge' ensures that any conflicting Tailwind classes are merged correctly.
  return twMerge(clsx(inputs));
}
