import { Blog } from "../types";

export const blogs: Blog[] = [
  {
    id: 1,
    title: "How I Combine Visual Design and Frontend Code in Real Projects",
    slug: "combine-design-and-code",
    description:
      "A story about building UI that looks good and works well. From Figma to production.",
    tags: ["design", "frontend", "uiux"],
    content: {
      en: `
In real projects, the handoff between design and development can feel disconnected. That's why I decided to become fluent in both visual design and frontend code. 

I usually start with wireframes or low-fidelity designs in Figma. Once the layout and flow make sense, I gradually move to high-fidelity visuals with consistent spacing, colors, and typography. After the design phase, I directly translate the visuals into React components, often using Tailwind CSS for utility-first styling.

The benefit of doing both is that I understand the limitations and opportunities from both sides. I know when to adjust a design for performance, or when to write better code for a clearer UI. It saves time, reduces back-and-forth, and improves consistency.

This workflow may not be for everyone, but for indie makers or designer-devs like me, it creates a more fluid creative process.
      `,
      id: `
Dalam proyek nyata, proses antara desain dan pengembangan sering terasa terpisah. Karena itu aku memutuskan untuk menguasai keduanya — desain visual dan frontend code.

Biasanya aku mulai dari wireframe atau desain low-fidelity di Figma. Setelah alurnya jelas, aku lanjut ke visual yang lebih detail dengan konsistensi pada spasi, warna, dan tipografi. Setelah selesai, aku langsung menerjemahkan desain tersebut ke dalam React components, biasanya pakai Tailwind CSS.

Keuntungannya adalah aku tahu batasan dan peluang dari dua sisi. Aku tahu kapan harus menyesuaikan desain demi performa, atau kapan menulis kode yang lebih rapi untuk tampilan yang lebih jelas. Ini menghemat waktu, meminimalkan revisi, dan bikin hasilnya lebih konsisten.

Workflow ini mungkin nggak cocok untuk semua orang, tapi buat indie maker atau designer-dev kayak aku, ini bikin proses kreatif jadi lebih mengalir.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-07-20",
    viewCount: "1.2k",
    readingTime: "5 min",
  },
  {
    id: 2,
    title: "Why Every Designer Should Learn Basic HTML & CSS",
    slug: "designer-learn-html-css",
    description:
      "Understanding the basics of HTML & CSS helps designers communicate better with developers.",
    tags: ["design", "html", "css"],
    content: {
      en: `
Learning the basics of HTML and CSS doesn't mean you have to become a developer — but it does mean you'll be a more effective designer.

When you understand how the web works behind the scenes, you'll be more realistic in your designs. You'll know what's easy to implement, what's harder, and how to communicate your ideas clearly to developers.

It also opens up prototyping possibilities. Imagine being able to bring your ideas to life in the browser without waiting on someone else. That's a superpower for any modern designer.

Even if you only use it occasionally, the ability to tweak layouts or understand dev terms will help you work faster and more collaboratively.
      `,
      id: `
Belajar HTML dan CSS dasar bukan berarti kamu harus jadi developer — tapi kamu akan jadi desainer yang lebih efektif.

Dengan memahami cara kerja web di balik layar, kamu akan lebih realistis saat mendesain. Kamu tahu mana yang mudah diimplementasikan, mana yang sulit, dan bisa menyampaikan ide ke developer dengan lebih jelas.

Ini juga membuka peluang untuk prototyping langsung di browser. Bayangin bisa ngehidupin ide sendiri tanpa nungguin orang lain. Itu adalah superpower buat desainer modern.

Meskipun jarang digunakan, kemampuan memahami struktur layout atau istilah coding akan mempercepat kerjamu dan bikin kerja tim lebih solid.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-07-25",
    viewCount: "856",
    readingTime: "3 min",
  },
  {
    id: 3,
    title: "Building My Personal Website from Scratch — Lessons Learned",
    slug: "build-portfolio-from-scratch",
    description:
      "What I learned while designing, coding, and launching my own website as a designer-dev.",
    tags: ["portfolio", "nextjs", "personal"],
    content: {
      en: `
Creating my personal website wasn't just about showing my work — it became a journey of self-discovery and skill sharpening.

I started with defining my goals: I wanted it to reflect both my design and dev skills, and feel truly personal. I sketched ideas on paper, then built the layout in Figma. After that, I dove into Next.js for the frontend, using static generation and dynamic routing to keep things fast and flexible.

What I learned: don't over-design early. Build and iterate. Also, write content early — waiting until the end made it harder to match tone with design.

Most importantly, ship it. It'll never be perfect, but it will be a snapshot of who you are now — and that's enough.
      `,
      id: `
Membangun website portofolio bukan cuma soal pamer karya — tapi juga perjalanan mengenal diri sendiri dan mengasah skill.

Aku mulai dari tujuan: menampilkan skill desain dan dev, sekaligus terasa personal. Aku buat sketsa di kertas dulu, lalu desain layout-nya di Figma. Setelah itu, aku pakai Next.js untuk frontend, dengan static generation dan dynamic routing biar cepat dan fleksibel.

Yang aku pelajari: jangan kebanyakan desain di awal. Mending langsung bangun dan iterasi. Juga, tulis konten sejak awal — nunggu sampai akhir malah bikin tone-nya sulit nyatu sama desain.

Yang paling penting: luncurkan aja. Nggak akan pernah sempurna, tapi cukup jadi cerminan dirimu saat ini — dan itu sudah cukup.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-07-28",
    viewCount: "2.1k",
    readingTime: "7 min",
  },
  {
    id: 4,
    title: "Designing Icons That Are Simple, Consistent, and Functional",
    slug: "designing-functional-icons",
    description:
      "A breakdown of my icon design workflow and tips for creating practical icon sets.",
    tags: ["icon", "design", "workflow"],
    content: {
      en: `
Icon design might look easy — but crafting icons that are consistent, scalable, and meaningful is a whole different challenge.

I start with understanding the purpose of each icon. Who will use it? In what context? Then I sketch rough shapes, aiming for clarity over complexity. Once I'm happy with the base idea, I digitize them using vector tools like Figma or Illustrator.

Simplicity is key. I stick to a consistent stroke width, corner radius, and spacing. Then, I export multiple versions: glyph, outline, duotone, and sometimes colored.

The most satisfying part is seeing people use them in real projects — that's when I know they work.
      `,
      id: `
Desain ikon kelihatannya mudah — tapi membuat ikon yang konsisten, scalable, dan bermakna adalah tantangan tersendiri.

Aku mulai dari memahami tujuan ikon. Siapa yang akan pakai? Di konteks apa? Lalu aku bikin sketsa bentuk dasarnya, dengan prinsip kejelasan lebih penting daripada kompleksitas. Setelah itu baru aku digitalkan pakai alat vektor seperti Figma atau Illustrator.

Simpel itu kunci. Aku jaga konsistensi stroke, radius, dan spasi. Lalu ekspor beberapa versi: glyph, outline, duotone, dan kadang warna.

Bagian paling memuaskan adalah saat lihat orang pakai ikonnya di proyek mereka — berarti desainku bekerja.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-08-01",
    viewCount: "1.5k",
    readingTime: "4 min",
  },
  {
    id: 5,
    title: "The Future of Web Development: What's Next in 2025",
    slug: "future-web-development-2025",
    description:
      "Exploring emerging technologies and trends that will shape the web development landscape in 2025 and beyond.",
    tags: ["webdev", "trends", "future"],
    content: {
      en: `
The web development landscape is evolving at an unprecedented pace. As we approach 2025, several key trends are emerging that will fundamentally change how we build and deploy web applications.

Artificial Intelligence and Machine Learning are becoming integral parts of web development. From AI-powered code generation to intelligent user interfaces, developers are leveraging these technologies to create more sophisticated and personalized experiences.

WebAssembly (WASM) is gaining traction as a way to run high-performance code in browsers. This technology enables developers to write code in languages like Rust, C++, and Go, then compile it to run at near-native speeds in the browser.

The rise of edge computing is transforming how we think about application architecture. By moving computation closer to users, we can achieve lower latency and better performance, especially for global applications.

These trends, combined with the continued evolution of frameworks like React, Vue, and Angular, are creating exciting opportunities for developers to build faster, more efficient, and more engaging web applications.
      `,
      id: `
Landscape pengembangan web berkembang dengan kecepatan yang belum pernah terjadi sebelumnya. Saat kita mendekati 2025, beberapa tren kunci muncul yang akan mengubah fundamental cara kita membangun dan men-deploy aplikasi web.

Artificial Intelligence dan Machine Learning menjadi bagian integral dari pengembangan web. Dari generasi kode berbasis AI hingga antarmuka pengguna yang cerdas, developer memanfaatkan teknologi ini untuk menciptakan pengalaman yang lebih canggih dan personal.

WebAssembly (WASM) semakin populer sebagai cara menjalankan kode berperforma tinggi di browser. Teknologi ini memungkinkan developer menulis kode dalam bahasa seperti Rust, C++, dan Go, kemudian mengkompilasinya untuk berjalan dengan kecepatan mendekati native di browser.

Kemunculan edge computing mengubah cara kita berpikir tentang arsitektur aplikasi. Dengan memindahkan komputasi lebih dekat ke pengguna, kita bisa mencapai latency yang lebih rendah dan performa yang lebih baik, terutama untuk aplikasi global.

Tren-tren ini, digabungkan dengan evolusi berkelanjutan framework seperti React, Vue, dan Angular, menciptakan peluang menarik bagi developer untuk membangun aplikasi web yang lebih cepat, efisien, dan menarik.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1542837336-d14bdf342f9b?q=80&w=757&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2025-08-05",
    viewCount: "3.2k",
    readingTime: "6 min",
  },
  {
    id: 6,
    title: "Mastering CSS Grid: A Complete Guide for Modern Layouts",
    slug: "mastering-css-grid-guide",
    description:
      "Learn how to create complex, responsive layouts using CSS Grid with practical examples and best practices.",
    tags: ["css", "grid", "layout"],
    content: {
      en: `
CSS Grid has revolutionized how we approach web layouts. Unlike Flexbox, which is designed for one-dimensional layouts, CSS Grid provides a powerful two-dimensional layout system that makes complex designs much more manageable.

The key to mastering CSS Grid is understanding the fundamental concepts: grid containers, grid items, grid lines, and grid areas. Once you grasp these basics, you can create sophisticated layouts that were previously difficult or impossible to achieve.

One of the most powerful features of CSS Grid is its ability to create responsive layouts without media queries. Using functions like minmax(), auto-fit, and auto-fill, you can create layouts that automatically adapt to different screen sizes.

Grid areas are particularly useful for creating complex page layouts. By defining named grid areas, you can easily rearrange content for different screen sizes or create different layouts for different pages while maintaining the same HTML structure.

The combination of CSS Grid and Flexbox gives developers unprecedented control over layout. Use Grid for the overall page structure and Flexbox for the alignment and distribution of items within grid areas.
      `,
      id: `
CSS Grid telah merevolusi cara kita mendekati layout web. Berbeda dengan Flexbox yang dirancang untuk layout satu dimensi, CSS Grid menyediakan sistem layout dua dimensi yang kuat yang membuat desain kompleks jauh lebih mudah dikelola.

Kunci untuk menguasai CSS Grid adalah memahami konsep fundamental: grid container, grid item, grid line, dan grid area. Setelah Anda memahami dasar-dasar ini, Anda dapat membuat layout canggih yang sebelumnya sulit atau tidak mungkin dicapai.

Salah satu fitur paling kuat dari CSS Grid adalah kemampuannya membuat layout responsif tanpa media query. Menggunakan fungsi seperti minmax(), auto-fit, dan auto-fill, Anda dapat membuat layout yang secara otomatis menyesuaikan dengan ukuran layar yang berbeda.

Grid area sangat berguna untuk membuat layout halaman yang kompleks. Dengan mendefinisikan grid area bernama, Anda dapat dengan mudah menyusun ulang konten untuk ukuran layar yang berbeda atau membuat layout yang berbeda untuk halaman yang berbeda sambil mempertahankan struktur HTML yang sama.

Kombinasi CSS Grid dan Flexbox memberi developer kontrol yang belum pernah ada sebelumnya atas layout. Gunakan Grid untuk struktur halaman secara keseluruhan dan Flexbox untuk alignment dan distribusi item dalam grid area.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-08-10",
    viewCount: "2.8k",
    readingTime: "8 min",
  },
  {
    id: 7,
    title: "Building Scalable React Applications: Architecture Patterns",
    slug: "scalable-react-architecture",
    description:
      "Discover proven patterns and best practices for building large-scale React applications that are maintainable and performant.",
    tags: ["react", "architecture", "scalability"],
    content: {
      en: `
Building scalable React applications requires careful consideration of architecture from the very beginning. As applications grow in complexity, the choices you make early on can have a significant impact on maintainability and performance.

Component composition is one of the most important patterns in React. Instead of creating large, monolithic components, break them down into smaller, reusable pieces. This not only makes your code more maintainable but also improves reusability and testing.

State management becomes crucial as applications grow. While React's built-in state management is sufficient for small applications, larger applications benefit from more sophisticated solutions like Redux, Zustand, or React Query. Choose the right tool based on your specific needs.

Performance optimization should be built into your development process from the start. Techniques like code splitting, lazy loading, and memoization can significantly improve your application's performance. Use React DevTools and performance monitoring tools to identify bottlenecks.

Testing is essential for maintaining code quality in large applications. Implement a comprehensive testing strategy that includes unit tests, integration tests, and end-to-end tests. This will help you catch bugs early and ensure that new features don't break existing functionality.
      `,
      id: `
Membangun aplikasi React yang scalable memerlukan pertimbangan arsitektur yang hati-hati dari awal. Saat aplikasi tumbuh dalam kompleksitas, pilihan yang Anda buat di awal dapat memiliki dampak signifikan pada maintainability dan performa.

Component composition adalah salah satu pattern terpenting di React. Alih-alih membuat komponen besar dan monolitik, pecahkan menjadi bagian-bagian yang lebih kecil dan dapat digunakan kembali. Ini tidak hanya membuat kode Anda lebih mudah dipelihara tetapi juga meningkatkan reusability dan testing.

State management menjadi crucial saat aplikasi tumbuh. Meskipun state management bawaan React cukup untuk aplikasi kecil, aplikasi yang lebih besar mendapat manfaat dari solusi yang lebih canggih seperti Redux, Zustand, atau React Query. Pilih tool yang tepat berdasarkan kebutuhan spesifik Anda.

Optimasi performa harus dibangun ke dalam proses pengembangan Anda dari awal. Teknik seperti code splitting, lazy loading, dan memoization dapat secara signifikan meningkatkan performa aplikasi Anda. Gunakan React DevTools dan tool monitoring performa untuk mengidentifikasi bottleneck.

Testing sangat penting untuk mempertahankan kualitas kode dalam aplikasi besar. Implementasikan strategi testing yang komprehensif yang mencakup unit test, integration test, dan end-to-end test. Ini akan membantu Anda menangkap bug lebih awal dan memastikan bahwa fitur baru tidak merusak fungsionalitas yang ada.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-08-15",
    viewCount: "4.1k",
    readingTime: "10 min",
  },
  {
    id: 8,
    title: "The Art of Microinteractions: Enhancing User Experience",
    slug: "microinteractions-ux-design",
    description:
      "Learn how to design and implement microinteractions that delight users and improve the overall user experience.",
    tags: ["ux", "design", "interactions"],
    content: {
      en: `
Microinteractions are the small, subtle animations and feedback mechanisms that occur throughout a user interface. While they may seem insignificant individually, collectively they play a crucial role in creating a polished and engaging user experience.

The key to effective microinteractions is understanding their purpose. They should provide feedback, guide users, communicate system status, or add delight to the experience. Every microinteraction should serve a specific function rather than just being decorative.

Timing and easing are critical aspects of microinteractions. The duration should be short enough to feel responsive but long enough to be noticeable. Easing functions like ease-out or cubic-bezier can make animations feel more natural and polished.

Microinteractions should be consistent throughout your application. Establish a design system for your animations, including standard durations, easing functions, and interaction patterns. This consistency helps users understand and predict how the interface will behave.

Performance is also important when implementing microinteractions. Use CSS transforms and opacity changes when possible, as they're more performant than changing layout properties. Consider using the will-change property to optimize animations and reduce jank.
      `,
      id: `
Microinteractions adalah animasi kecil dan mekanisme feedback yang halus yang terjadi di seluruh antarmuka pengguna. Meskipun secara individual mungkin tampak tidak signifikan, secara kolektif mereka memainkan peran crucial dalam menciptakan pengalaman pengguna yang polished dan engaging.

Kunci untuk microinteractions yang efektif adalah memahami tujuannya. Mereka harus memberikan feedback, memandu pengguna, mengkomunikasikan status sistem, atau menambah kesenangan pada pengalaman. Setiap microinteraction harus melayani fungsi spesifik daripada hanya dekoratif.

Timing dan easing adalah aspek kritis dari microinteractions. Durasi harus cukup pendek untuk terasa responsif tetapi cukup lama untuk terlihat. Fungsi easing seperti ease-out atau cubic-bezier dapat membuat animasi terasa lebih natural dan polished.

Microinteractions harus konsisten di seluruh aplikasi Anda. Buat sistem desain untuk animasi Anda, termasuk durasi standar, fungsi easing, dan pola interaksi. Konsistensi ini membantu pengguna memahami dan memprediksi bagaimana antarmuka akan berperilaku.

Performa juga penting saat mengimplementasikan microinteractions. Gunakan CSS transforms dan perubahan opacity ketika memungkinkan, karena mereka lebih performant daripada mengubah properti layout. Pertimbangkan menggunakan properti will-change untuk mengoptimalkan animasi dan mengurangi jank.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-08-20",
    viewCount: "1.9k",
    readingTime: "7 min",
  },
  {
    id: 9,
    title: "Optimizing React Performance: Best Practices for 2025",
    slug: "react-performance-optimization-2025",
    description:
      "Learn advanced techniques for optimizing React applications, from code splitting to memory management.",
    tags: ["react", "performance", "optimization"],
    content: {
      en: `
Performance optimization in React has become more critical than ever as applications grow in complexity. In 2025, with the rise of mobile-first development and increasing user expectations, every millisecond counts.

Code splitting is one of the most effective ways to improve initial load times. By splitting your application into smaller chunks that can be loaded on demand, you can significantly reduce the initial bundle size. React.lazy and Suspense make this process seamless.

Memory management is another crucial aspect of React performance. Memory leaks can occur when components don't properly clean up subscriptions, event listeners, or timers. Using useEffect cleanup functions and avoiding closures that capture stale values are essential practices.

Virtualization is particularly important for applications that render large lists or grids. Libraries like react-window and react-virtualized can dramatically improve performance by only rendering visible items.

Profiling tools like React DevTools Profiler and browser performance tools are invaluable for identifying performance bottlenecks. Regular performance audits should be part of your development workflow.
      `,
      id: `
Optimasi performa di React menjadi lebih kritis dari sebelumnya saat aplikasi tumbuh dalam kompleksitas. Di 2025, dengan kemunculan mobile-first development dan ekspektasi pengguna yang meningkat, setiap milidetik penting.

Code splitting adalah salah satu cara paling efektif untuk meningkatkan waktu loading awal. Dengan memecah aplikasi menjadi chunk yang lebih kecil yang dapat dimuat sesuai permintaan, Anda dapat secara signifikan mengurangi ukuran bundle awal. React.lazy dan Suspense membuat proses ini seamless.

Memory management adalah aspek kritis lainnya dari performa React. Memory leak dapat terjadi ketika komponen tidak membersihkan subscription, event listener, atau timer dengan benar. Menggunakan cleanup function useEffect dan menghindari closure yang menangkap nilai yang stale adalah praktik esensial.

Virtualization sangat penting untuk aplikasi yang merender list atau grid besar. Library seperti react-window dan react-virtualized dapat secara dramatis meningkatkan performa dengan hanya merender item yang terlihat.

Tool profiling seperti React DevTools Profiler dan browser performance tools sangat berharga untuk mengidentifikasi bottleneck performa. Audit performa reguler harus menjadi bagian dari workflow pengembangan Anda.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-08-25",
    viewCount: "2.3k",
    readingTime: "9 min",
  },
  {
    id: 10,
    title: "The Complete Guide to TypeScript in Modern Web Development",
    slug: "typescript-complete-guide-2025",
    description:
      "Master TypeScript fundamentals and advanced features for building robust, scalable web applications.",
    tags: ["typescript", "webdev", "programming"],
    content: {
      en: `
TypeScript has become the de facto standard for modern web development, offering type safety and enhanced developer experience. As we move into 2025, understanding TypeScript is essential for any serious web developer.

TypeScript's type system is its most powerful feature. By defining interfaces, types, and generics, you can catch errors at compile time rather than runtime. This leads to more reliable code and better developer experience.

Advanced TypeScript features like conditional types, mapped types, and template literal types enable you to create sophisticated type definitions. These features are particularly useful when working with APIs, state management, and complex data structures.

TypeScript's integration with modern frameworks like React, Vue, and Angular is seamless. With proper configuration, you get excellent IntelliSense, refactoring support, and error detection throughout your development process.

Performance considerations are also important when using TypeScript. While TypeScript adds compile-time overhead, the resulting JavaScript is just as performant as hand-written code. The key is to configure your TypeScript compiler options appropriately for your project's needs.
      `,
      id: `
TypeScript telah menjadi standar de facto untuk pengembangan web modern, menawarkan type safety dan pengalaman developer yang lebih baik. Saat kita memasuki 2025, memahami TypeScript sangat penting untuk web developer yang serius.

Sistem tipe TypeScript adalah fitur paling kuatnya. Dengan mendefinisikan interface, type, dan generic, Anda dapat menangkap error pada waktu compile daripada runtime. Ini mengarah ke kode yang lebih reliable dan pengalaman developer yang lebih baik.

Fitur TypeScript lanjutan seperti conditional types, mapped types, dan template literal types memungkinkan Anda membuat definisi tipe yang canggih. Fitur-fitur ini sangat berguna saat bekerja dengan API, state management, dan struktur data kompleks.

Integrasi TypeScript dengan framework modern seperti React, Vue, dan Angular seamless. Dengan konfigurasi yang tepat, Anda mendapatkan IntelliSense yang excellent, dukungan refactoring, dan deteksi error sepanjang proses pengembangan.

Pertimbangan performa juga penting saat menggunakan TypeScript. Meskipun TypeScript menambah overhead compile-time, JavaScript yang dihasilkan sama performant dengan kode yang ditulis manual. Kuncinya adalah mengkonfigurasi opsi compiler TypeScript secara tepat untuk kebutuhan proyek Anda.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-08-30",
    viewCount: "3.7k",
    readingTime: "12 min",
  },
  {
    id: 11,
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    slug: "accessible-web-applications-guide",
    description:
      "Learn how to create web applications that are accessible to all users, including those with disabilities.",
    tags: ["accessibility", "webdev", "ux"],
    content: {
      en: `
Web accessibility is not just a legal requirement—it's a fundamental aspect of good web design. Creating applications that are accessible to all users, including those with disabilities, should be a priority for every developer.

Semantic HTML is the foundation of accessible web applications. Using proper HTML elements like headings, lists, and landmarks helps screen readers and other assistive technologies understand your content structure.

Keyboard navigation is essential for users who cannot use a mouse. All interactive elements should be accessible via keyboard, with logical tab order and visible focus indicators.

Color contrast is crucial for users with visual impairments. The Web Content Accessibility Guidelines (WCAG) recommend a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.

ARIA (Accessible Rich Internet Applications) attributes can enhance accessibility when semantic HTML is not sufficient. However, they should be used judiciously and tested with actual assistive technologies.

Testing with real users who have disabilities is the most effective way to ensure your application is truly accessible. Tools like screen readers, keyboard-only navigation, and color contrast checkers are also valuable for testing.
      `,
      id: `
Aksesibilitas web bukan hanya persyaratan hukum—itu adalah aspek fundamental dari desain web yang baik. Menciptakan aplikasi yang dapat diakses oleh semua pengguna, termasuk mereka yang memiliki disabilitas, harus menjadi prioritas untuk setiap developer.

Semantic HTML adalah fondasi aplikasi web yang dapat diakses. Menggunakan elemen HTML yang tepat seperti heading, list, dan landmark membantu screen reader dan teknologi assistif lainnya memahami struktur konten Anda.

Navigasi keyboard sangat penting untuk pengguna yang tidak dapat menggunakan mouse. Semua elemen interaktif harus dapat diakses melalui keyboard, dengan urutan tab yang logis dan indikator fokus yang terlihat.

Kontras warna sangat penting untuk pengguna dengan gangguan penglihatan. Web Content Accessibility Guidelines (WCAG) merekomendasikan rasio kontras minimal 4.5:1 untuk teks normal dan 3:1 untuk teks besar.

Atribut ARIA (Accessible Rich Internet Applications) dapat meningkatkan aksesibilitas ketika semantic HTML tidak cukup. Namun, mereka harus digunakan dengan bijak dan diuji dengan teknologi assistif yang sebenarnya.

Testing dengan pengguna nyata yang memiliki disabilitas adalah cara paling efektif untuk memastikan aplikasi Anda benar-benar dapat diakses. Tool seperti screen reader, navigasi keyboard-only, dan color contrast checker juga berharga untuk testing.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-09-05",
    viewCount: "1.8k",
    readingTime: "8 min",
  },
  {
    id: 12,
    title: "The Future of CSS: What's New and What's Coming",
    slug: "future-of-css-2025",
    description:
      "Explore the latest CSS features and upcoming specifications that will shape the future of web styling.",
    tags: ["css", "webdev", "frontend"],
    content: {
      en: `
CSS continues to evolve rapidly, with new features and specifications being developed to meet the growing demands of modern web development. As we look toward 2025, several exciting developments are on the horizon.

CSS Container Queries are one of the most anticipated features. Unlike media queries that respond to viewport size, container queries allow elements to respond to their container's size. This enables more flexible and component-based responsive design.

CSS Grid Level 2 introduces new features like subgrid, which allows grid items to participate in their parent's grid layout. This opens up new possibilities for complex layouts that were previously difficult to achieve.

CSS Custom Properties (CSS Variables) are becoming more powerful with new features like @property, which allows you to define custom properties with specific types and constraints. This enables more sophisticated theming and dynamic styling.

CSS Houdini is an ambitious project that gives developers low-level access to the CSS engine. While still in development, it promises to enable custom CSS features and better performance through direct browser API access.

The CSS Working Group is also working on improvements to existing features like better support for logical properties, enhanced color functions, and improved animation capabilities.
      `,
      id: `
CSS terus berkembang dengan cepat, dengan fitur dan spesifikasi baru yang dikembangkan untuk memenuhi tuntutan pengembangan web modern yang terus bertambah. Saat kita melihat ke 2025, beberapa perkembangan menarik ada di cakrawala.

CSS Container Queries adalah salah satu fitur yang paling dinantikan. Berbeda dengan media query yang merespons ukuran viewport, container query memungkinkan elemen merespons ukuran container mereka. Ini memungkinkan desain responsif yang lebih fleksibel dan berbasis komponen.

CSS Grid Level 2 memperkenalkan fitur baru seperti subgrid, yang memungkinkan grid item berpartisipasi dalam layout grid parent mereka. Ini membuka kemungkinan baru untuk layout kompleks yang sebelumnya sulit dicapai.

CSS Custom Properties (CSS Variables) menjadi lebih powerful dengan fitur baru seperti @property, yang memungkinkan Anda mendefinisikan custom property dengan tipe dan constraint spesifik. Ini memungkinkan theming dan styling dinamis yang lebih canggih.

CSS Houdini adalah proyek ambisius yang memberi developer akses level rendah ke engine CSS. Meskipun masih dalam pengembangan, ini menjanjikan untuk memungkinkan fitur CSS kustom dan performa yang lebih baik melalui akses API browser langsung.

CSS Working Group juga bekerja pada peningkatan fitur yang ada seperti dukungan yang lebih baik untuk logical properties, fungsi warna yang ditingkatkan, dan kemampuan animasi yang diperbaiki.
      `,
    },
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&h=600&fit=crop",
    createdAt: "2025-09-10",
    viewCount: "2.9k",
    readingTime: "7 min",
  },
];
