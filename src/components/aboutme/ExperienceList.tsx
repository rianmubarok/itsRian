import { experiences } from "../../data/experiences";
import { calculateDurationFromPeriod } from "../../utils";
import { AnimatedSection } from "../shared/ui";

export default function ExperienceList() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {experiences.map((experience, index) => (
        <AnimatedSection
          key={experience.id}
          direction="up"
          duration={600}
          delay={index * 100}
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
            <div className="md:col-span-2">
              <h3 className="px-5 py-3 rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5">
                {experience.period}
              </h3>
            </div>
            <div className="md:col-span-4">
              <h4 className="text-xl sm:text-2xl font-semibold text-primary-dark dark:text-primary-light mb-3">
                {experience.title}
              </h4>
              <p className="text-base lg:text-xl font-noto-serif-display italic mb-2">
                {experience.company}
              </p>
              <p className="text-sm text-primary-gray dark:text-gray-300 mb-3 sm:mb-4 tracking-normal">
                {calculateDurationFromPeriod(experience.period)} •{" "}
                {experience.type} • {experience.location}
              </p>
              <p className="text-base text-primary-dark dark:text-primary-light leading-relaxed tracking-normal">
                {experience.description}
              </p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
