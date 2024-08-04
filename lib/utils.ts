import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function explodeStrapiData(obj: any): any {
  if (
    obj &&
    typeof obj === "object" &&
    "data" in obj &&
    "attributes" in obj.data
  ) {
    return {
      id: obj.data.id,
      ...explodeStrapiData(obj.data.attributes),
    };
  } else if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = explodeStrapiData(obj[key]);
      }
    }
  }
  return obj;
}
