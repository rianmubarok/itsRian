import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me - itsRian",
  description: "Learn more about itsRian - a passionate developer and creator.",
};

export default function AboutMePage() {
  return (
    <main
      className="text-primary-dark dark:text-primary-light max-w-6xl mx-auto mt-48"
      role="main"
    >
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <h2 className="text-[32px] leading-tight font-regular text-primary-dark dark:text-primary-light md:col-span-2">
          Hello! Thank you for visiting my personal website.
        </h2>
        <p className="text-primary-gray font-regular text-lg md:col-span-3">
          I'm Rian, a passionate web developer and UI/UX enthusiast who thrives
          on turning ideas into clean, functional, and engaging digital
          experiences. Over the years, I've dedicated myself to understanding
          both the visual side of design and the logical side of development —
          bridging creativity and code.
        </p>
      </div>

      {/* Profile Section */}
      <div className="text-primary-gray font-regular text-lg space-y-4">
        <p>
          I specialize in building responsive websites and interactive user
          interfaces using technologies like JavaScript, TypeScript, React, and
          Tailwind CSS. On the backend, I’ve explored Node.js and Firebase for
          creating scalable, real-time applications. I also enjoy learning about
          full-stack workflows and staying updated with modern development tools
          and best practices.
        </p>
        <p>
          What drives me most is creating intuitive user experiences that not
          only look good but also solve real problems. I pay close attention to
          accessibility, performance, and maintainable code — because great
          interfaces should work well for everyone.
        </p>
        <p>
          In collaborative environments, I’m a good listener, proactive
          problem-solver, and open to feedback. Whether working in a team or
          independently, I always aim to deliver thoughtful, reliable solutions
          that align with project goals.
        </p>
        <p>
          I'm excited about future opportunities to collaborate and build
          purposeful, user-centered digital products.
        </p>
        <p>Best regards,</p>
        <h2 className="mt-15 font-sacramento-signature font-regular text-5xl text-primary-dark dark:text-primary-light">
          Rian
        </h2>
      </div>

      <hr className="border-t border-primary-gray/20 my-12" />

      {/* Experience */}
      <div className="text-primary-dark font-regular dark:text-primary-light grid grid-cols-1 md:grid-cols-6">
        <h2 className="text-2xl md:col-span-2">Okt 2023 - Present</h2>
        <div className="md:col-span-4">
          <h2 className="text-2xl mb-4">Mangun Creative, Icon Designer</h2>
          <div className="text-primary-gray text-lg space-y-4">
            <p className="text-sm font-light">
              1 Year, 9 Months • Part-time • Remote
            </p>
            <p>
              Started my creative journey in the world of design, focusing on
              consistent and scalable icon systems. This experience sharpened my
              visual precision and built a strong foundation for crafting
              functional and intuitive UI/UX as a developer.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
