'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ProgramTraining } from '@/server/types'
import { DialogProps } from '@radix-ui/react-dialog'
import { Anchor } from './anchor'

type AnchorSheetProps = DialogProps & {
  feature: 'roughness' | 'breathiness'
  program: ProgramTraining
}

export function AnchorSheet({ feature, program, ...props }: AnchorSheetProps) {
  const initialLetter = feature === 'roughness' ? 'R' : 'S'

  return (
    <Sheet {...props}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <span className="text-sm">{initialLetter}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[85%]" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>
            {feature === 'roughness' ? 'Âncoras de rugosidade' : 'Âncoras de soprosidade'}
          </SheetTitle>
        </SheetHeader>
        <div className="h-[12px]" />
        <Anchor feature={feature} program={program} />
      </SheetContent>
    </Sheet>
  )
}
