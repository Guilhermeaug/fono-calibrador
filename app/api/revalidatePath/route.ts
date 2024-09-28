import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type Data = {
  path: string
  type?: 'layout' | 'page'
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = (await request.json()) as Data
  revalidatePath(body.path, body.type || 'page')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
