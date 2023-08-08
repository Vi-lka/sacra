import {  clsx } from "clsx"
import type {ClassValue} from "clsx";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRegion(region: string) {
  switch (region) {
    case "Respublika_Tyva":
      return "Республика Тыва";
  
    case "Krasnoyarskij_kraj":
      return "Красноярский край";

    case "Respublika_Hakasiya":
      return "Республика Хакасия";
      
    default:
      break;
  }
}
