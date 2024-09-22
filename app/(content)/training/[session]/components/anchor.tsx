'use client'

import { TypographyP } from '@/components/typography'
import { VoiceSlider } from '@/components/VoiceSlider'
import Animation from '@/public/animations/sound-animation.json'
import { STRAPI_URL } from '@/server/strapi'
import { ProgramTraining } from '@/server/types'
import { useLottie } from 'lottie-react'
import * as React from 'react'
import useSound from 'use-sound'
import { anchors } from '../constants'

type Props = {
  feature: 'roughness' | 'breathiness'
  program: ProgramTraining
}

export function Anchor({
  feature,
  program: { roughnessAnchor, breathinessAnchor },
}: Props) {
  const anchorsData = feature === 'roughness' ? roughnessAnchor : breathinessAnchor

  return (
    <div className="max-w-[600px] flex-1">
      <div className="grid gap-4">
        {anchorsData.map((anchor) => {
          const values = anchor[feature]
          const [min, max] = [values[0], values[values.length - 1]]

          return (
            <div key={anchor.identifier}>
              <div className="flex items-center gap-4">
                <TypographyP>
                  {anchors[anchor.identifier as keyof typeof anchors]}
                </TypographyP>
                <AudioButton url={anchor.file.url} />
              </div>
              <div className="mt-3 flex w-full flex-1 flex-col items-center gap-4">
                <VoiceSlider
                  showTooltip={false}
                  showThumb={false}
                  value={[33, 22]}
                  max={100}
                  step={1}
                  markers={[min, max]}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AudioButton({ url }: { url: string }) {
  const [play, { stop }] = useSound(`${STRAPI_URL}${url}`, {
    loop: true,
    interrupt: true,
  })

  const {
    View,
    play: playAnimation,
    stop: stopAnimation,
    setSpeed,
  } = useLottie({
    animationData: Animation,
    loop: true,
    onMouseEnter: () => {
      play()
      playAnimation()
    },
    onMouseLeave: () => {
      stop()
      stopAnimation()
    },
    style: {
      width: 40,
      cursor: 'pointer',
    },
  })

  React.useEffect(() => {
    setSpeed(0.7)
    stopAnimation()
  }, [setSpeed, stopAnimation])

  return <>{View}</>
}
