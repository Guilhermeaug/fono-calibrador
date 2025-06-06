'use client'

import * as React from 'react'
import ReactPlayer from 'react-player'

export function Player() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative mx-auto my-3">
      <ReactPlayer
        url="/videos/video_explicativo.mp4"
        width="100%"
        height="100%"
        controls
      />
    </div>
  )
}
