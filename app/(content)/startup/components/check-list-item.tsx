import { CheckIcon, ClockIcon, PlayIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { CheckListItemType } from '../helpers'

const icons = {
  READY: PlayIcon,
  WAITING: ClockIcon,
  UNAVAILABLE: XIcon,
  DONE: CheckIcon,
  INVALID: XIcon,
}

const colors = {
  READY: 'bg-green-500 dark:bg-green-700',
  WAITING: 'bg-yellow-500 dark:bg-yellow-700',
  UNAVAILABLE: 'bg-gray-500 dark:bg-gray-700',
  DONE: 'bg-blue-500 dark:bg-blue-700',
  INVALID: 'bg-red-500 dark:bg-red-700',
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
    <li className={`${bgColor} text-white rounded-md `}>
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
