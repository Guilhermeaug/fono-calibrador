'use client'

import { Button } from '@/components/ui/button'
import * as React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'

import { useAnimatedPlayer } from '@/hooks/use-animated-player'
import { useRouter, useSearchParams } from 'next/navigation'
import { sounds } from '../constants'

export function AdjustmentForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [done, setDone] = React.useState(sounds.map(() => false))

  const isDone = done.every((value) => value)

  return (
    <React.Fragment>
      <section className="flex gap-2">
        {sounds.map((sound, index) => (
          <AudioForm
            key={sound.path}
            onSuccessSubmit={() => {
              setDone((prev) => prev.map((value, i) => (i === index ? true : value)))
            }}
            sound={sound}
          />
        ))}
      </section>
      <div className="h-[30px]" />
      <Button
        className="mx-auto block"
        disabled={!isDone}
        size="lg"
        onClick={() => {
          const step = searchParams.get('step')
          const session = searchParams.get('session')
          const feature = searchParams.get('feature')

          const pathName = `/${step}/${session}${feature ? `?feature=${feature}` : ''}`
          router.push(pathName)
        }}
      >
        Continuar
      </Button>
    </React.Fragment>
  )
}

function AudioForm({
  sound: { path, answer },
  onSuccessSubmit,
}: {
  sound: {
    path: string
    answer: string
  }
  onSuccessSubmit: () => void
}) {
  const [disabled, setDisabled] = React.useState(false)

  const [play] = useSound(path, {
    onend: () => {
      stopAnimation()
    },
  })

  const { View, stopAnimation } = useAnimatedPlayer({ play })

  function submit(value: string) {
    if (value === answer) {
      toast.success('Correto. Continue com os próximos testes.')
      setDisabled(true)
      onSuccessSubmit()
    } else {
      toast.warning('Incorreto. Continue ajustando o volume do seu fone.')
    }
  }

  return (
    <div className="flex flex-grow flex-col space-y-4">
      <div className="mx-auto">{View}</div>
      <div className="grid flex-shrink gap-2">
        <Button disabled={disabled} variant="outline" onClick={() => submit('Apito')}>
          Apito
        </Button>
        <Button disabled={disabled} variant="outline" onClick={() => submit('Flauta')}>
          Flauta
        </Button>
        <Button disabled={disabled} variant="outline" onClick={() => submit('Sino')}>
          Sino
        </Button>
      </div>
    </div>
  )
}
