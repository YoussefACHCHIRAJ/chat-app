import { MessageTypes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const msgDate = new Date(date);
  const now = new Date();
  const hours = String(msgDate.getHours()).padStart(2, "0");
  const minutes = String(msgDate.getMinutes()).padStart(2, "0");

  if (isSameDay(now, msgDate)) return `${hours}:${minutes}`;
  
  const day = String(msgDate.getDate()).padStart(2, "0");
  const month = String(msgDate.getMonth()).padStart(2, "0");
  return `${day}/${month} ${hours}:${minutes}`;
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}


export function messageShouldDisplay(message:MessageTypes, currentReceiver:string, currentUser: string){
  const {receiverId, senderId} = message;
  return (receiverId === currentReceiver && senderId === currentUser) || (receiverId === currentUser && senderId === currentReceiver)
}
