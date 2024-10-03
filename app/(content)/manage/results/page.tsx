import { computateAssessmentsMeanScores } from '@/components/charts/helpers'
import { MeanScoresChart } from '@/components/charts/mean-scores'
import { TypographyH2, TypographyH4 } from '@/components/typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { STRAPI } from '@/server/strapi'
import { AudioResult, Result, SessionResults as SessionResultsType } from '@/server/types'
import { redirect } from 'next/navigation'
import * as React from 'react'
import { ExportButton } from '../components/export-button'

type Props = {
  searchParams: {
    id?: number
    name?: string
  }
}

export default async function ManageUserResultsPage({
  searchParams: { id, name },
}: Props) {
  if (!id || !name) {
    redirect('/manage')
  }

  const userProgress = await STRAPI.getUserResults({
    programId: 1,
    userId: id,
  })

  const areResultsEmpty = userProgress.sessions.every(
    (session) =>
      !session.trainingBreathinessResults &&
      !session.trainingRoughnessResults &&
      !session.assessmentBreathinessResults &&
      !session.assessmentRoughnessResults,
  )

  const chartData = computateAssessmentsMeanScores(userProgress.sessions)

  return (
    <main className="container mx-auto py-2">
      <div className="flex justify-between">
        <TypographyH2>{name}</TypographyH2>
        <ExportButton ids={[id]}>Exportar dados</ExportButton>
      </div>
      <div className="h-[30px]" />
      {areResultsEmpty ? (
        <TypographyH4>Não há resultados para exibir</TypographyH4>
      ) : (
        <React.Fragment>
          <Accordion type="multiple">
            {userProgress.sessions.map((session, index) => (
              <SessionResults key={session.id} session={session} index={index} />
            ))}
          </Accordion>
          <div className="h-[40px]" />
          <MeanScoresChart chartData={chartData} />
        </React.Fragment>
      )}
    </main>
  )
}

type TableType = {
  data: Result
}

function SessionResultTable({ data }: TableType) {
  function sortAudiosByIdentifier(a: AudioResult, b: AudioResult) {
    return a.identifier.localeCompare(b.identifier)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Tempo</TableHead>
          <TableHead>N°Ten.</TableHead>
          <TableHead>N°Audios</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.audios.sort(sortAudiosByIdentifier).map((audio) => (
          <TableRow key={audio.id}>
            <TableCell>{audio.identifier}</TableCell>
            <TableCell>{audio.score}</TableCell>
            <TableCell>{audio.duration}</TableCell>
            <TableCell>{audio.numberOfAttempts}</TableCell>
            <TableCell>{audio.numberOfAudioClicks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

type SessionResultsProps = {
  session: SessionResultsType
  index: number
}

function SessionResults({ session, index }: SessionResultsProps) {
  const hasResults = Boolean(
    session.trainingBreathinessResults ||
      session.trainingRoughnessResults ||
      session.assessmentBreathinessResults ||
      session.assessmentRoughnessResults,
  )

  if (!hasResults) {
    return null
  }

  return (
    <AccordionItem key={session.id} value={String(index)}>
      <AccordionTrigger>Sessão {index + 1}</AccordionTrigger>
      <AccordionContent>
        {session.trainingBreathinessResults && (
          <div className="space-y-2">
            <TypographyH4>Treinamento de Soprosidade</TypographyH4>
            <SessionResultTable data={session.trainingBreathinessResults} />
          </div>
        )}
        {session.trainingRoughnessResults && (
          <div className="space-y-2">
            <TypographyH4>Treinamento de Rugosidade</TypographyH4>
            <SessionResultTable data={session.trainingRoughnessResults} />
          </div>
        )}
        {session.assessmentBreathinessResults && (
          <div className="space-y-2">
            <TypographyH4>Avaliação de Soprosidade</TypographyH4>
            <SessionResultTable data={session.assessmentBreathinessResults} />
          </div>
        )}
        {session.assessmentRoughnessResults && (
          <div className="space-y-2">
            <TypographyH4>Avaliação de Rugosidade</TypographyH4>
            <SessionResultTable data={session.assessmentRoughnessResults} />
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
