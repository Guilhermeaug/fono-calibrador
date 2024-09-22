import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function translateFeature(feature: string) {
  return {
    both: 'Rugosidade e Soprosidade',
    roughness: 'Rugosidade',
    breathiness: 'Soprosidade',
  }[feature]
}

export function explodeStrapiData(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(explodeStrapiData)
  } else if (obj && typeof obj === 'object') {
    if ('data' in obj && Array.isArray(obj.data)) {
      // Handle array of objects with data and attributes
      return obj.data.map((item: any) => ({
        id: item.id,
        ...explodeStrapiData(item.attributes),
      }))
    } else if ('data' in obj && 'attributes' in obj.data) {
      // Handle single object with data and attributes
      return {
        id: obj.data.id,
        ...explodeStrapiData(obj.data.attributes),
      }
    } else {
      // Handle other objects (recursively explode nested objects)
      const result: any = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = explodeStrapiData(obj[key])
        }
      }
      return result
    }
  }
  return obj
}

