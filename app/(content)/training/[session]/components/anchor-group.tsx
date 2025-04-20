'use client'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ProgramTraining } from '@/server/types'
import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group'
import * as React from 'react'
import { Anchor } from './anchor'

type AnchorGroupProps = ToggleGroupSingleProps & {
  feature: 'roughness' | 'breathiness' | 'both'
  program: ProgramTraining
}

const getDefaultFeature = (feature: 'roughness' | 'breathiness' | 'both') => {
  if (feature === 'roughness') return 'roughness'
  if (feature === 'breathiness') return 'breathiness'
  return 'roughness'
}

export function AnchorGroup({ feature, program, ...props }: AnchorGroupProps) {
  const [value, setValue] = React.useState<'roughness' | 'breathiness'>(
    getDefaultFeature(feature),
  )

  function handleChange(value: 'roughness' | 'breathiness') {
    setValue(value)
  }

  const hasRoughnessFeature = feature === 'roughness' || feature === 'both'
  const hasBreathinessFeature = feature === 'breathiness' || feature === 'both'

  return (
    <div className="space-y-6">
      <ToggleGroup value={value} onValueChange={handleChange} {...props}>
        {hasRoughnessFeature && (
          <ToggleGroupItem
            value="roughness"
            aria-label="toggle roughness anchors"
            asChild
          >
            <Button variant="outline" className="rounded-full">
              Rugosidade
            </Button>
          </ToggleGroupItem>
        )}
        {hasBreathinessFeature && (
          <ToggleGroupItem
            value="breathiness"
            aria-label="toggle breathiness anchors"
            asChild
          >
            <Button variant="outline" className="rounded-full">
              Soprosidade
            </Button>
          </ToggleGroupItem>
        )}
      </ToggleGroup>
      <div>
        <Anchor feature={value} program={program} />
      </div>
    </div>
  )
}
