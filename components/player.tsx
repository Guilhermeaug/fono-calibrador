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

  const videoUrl = process.env.NEXT_PUBLIC_STRAPI_URL + '/uploads/video_explicativo_9c3a44d980.mp4'

  return (
    <div className="relative mx-auto my-6 h-[300px] max-w-[600px]">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
      />
    </div>
  )
}
