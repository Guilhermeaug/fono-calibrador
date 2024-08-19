'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  enableStartPack: boolean
  startPacLink: string
}

export function Buttons({ enableStartPack, startPacLink }: Props) {
  const router = useRouter()

  return (
    <div className="mx-auto grid grid-cols-2 place-content-center gap-4 py-8">
      <Button
        className="uppercase"
        disabled={enableStartPack}
        onClick={() => router.push(startPacLink)}
      >
        Iniciar pac
      </Button>
      <Button asChild>
        <Link className="uppercase" href="end">
          Termo de Conclusão PAC
        </Link>
      </Button>
    </div>
  )
}
