import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - itsRian",
  description:
    "Get in touch with itsRian. Let's work together or just say hello!",
};

export default function ContactPage() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        {/* Header */}
        <div className="md:col-span-2 space-y-8 mb-12">
          <h2 className="text-[32px] leading-tight font-regular text-primary-dark dark:text-primary-light ">
            Feel free to reach out — always open for creative discussions
          </h2>

          {/* Contact Info */}
          <div className="text-primary-gray text-sm font-light">
            <p>Avg. Response: Within 1–2 hours (Working Hours, GMT+7).</p>
            <p>For urgent matters, reach out via social media.</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-primary-gray">
            <a
              href="https://www.linkedin.com/in/rianmubarok/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            >
              Linkedin
            </a>
            <a
              href="https://dribbble.com/fitrianmubarok"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            >
              Dribbble
            </a>
            <a
              href="https://www.instagram.com/m.fitrianm_/"
              className="hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
          <form className="space-y-12" autoComplete="off">
            <div>
              <label
                htmlFor="name"
                className="block text-2xl font-regular text-primary-dark dark:text-primary-light mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full text-[32px] font-regular text-primary-dark bg-transparent border-b-1 border-primary-gray focus:border-primary-dark dark:focus:border-primary-light transition-colors duration-300 placeholder-primary-gray"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-2xl font-regular text-primary-dark dark:text-primary-light mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full text-[32px] font-regular text-primary-dark bg-transparent border-b-1 border-primary-gray focus:border-primary-dark dark:focus:border-primary-light transition-colors duration-300 placeholder-primary-gray"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-2xl font-regular text-primary-dark dark:text-primary-light mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={1}
                className="w-full text-[32px] font-regular text-primary-dark bg-transparent border-b-1 border-primary-gray focus:border-primary-dark dark:focus:border-primary-light transition-colors duration-300 placeholder-primary-gray"
                placeholder="Tell me about your project or just say hello!"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 hover:px-8 transition-all duration-300 bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark rounded-full text-base font-medium cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
