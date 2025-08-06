import React, { JSX, memo, useEffect, useState } from "react";
import InfiniteLoopSlider from "./InfiniteLoopSlider";
import { STACKS } from "../../../constants";

const Tag = memo(({ icon, title }: { icon: JSX.Element; title: string }) => (
  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
    {icon}
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {title}
    </span>
  </div>
));

Tag.displayName = "Tag";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const stackEntries = Object.entries(STACKS);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <InfiniteLoopSlider speed={50}>
        {stackEntries.map(([title, icon]) => (
          <Tag key={title} icon={icon} title={title} />
        ))}
      </InfiniteLoopSlider>
    </div>
  );
};

export default Skills;
