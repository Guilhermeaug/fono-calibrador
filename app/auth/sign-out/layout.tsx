import * as React from 'react'

type LayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}
