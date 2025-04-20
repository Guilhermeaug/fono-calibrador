'use client'

import { cn } from '@/lib/utils'
import { Pause, Play } from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

type AudioButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'asChild' | 'variant' | 'size' | 'onClick'
> & {
  audioName?: string
  src: string
  canPause?: boolean
  iconClassName?: string
  showStatus?: boolean
  onClick?: () => void
}

export const AudioButton = React.forwardRef<HTMLAudioElement, AudioButtonProps>(
  (
    {
      src,
      audioName,
      onClick,
      className,
      iconClassName,
      canPause = true,
      showStatus = true,
      ...props
    },
    forwardedRef,
  ) => {
    const internalRef = React.useRef<HTMLAudioElement>(null)
    const ref = (forwardedRef || internalRef) as React.RefObject<HTMLAudioElement>

    const [isPlaying, setIsPlaying] = React.useState(false)

    function togglePlayback() {
      if (!ref.current) return

      if (isPlaying && canPause) {
        ref.current.pause()
      } else {
        ref.current.play().catch((error) => {
          console.error('Audio playback failed:', error)
          toast.error(
            'Erro ao reproduzir o áudio. Verifique se o navegador está permitindo a reprodução.',
          )
        })
      }

      if ((isPlaying && canPause) || !isPlaying) {
        onClick?.()
      }
    }

    React.useEffect(() => {
      const audio = ref.current
      if (!audio) return

      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => setIsPlaying(false)

      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
      }
    }, [])

    const style = cn(
      'size-20 rounded-full border-2 transition-all duration-300',
      {
        'border-secondary hover:border-primary hover:bg-secondary': !isPlaying,
        'border-primary bg-accent shadow-inner': isPlaying,
      },
      className,
    )
    const iconStyle = cn('size-10 fill-primary text-primary', iconClassName)

    return (
      <React.Fragment>
        <audio ref={ref} src={src} preload="auto" />
        <Button
          onClick={togglePlayback}
          variant="outline"
          size="icon"
          className={style}
          {...props}
        >
          {isPlaying && canPause ? (
            <Pause className={iconStyle} />
          ) : (
            <Play className={iconStyle} />
          )}
          <span className="sr-only">
            {isPlaying && canPause ? 'Pausar' : 'Tocar'} voice {audioName || 'sound'}
          </span>
        </Button>
        {showStatus && (
          <div className="mt-3 h-5 text-sm font-medium">
            {isPlaying && <span className="animate-pulse text-primary">Tocando...</span>}
          </div>
        )}
      </React.Fragment>
    )
  },
)
