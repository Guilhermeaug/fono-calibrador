'use client'

import { AudioButton } from '@/components/audio-button'
import { TypographyP } from '@/components/typography'
import { VoiceSlider } from '@/components/VoiceSlider'
import { STRAPI_URL } from '@/server/strapi'
import { ProgramTraining } from '@/server/types'
import * as React from 'react'
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
    <React.Fragment>
      {feature === 'roughness'
        ? 'Rugosidade (R): qualquer irregularidade perceptível durante a produção vocal.'
        : 'Soprosidade (B): qualquer escape de ar audível durante a produção vocal.'}
      <div className="h-[12px]" />
      <div className="grid gap-4">
        {anchorsData.map((anchor) => {
          const url = `${STRAPI_URL}${anchor.file.url}`
          const values = anchor[feature]
          const [min, max] = [values[0], values[values.length - 1]]

          return (
            <div key={anchor.identifier}>
              <div className="flex items-center gap-4">
                <TypographyP>
                  {anchors[anchor.identifier as keyof typeof anchors]}
                </TypographyP>
                <AudioButton
                  src={url}
                  className="size-10"
                  iconClassName="size-5"
                  showStatus={false}
                />
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
    </React.Fragment>
  )
}
