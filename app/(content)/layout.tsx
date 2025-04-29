import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export default function ContentLayout({ children }: Props) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}
