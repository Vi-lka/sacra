import {  clsx } from "clsx"
import type {ClassValue} from "clsx";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function getMultiFilter(string: string) {
  let filter = "";

  const arrayFormString = string.split("_");

  arrayFormString.forEach((filterString) => {
    filter = filter + `"${filterString}",`;
  });

  return filter;
}