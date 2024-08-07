'use client'

import { Button } from '@/components/ui/button'
import * as React from 'react'
import { toast } from 'sonner'
import useSound from 'use-sound'

import { useAnimatedPlayer } from '@/hooks/use-animated-player'
import { sounds } from '../constants'

function AudioForm({
  sound: { path, answer },
}: {
  sound: {
    path: string
    answer: string
  }
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

export function AdjustmentForm() {
  return (
    <section className="flex gap-2">
      {sounds.map((sound) => (
        <AudioForm key={sound.path} sound={sound} />
      ))}
    </section>
  )
}
