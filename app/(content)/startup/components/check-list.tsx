import { UserInfo, UserProgress } from '@/server/types'
import { getItems } from '../helpers'
import { CheckListItem } from './check-list-item'

type Props = {
  userInfo: UserInfo
  progress: UserProgress
}

export function CheckList({ userInfo, progress }: Props) {
  return (
    <div className="place-content-center gap-2 grid list-none">
      {getItems(userInfo, progress).map((item, index) => (
        <CheckListItem key={index} {...item} />
      ))}
    </div>
  )
}
