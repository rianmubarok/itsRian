"use client";

import React, { memo, useEffect, useState } from "react";
import InfiniteLoopSlider from "./InfiniteLoopSlider";
import { STACKS } from "../../../constants";

const Tag = memo(
  ({ icon, title }: { icon: React.ReactElement; title: string }) => (
    <div className="mr-2 sm:mr-3 flex w-max items-center gap-2 rounded-full border border-primary-gray/20 bg-gray-100 px-5 py-2 text-[15px] dark:bg-primary-light/5">
      {icon}
      <span>{title}</span>
    </div>
  )
);

Tag.displayName = "Tag";

const Skills = () => {
  const [shuffledSkills, setShuffledSkills] = useState<
    Array<[string, React.ReactElement]>
  >([]);

  useEffect(() => {
    const skillsArray = Object.entries(STACKS);
    const shuffledArray = [...skillsArray].sort(() => Math.random() - 0.5);
    setShuffledSkills(shuffledArray);
  }, []);

  const sliders = Array.from({ length: 2 }, (_, index) => {
    const sliderSkills = [...shuffledSkills].sort(() => Math.random() - 0.5);
    return (
      <InfiniteLoopSlider key={index} isReverse={index === 1}>
        {sliderSkills.map(([title, icon], itemIndex) => (
          <Tag key={`${title}-${itemIndex}`} icon={icon} title={title} />
        ))}
      </InfiniteLoopSlider>
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex w-full">
        <div className="relative flex w-full flex-col justify-start gap-y-3 sm:gap-y-4 overflow-hidden py-2">
          {sliders}
          <div className="pointer-events-none absolute inset-0 z-10 flex justify-between">
            {/* Left fade */}
            <div className="w-[100px] sm:w-[150px] md:w-[200px] bg-gradient-to-r from-primary-light to-transparent dark:from-primary-dark dark:to-transparent" />
            {/* Right fade */}
            <div className="w-[100px] sm:w-[150px] md:w-[200px] bg-gradient-to-l from-primary-light to-transparent dark:from-primary-dark dark:to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
