'use client'

import { TypographyLarge } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { SessionResults } from '@/server/types'
import { isNil } from 'lodash'
import { PlayIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { colors, status } from '../constants'

type Props = {
  session: SessionResults
  index: number
  isOnLastSession: boolean
  favoriteFeature?: 'roughness' | 'breathiness'
}

export function SessionDetails({
  session,
  index,
  isOnLastSession,
  favoriteFeature,
}: Props) {
  const router = useRouter()

  const statuses = {
    assessment: session.assessmentStatus,
    trainingRoughness: session.trainingRoughnessStatus,
    trainingBreathiness: session.trainingBreathinessStatus,
  }

  const favoriteFeatureEquals = (feature: 'roughness' | 'breathiness') =>
    favoriteFeature === feature

  const isTrainingRoughnessOnClickEnabled =
    statuses.trainingRoughness === 'READY' &&
    (favoriteFeatureEquals('roughness') ||
      statuses.trainingBreathiness === 'DONE' ||
      isNil(favoriteFeature))
  const isTrainingBreathinessOnClickEnabled =
    statuses.trainingBreathiness === 'READY' &&
    (favoriteFeatureEquals('breathiness') ||
      statuses.trainingRoughness === 'DONE' ||
      isNil(favoriteFeature))

  const trainingRoughnessDescription = () => {
    if (statuses.assessment === 'READY' || statuses.assessment === 'WAITING') {
      return 'Status: Aguardando o término da avaliação'
    }
    if (statuses.trainingRoughness === 'READY' && !isTrainingRoughnessOnClickEnabled) {
      return 'Status: Aguardando o término do treinamento de soprosidade'
    }
    return `Status: ${status[statuses.trainingRoughness]}`
  }

  const trainingBreathinessDescription = () => {
    if (statuses.assessment === 'READY' || statuses.assessment === 'WAITING') {
      return 'Status: Aguardando o término da avaliação'
    }
    if (
      statuses.trainingBreathiness === 'READY' &&
      !isTrainingBreathinessOnClickEnabled
    ) {
      return 'Status: Aguardando o término do treinamento de rugosidade'
    }
    return `Status: ${status[statuses.trainingBreathiness]}`
  }

  const content = {
    assessment: {
      title: 'Avaliação',
      description: `Status: ${status[statuses.assessment]}`,
      color: colors[statuses.assessment],
      onClick: () => {
        if (session.assessmentStatus === 'READY') {
          router.replace(`/startup/instructions/overview/assessment?session=${index + 1}`)
        }
      },
      enabled: statuses.assessment !== 'NOT_NEEDED',
      onClickEnabled: statuses.assessment === 'READY',
    },
    trainingRoughness: {
      title: 'Treinamento - Rugosidade',
      description: trainingRoughnessDescription(),
      color: colors[statuses.trainingRoughness],
      onClick: () => {
        if (statuses.trainingRoughness === 'READY') {
          const feature = isOnLastSession ? 'both' : 'roughness'
          router.replace(
            `/startup/instructions/overview/training?feature=${feature}&session=${index + 1}`,
          )
        }
      },
      enabled: !isOnLastSession,
      onClickEnabled: isTrainingRoughnessOnClickEnabled,
    },
    trainingBreathiness: {
      title: 'Treinamento - Soprosidade',
      description: trainingBreathinessDescription(),
      color: colors[statuses.trainingBreathiness],
      onClick: () => {
        if (statuses.trainingBreathiness === 'READY') {
          const feature = isOnLastSession ? 'both' : 'breathiness'
          router.replace(
            `/startup/instructions/overview/training?feature=${feature}&session=${index + 1}`,
          )
        }
      },
      enabled: !isOnLastSession,
      onClickEnabled: isTrainingBreathinessOnClickEnabled,
    },
    trainingBoth: {
      title: 'Treinamento - Rugosidade e Soprosidade',
      description: ['DONE', 'NOT_NEEDED'].includes(statuses.assessment)
        ? `Status: ${status[statuses.trainingBreathiness]}`
        : 'Status: Aguardando o término da avaliação',
      color: colors[statuses.trainingBreathiness],
      onClick: () => {
        if (statuses.trainingBreathiness === 'READY') {
          const feature = 'both'
          router.replace(
            `/startup/instructions/overview/training?feature=${feature}&session=${index + 1}`,
          )
        }
      },
      enabled: isOnLastSession,
      onClickEnabled: statuses.trainingBreathiness === 'READY',
    },
  }

  return (
    <React.Fragment>
      {Object.entries(content).map(([key, data]) => {
        if (!data.enabled) {
          return null
        }

        return (
          <div className="flex justify-between">
            <div>
              <TypographyLarge className="text-lg font-bold">
                {data.title}
              </TypographyLarge>
              <p className={data.color}>{data.description}</p>
            </div>
            {data.onClickEnabled && (
              <Button
                className="flex-shrink-0"
                variant="outline"
                size="icon"
                onClick={data.onClick}
              >
                <PlayIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        )
      })}
    </React.Fragment>
  )
}
