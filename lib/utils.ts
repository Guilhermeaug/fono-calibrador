import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function translateFeature(feature: string) {
  return {
    both: 'Rugosidade e Soprosidade',
    roughness: 'Rugosidade',
    breathiness: 'Soprosidade',
  }[feature]
}

function explodeStrapiData(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(explodeStrapiData)
  } else if (obj && typeof obj === 'object') {
    if ('data' in obj && Array.isArray(obj.data)) {
      return obj.data.map((item: any) => ({
        id: item.id,
        ...explodeStrapiData(item.attributes),
      }))
    } else if ('data' in obj && 'attributes' in obj.data) {
      return {
        id: obj.data.id,
        ...explodeStrapiData(obj.data.attributes),
      }
    } else {
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

export { cn, explodeStrapiData, translateFeature }
