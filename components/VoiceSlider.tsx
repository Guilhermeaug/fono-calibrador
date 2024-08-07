import { Slider, SliderProps } from '@/components/ui/slider'

type Props = {
  showTooltip?: boolean
} & SliderProps

export function VoiceSlider({ ...props }: Props) {
  return (
    <div className="block w-full flex-grow">
      <div className="mb-2 flex justify-between text-xs">
        <span>0mm</span>
        <span>100mm</span>
      </div>
      <Slider {...props} />
    </div>
  )
}
