import * as React from "react";
import { useLottie } from "lottie-react";

import Animation from "@/public/animations/sound-animation.json";

type Props = {
  play: () => void;
};

export function useAnimatedPlayer({ play }: Props) {
  const [clickedTimes, setClickedTimes] = React.useState(0);

  function resetClickedTimes() {
    setClickedTimes(0);
  }

  const {
    View,
    play: playAnimation,
    stop: stopAnimation,
    setSpeed,
  } = useLottie({
    animationData: Animation,
    loop: true,
    onClick: () => {
      setClickedTimes((prev) => prev + 1);

      stop();
      play();
      playAnimation();
    },
    style: {
      width: 40,
      cursor: "pointer",
    },
  });

  React.useEffect(() => {
    setSpeed(0.8);
    stopAnimation();
  }, []);

  return {
    View,
    playAnimation,
    stopAnimation,
    clickedTimes,
    resetClickedTimes
  };
}
