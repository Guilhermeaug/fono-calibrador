"use client";

import * as React from "react";
import { TypographyP } from "@/components/typography";
import { ProgramTraining } from "@/server/types";
import { anchors } from "../constants";
import useSound from "use-sound";
import { useLottie } from "lottie-react";
import Animation from "@/public/animations/sound-animation.json";
import { min, max } from "simple-statistics";
import { STRAPI_URL } from "@/server/strapi";

type Props = {
  feature: "roughness" | "breathiness";
  program: ProgramTraining;
};

export function AnchorAside({
  feature,
  program: { roughnessAnchor, breathinessAnchor },
}: Props) {
  const anchorsData =
    feature === "roughness" ? roughnessAnchor : breathinessAnchor;

  return (
    <aside className="md:sticky">
      <div className="grid gap-4">
        {anchorsData.map((anchor) => {
          const values = anchor[feature];
          const [min, max] = [values[0], values[values.length - 1]];

          return (
            <div key={anchor.identifier} className="">
              <TypographyP>
                {anchors[anchor.identifier as keyof typeof anchors]}
              </TypographyP>
              <div className="flex items-center gap-4">
                <AudioButton url={anchor.file.url} />
                <span>
                  {min}mm - {max}mm
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function AudioButton({ url }: { url: string }) {
  const [play, { stop }] = useSound(`${STRAPI_URL}${url}`, {
    loop: true,
    interrupt: true,
  });

  const {
    View,
    play: playAnimation,
    stop: stopAnimation,
    setSpeed,
  } = useLottie({
    animationData: Animation,
    loop: true,
    onMouseEnter: () => {
      play();
      playAnimation();
    },
    onMouseLeave: () => {
      stop();
      stopAnimation();
    },
    style: {
      width: 40,
      cursor: "pointer",
    },
  });

  React.useEffect(() => {
    setSpeed(0.7);
    stopAnimation();
  }, []);

  return <>{View}</>;
}
