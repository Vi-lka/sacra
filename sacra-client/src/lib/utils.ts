import {  clsx } from "clsx"
import type {ClassValue} from "clsx";
import { twMerge } from "tailwind-merge"
import type { ConfessionEnum } from "./schemas/strapi-schemas";
 
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



export function getConfession(confession: ConfessionEnum) {
  switch (confession) {
    case "Pravoslavie": return "Православие";
    case "Buddizm": return "Буддизм";
    case "Islam": return "Ислам";
    case "Katoliczizm": return "Католицизм";
    case "Lyuteranstvo": return "Лютеранство";
    case "Protestantizm": return "Протестантизм";
    case "Iudaizm": return "Иудаизм";
    case "Shamanizm": return "Шаманизм";
  }
}