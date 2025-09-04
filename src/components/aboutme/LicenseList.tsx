import { licenses } from "../../data/licenses";
import { AnimatedSection } from "../shared/ui";

export default function LicenseList() {
  if (licenses.length === 0) {
    return (
      <AnimatedSection direction="up" duration={600} delay={0}>
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No Licenses Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-300 max-w-sm mx-auto">
            I haven&apos;t added any licenses or certifications yet. Check back
            later for updates!
          </p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {licenses.map((license, index) => (
        <AnimatedSection
          key={license.id}
          direction="up"
          duration={600}
          delay={index * 100}
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
            <div className="md:col-span-2">
              <p className="text-base lg:text-xl font-noto-serif-display italic mb-2">
                {license.issuer}
              </p>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary-dark dark:text-primary-light mb-3">
                {license.name}
              </h3>
              {license.link && (
                <a
                  href={license.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5 transition-all duration-200"
                >
                  <span>View Certificate</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
