import { Children, ReactNode } from "react";

interface VerticalLoopSliderProps {
  children: ReactNode;
  isReverse?: boolean;
  gap?: number;
}

export default function VerticalLoopSlider({
  children,
  isReverse = false,
  gap = 6,
}: VerticalLoopSliderProps) {
  const items = Children.toArray(children);
  return (
    <div
      className="w-fit animate-looping-vertical"
      style={{ animationDirection: isReverse ? "reverse" : "normal" }}
    >
      <div className="flex flex-col items-center" style={{ gap }}>
        {items}
        {items}
      </div>
    </div>
  );
}
