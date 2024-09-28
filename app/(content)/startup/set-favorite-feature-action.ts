'use server'

import { STRAPI } from '@/server/strapi'

export async function setFavoriteFeature(userProgressId: number, feature: string) {
  return STRAPI.setFavoriteFeature({ id: userProgressId, feature })
}
