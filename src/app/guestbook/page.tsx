import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestbook - itsRian",
  description:
    "Leave a message in my digital guestbook. Share your thoughts, feedback, or just say hello!",
};

export default function GuestbookPage() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        {/* Header */}
        <div className="md:col-span-2 space-y-8 mb-12">
          <h2 className="text-[32px] leading-tight font-regular text-primary-dark dark:text-primary-light ">
            Leave whatever you like to say, suggestions, questions or anything!
          </h2>

          <div className="text-primary-gray text-sm font-light">
            <p>Please sign in to start. Don't worry, your data is safe.</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-primary-gray"></div>
        </div>

        <div className="md:col-span-3">
          <div className="space-y-4">
            {/* Sample messages - in a real app, these would come from a database */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-primary-dark dark:text-primary-light">
                  Sarah Chen
                </h3>
                <span className="text-sm text-primary-gray">Dec 15, 2024</span>
              </div>
              <p className="text-primary-gray">
                Love your portfolio! The design is so clean and modern. Really
                inspiring work. Keep it up! 👏
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-primary-dark dark:text-primary-light">
                  Alex Rodriguez
                </h3>
                <span className="text-sm text-primary-gray">Dec 12, 2024</span>
              </div>
              <p className="text-primary-gray">
                Great projects! I especially liked the blog section. Would love
                to collaborate on something sometime.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-primary-dark dark:text-primary-light">
                  Emma Wilson
                </h3>
                <span className="text-sm text-primary-gray">Dec 10, 2024</span>
              </div>
              <p className="text-primary-gray">
                Your tech stack choices are spot on! Really enjoyed reading your
                blog posts about Next.js and React.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-primary-dark dark:text-primary-light">
                  Mike Johnson
                </h3>
                <span className="text-sm text-primary-gray">Dec 8, 2024</span>
              </div>
              <p className="text-primary-gray">
                Awesome portfolio! The dark mode toggle is a nice touch. Clean
                and professional design.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button className="text-primary-dark dark:text-primary-light hover:opacity-80 transition-opacity">
              Load More Messages
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
