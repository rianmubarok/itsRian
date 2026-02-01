import { education } from "../../data/education";
import { AnimatedSection } from "../shared/ui";

export default function EducationList() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start"
        >
          <div className="md:col-span-2">
            <h3 className="px-5 py-3 rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5">
              {edu.period}
            </h3>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-xl sm:text-2xl font-semibold text-primary-dark dark:text-primary-light mb-3">
              {edu.degree}
            </h4>
            <p className="text-base lg:text-xl font-noto-serif-display italic mb-2">
              {edu.institution}
            </p>
            <p className="text-sm text-primary-gray dark:text-gray-300 mb-3 sm:mb-4 tracking-normal">
              {edu.location}
            </p>
            <p className="text-base text-primary-dark dark:text-primary-light leading-relaxed tracking-normal">
              {edu.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
