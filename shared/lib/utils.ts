import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertIdFields = (obj: any): any => {
  if (!obj) return obj;
  
  const result = { ...obj };
  
  if ('id' in result && typeof result.id === 'string') {
    result.id = Number(result.id);
  }
  
  return result;
};
