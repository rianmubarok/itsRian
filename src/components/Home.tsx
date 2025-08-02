import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto mt-24 flex" role="main">
      <section className="flex gap-4 w-full">
        <article className="basis-2/3">
          <header className="flex items-center gap-4 mb-6">
            <figure className="w-[60px] h-[60px] rounded-full overflow-hidden">
              <Image
                src="/rian.jpg"
                alt="Rian - Visual Designer and Developer"
                width={60}
                height={60}
                className="w-full object-cover"
                priority
              />
            </figure>
            <p className="text-[32px]">Hey there, I'm Rian 👋</p>
          </header>
          <h1 className="text-6xl font-medium leading-snug tracking-tight">
            a visual designer exploring the intersection of design and
            development
          </h1>
        </article>

        <aside className="basis-1/3 flex items-end justify-end">
          <address className="text-right not-italic">
            <p className="text-sm text-gray-500 dark:text-gray-400">Based in</p>
            <p className="text-lg font-medium">Jepara, Indonesia</p>
          </address>
        </aside>
      </section>
    </main>
  );
}
