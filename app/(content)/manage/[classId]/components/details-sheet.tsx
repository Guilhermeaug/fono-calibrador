'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { AdditionalData } from '@/server/types'
import dayjs from 'dayjs'
import { cloneDeep, isEmpty } from 'lodash'
import { usePathname, useRouter } from 'next/navigation'
import { translations } from '../../constants'

type Props = {
  userDetails?: AdditionalData
}

export function DetailsSheet({ userDetails }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  function handleOpenChange(open: boolean) {
    if (open === false) {
      router.push(pathname)
    }
  }

  return (
    <Sheet defaultOpen onOpenChange={handleOpenChange}>
      <SheetContent className="flex min-w-[500px] max-w-[50vw] flex-col">
        <SheetHeader>
          <SheetTitle>Detalhes do usuário</SheetTitle>
        </SheetHeader>
        <SheetDescription />
        <div className="overflow-y-auto">
          <UserDetails userDetails={userDetails} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

type UserDetailsProps = {
  userDetails?: AdditionalData
}

function UserDetails({ userDetails }: UserDetailsProps) {
  const details = cloneDeep(userDetails)!
  details.birthDate = dayjs(userDetails!.birthDate).format('DD/MM/YYYY')

  return (
    <div className="grid gap-1 text-base font-normal capitalize">
      {Object.entries(details).map(([key, value]) => {
        const translatedKey = translations[key as keyof AdditionalData]
        if (!translatedKey) {
          return null
        }

        if (typeof value === 'string') {
          if (isEmpty(value)) {
            return null
          }

          const isMultiple = value.includes(';')
          if (isMultiple) {
            return (
              <div key={key} className="grid grid-cols-2 gap-3">
                <p className="">{translatedKey}</p>
                <div>
                  {value.split(';').map((v, i) => (
                    <p key={i}>{v}</p>
                  ))}
                </div>
              </div>
            )
          } else {
            return (
              <div key={key} className="grid grid-cols-2 gap-3">
                <p>{translatedKey}</p>
                <p>{value}</p>
              </div>
            )
          }
        } else if (typeof value === 'boolean') {
          return (
            <div key={key} className="grid grid-cols-2 gap-3">
              <p>{translatedKey}</p>
              <p>{value ? 'Sim' : 'Não'}</p>
            </div>
          )
        } else {
          return null
        }
      })}
    </div>
  )
}
