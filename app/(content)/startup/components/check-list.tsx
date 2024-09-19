import { UserInfo, UserProgress } from '@/server/types'
import { generateChecklistItems } from '../helpers'
import { CheckListItem } from './check-list-item'

type Props = {
  userInfo: UserInfo
  progress: UserProgress
}

export function CheckList({ userInfo, progress }: Props) {
  return (
    <div className="grid list-none place-content-center gap-2">
      {generateChecklistItems(userInfo, progress).map((item, index) => (
        <CheckListItem key={index} {...item} />
      ))}
    </div>
  )
}
