'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { redirect } from 'next/navigation'

type Props = {} & React.ComponentPropsWithoutRef<typeof Sheet>

export function ProgressSheet({ ...props }: Props) {
  function handleOpenChange(open: boolean) {
    if (open === false) {
      redirect('/startup')
    }
  }

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange} {...props}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Progresso no programa</SheetTitle>
          <SheetDescription>
            Acompanhe por aqui o seu progresso no programa de treinamento. Verifique os itens
            pendentes ou que estão bloqueados.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
