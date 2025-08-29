import { licenses } from "../../data/licenses";

export default function LicenseList() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {licenses.map((license) => (
        <div
          key={license.id}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start"
        >
          <div className="md:col-span-2">
            <h3 className="px-5 py-3 rounded-full border border-primary-gray/20 text-primary-gray dark:text-gray-300 bg-gray-100 dark:bg-primary-light/5">
              {license.date}
            </h3>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-xl sm:text-2xl font-semibold text-primary-dark dark:text-primary-light mb-3">
              {license.name}
            </h4>
            <p className="text-base lg:text-xl font-noto-serif-display italic mb-2">
              {license.issuer}
            </p>
            <p className="text-base text-primary-dark dark:text-primary-light leading-relaxed tracking-normal mb-4">
              {license.description}
            </p>
            {license.link && (
              <a
                href={license.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-blue hover:text-primary-blue/80 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-200 hover:scale-105"
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
      ))}
    </div>
  );
}
