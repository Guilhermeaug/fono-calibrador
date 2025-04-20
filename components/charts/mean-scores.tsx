'use client'

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

const chartConfig = {
  roughness: {
    label: 'Rugosidade',
    color: 'hsl(var(--chart-1))',
  },
  breathiness: {
    label: 'Soprosidade',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

type Props = {
  chartData: { session: string; roughness: number | null; breathiness: number | null }[]
}

export function MeanScoresChart({ chartData }: Props) {
  return (
    <ChartContainer config={chartConfig} className='max-h-[500px] mx-auto' >
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
        <XAxis dataKey="session" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartLegend content={<ChartLegendContent />} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="roughness"
          type="monotone"
          stroke="var(--color-roughness)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="breathiness"
          type="monotone"
          stroke="var(--color-breathiness)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
