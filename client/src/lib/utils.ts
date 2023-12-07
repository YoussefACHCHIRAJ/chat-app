import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, parseISO } from 'date-fns';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function humanTime(time: string){

  const parsedDate = parseISO(time);
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
  
  return timeAgo;
  
}