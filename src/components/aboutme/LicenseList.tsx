import { licenses, LicenseItem } from "../../data/licenses";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "../shared/ui";

const LicenseItemRenderer = ({ item }: { item: LicenseItem }) => {
  const hasSubItems = item.sub_items && item.sub_items.length > 0;
  return (
    <div className={`last:mb-0 ${hasSubItems ? "mb-10" : "mb-2"}`}>
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl sm:text-2xl font-semibold text-primary-dark dark:text-primary-light mb-1 inline-flex items-center gap-1 group"
        >
          <span className="group-hover:underline">{item.name}</span>
          <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ) : item.sub_items && item.sub_items.length > 0 ? (
        <p className="text-base text-primary-dark dark:text-primary-light leading-relaxed tracking-normal">
          {item.name}
        </p>
      ) : (
        <span className="text-xl sm:text-2xl font-semibold text-primary-dark dark:text-primary-light mb-1 block">
          {item.name}
        </span>
      )}

      {item.sub_items && item.sub_items.length > 0 && (
        <div className="mt-2 space-y-3">
          {item.sub_items.map((subItem) => (
            <LicenseItemRenderer key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

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
      {licenses.map((group, index) => (
        <AnimatedSection
          key={group.id}
          direction="up"
          duration={600}
          delay={index * 100}
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
            <div className="md:col-span-2">
              <p className="text-base lg:text-xl font-noto-serif-display italic mb-2 sticky top-24">
                {group.issuer}
              </p>
            </div>
            <div className="md:col-span-4 space-y-4">
              {group.items.map((item) => (
                <LicenseItemRenderer key={item.id} item={item} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
