import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type Data = {
  tags: string[]
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = (await request.json()) as Data
  for (const tag of body.tags) {
    revalidateTag(tag)
  }

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
