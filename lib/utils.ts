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

function explodeStrapiData(obj: any, includeMeta: boolean = false): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => explodeStrapiData(item, includeMeta))
  } else if (obj && typeof obj === 'object') {
    if ('data' in obj && Array.isArray(obj.data)) {
      const result = obj.data.map(({ id, attributes, meta, ...rest }: any) => ({
        id,
        ...rest,
        ...explodeStrapiData(attributes, includeMeta),
      }))

      if (includeMeta && 'meta' in obj) {
        return { data: result, meta: obj.meta }
      }

      return result
    } else if ('data' in obj && obj.data && 'attributes' in obj.data) {
      const { id, attributes, meta, ...rest } = obj.data

      const result = {
        id,
        ...rest,
        ...explodeStrapiData(obj.data.attributes, includeMeta),
      }

      if (includeMeta && 'meta' in obj.data) {
        return { ...result, meta: obj.data.meta }
      }

      return result
    } else {
      const result: any = {}
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = explodeStrapiData(obj[key], includeMeta)
        }
      }
      return result
    }
  }
  return obj
}

export { cn, explodeStrapiData, translateFeature }
