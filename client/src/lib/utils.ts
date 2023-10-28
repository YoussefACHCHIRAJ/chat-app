import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date:Date){
  return new Date(date) < new Date(Date.now()) ? `${new Date(date).getHours()}:${new Date(date).getMinutes()}` : 
  `${new Date(date).getDay()}-${new Date(date).getMonth()} ${new Date(date).getHours()}:${new Date(date).getMinutes()}`
}