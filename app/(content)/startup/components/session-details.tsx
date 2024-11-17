'use client'

import { TypographyLarge } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { SessionResults } from '@/server/types'
import { PlayIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { colors, status } from '../constants'

type Props = {
  session: SessionResults
  index: number
  numberOfSessions: number
}

export function SessionDetails({ session, index, numberOfSessions }: Props) {
  const router = useRouter()

  const statuses = {
    assessment: session.assessmentStatus,
    trainingRoughness: session.trainingRoughnessStatus,
    trainingBreathiness: session.trainingBreathinessStatus,
  }

  const isLastSession = index + 1 === numberOfSessions

  const content = React.useMemo(() => {
    const trainingRoughnessDescription = () => {
      if (statuses.assessment === 'READY' || statuses.assessment === 'WAITING') {
        return 'Status: Aguardando o término da avaliação'
      }
      return `Status: ${status[statuses.trainingRoughness]}`
    }

    const trainingBreathinessDescription = () => {
      if (statuses.assessment === 'READY' || statuses.assessment === 'WAITING') {
        return 'Status: Aguardando o término da avaliação'
      }
      return `Status: ${status[statuses.trainingBreathiness]}`
    }

    return {
      assessment: {
        title: 'Avaliação',
        description: `Status: ${status[statuses.assessment]}`,
        color: colors[statuses.assessment],
        onClick: () => {
          if (session.assessmentStatus === 'READY') {
            router.replace(
              `/startup/instructions/overview/assessment?session=${index + 1}`,
            )
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
            const feature = isLastSession ? 'both' : 'roughness'
            router.replace(
              `/startup/instructions/overview/training?feature=${feature}&session=${index + 1}`,
            )
          }
        },
        enabled: !isLastSession,
        onClickEnabled: statuses.trainingRoughness === 'READY',
      },
      trainingBreathiness: {
        title: 'Treinamento - Soprosidade',
        description: trainingBreathinessDescription(),
        color: colors[statuses.trainingBreathiness],
        onClick: () => {
          if (statuses.trainingBreathiness === 'READY') {
            const feature = isLastSession ? 'both' : 'breathiness'
            router.replace(
              `/startup/instructions/overview/training?feature=${feature}&session=${index + 1}`,
            )
          }
        },
        enabled: !isLastSession,
        onClickEnabled: statuses.trainingBreathiness === 'READY',
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
        enabled: isLastSession,
        onClickEnabled:
          statuses.trainingBreathiness === 'READY' &&
          statuses.trainingRoughness === 'READY',
      },
    }
  }, [
    index,
    isLastSession,
    router,
    session.assessmentStatus,
    statuses.assessment,
    statuses.trainingBreathiness,
    statuses.trainingRoughness,
  ])

  return (
    <React.Fragment>
      {Object.entries(content).map(([key, data]) => {
        if (!data.enabled) {
          return null
        }

        return (
          <div key={key} className="flex justify-between">
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
