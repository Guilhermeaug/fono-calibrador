'use server'

import { STRAPI } from "@/server/strapi"

export async function sendEmailTemplate(to: string, data: Record<string, any>, templateReferenceId: number) {
    await STRAPI.sendEmailTemplate({
        to,
        data,
        templateReferenceId
    })
}