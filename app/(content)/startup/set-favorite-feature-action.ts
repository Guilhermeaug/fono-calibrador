'use server'

import { STRAPI } from '@/server/strapi'

export async function setFavoriteFeatureAction(userProgressId: number, feature: string) {
  return STRAPI.setFavoriteFeature({ id: userProgressId, feature })
}
