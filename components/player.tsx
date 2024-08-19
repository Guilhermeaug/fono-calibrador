'use client'

import * as React from 'react'
import ReactPlayer from 'react-player'

export function Player() {
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <div className="relative max-w-[600px] h-[300px] mx-auto my-6">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=VrynkWnFKpA"
        width="100%"
        height="100%"
        controls
      />
    </div>
  )
}
