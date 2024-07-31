import * as React from "react";
import { useLottie } from "lottie-react";

import Animation from "@/public/animations/sound-animation.json";

type Props = {
  play: () => void;
};

export function useAnimatedPlayer({ play }: Props) {
  const {
    View,
    play: playAnimation,
    stop: stopAnimation,
    setSpeed,
  } = useLottie({
    animationData: Animation,
    loop: true,
    onClick: () => {
      play();
      playAnimation();
    },
    style: {
      width: 60,
      margin: "0 auto",
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
  };
}
