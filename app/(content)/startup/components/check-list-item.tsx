import { CheckIcon, ClockIcon, PlayIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { CheckListItemType } from '../helpers'

const icons = {
  READY: PlayIcon,
  WAITING_TIME: ClockIcon,
  UNAVAILABLE: XIcon,
  DONE: CheckIcon,
}

const colors = {
  READY: 'bg-amber-500 dark:bg-amber-700',
  WAITING_TIME: 'bg-yellow-500 dark:bg-yellow-700',
  UNAVAILABLE: 'bg-gray-300 dark:bg-gray-700',
  DONE: 'bg-green-500 dark:bg-green-700',
}

export function CheckListItem({
  text,
  status,
  canClickIf,
  href: hrefProp,
}: CheckListItemType) {
  const bgColor = colors[status]
  const Icon = icons[status]
  const href = canClickIf ? hrefProp : '#'

  return (
    <li className={`${bgColor} rounded-md `}>
      <Link href={href}>
        <div className="flex items-center gap-3 p-2">
          <div className="">
            <Icon className="h-6 w-6" />
          </div>
          <div className={`md:text-center`}>
            <span>{text}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}
