import React, { ReactNode } from "react";

interface InfiniteLoopSliderProps {
  children: ReactNode;
  speed?: number;
}

const InfiniteLoopSlider = ({
  children,
  speed = 50,
}: InfiniteLoopSliderProps) => {
  return (
    <div className="flex w-full">
      <div className="relative flex w-full flex-col justify-start gap-y-4 overflow-hidden py-2">
        <div
          className="flex animate-scroll"
          style={
            {
              "--animation-duration": `${speed}s`,
            } as React.CSSProperties
          }
        >
          <div className="flex gap-4">{children}</div>
          <div className="flex gap-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteLoopSlider;
