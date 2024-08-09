import { items } from '../constants'
import { CheckListItem } from './check-list-item'

export function CheckList() {
  return (
    <div className="grid list-none place-content-center gap-2">
      {items.map((item, index) => (
        <CheckListItem key={index} {...item} />
      ))}
    </div>
  )
}
