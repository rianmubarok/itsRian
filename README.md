# Personal Portfolio Website

> A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.  
> Showcase your projects, blog posts, skills, and professional journey in one comprehensive platform.

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-000000?style=flat&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## Features

- **Responsive Design** - Optimized for all devices and screen sizes
- **Blog & Portfolio Showcase** - Dedicated sections for articles and project displays
- **Interactive Guestbook** - Visitor engagement with secure authentication
- **Contact Integration** - Direct communication via Formspree integration
- **SEO Optimization** - Enhanced search engine visibility with proper metadata
- **Theme Support** - Dark and light mode with smooth transitions
- **Performance Optimized** - Fast loading times and smooth animations

---

## Preview

![Portfolio Preview](public/preview.png)

---

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) - React framework for production applications
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Content Management**: [Notion API](https://developers.notion.com/) - Headless CMS integration
- **Database**: [Supabase](https://supabase.com/) & [Firebase](https://firebase.google.com/) - Backend services
- **Animation**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Icons**: [Lucide React](https://lucide.dev/) - Consistent icon system

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rianmubarok/itsRian.git
   cd your-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables in `.env.local` (see Environment Variables section)

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## Project Structure

```
├── components/          # Reusable UI components
├── pages/              # Next.js pages and API routes
├── public/             # Static assets and media files
├── styles/             # Global styles and Tailwind configuration
├── lib/                # Utility functions and API configurations
├── types/              # TypeScript type definitions
├── data/               # Static content and configuration
└── docs/               # Documentation files
```

---

## Using This Template for Your Portfolio

This portfolio template is designed for professionals looking to establish a strong online presence. It's particularly suitable for:

- **Software Developers** showcasing technical projects and coding expertise
- **UI/UX Designers** presenting design portfolios and case studies
- **Students** building their first professional web presence
- **Freelancers** attracting potential clients and demonstrating capabilities
- **Professionals** from various fields seeking a modern digital portfolio

### Customization Guide

1. **Fork the repository** to your GitHub account
2. **Update configuration files** with your personal information
3. **Replace sample content** with your projects and blog posts
4. **Modify styling** to align with your personal brand
5. **Configure integrations** for contact forms and analytics
6. **Deploy** to your preferred hosting platform

---

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to [Vercel](https://vercel.com/)
2. Configure environment variables in the Vercel dashboard
3. Deploy with automatic builds on every commit

### Alternative Platforms

- **Netlify** - Connect repository for continuous deployment
- **Railway** - Full-stack deployment with database support
- **Digital Ocean App Platform** - Managed application hosting

---

## Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Database Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Service
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_formspree_form_id

# Content Management (Optional)
NOTION_API_KEY=your_notion_integration_key
NOTION_DATABASE_ID=your_notion_database_id
```

---

## API Routes

The application includes the following API endpoints:

- `/api/contact` - Handle contact form submissions
- `/api/guestbook` - Manage guestbook entries
- `/api/projects` - Fetch project data
- `/api/blog` - Retrieve blog posts

---

## Contributing

We welcome contributions from the community. To contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/enhancement-name`)
3. **Commit your changes** (`git commit -m 'Add new enhancement'`)
4. **Push to your branch** (`git push origin feature/enhancement-name`)
5. **Submit a Pull Request**

Please ensure your code follows the existing style conventions and includes appropriate tests.

---

## Performance

This application is optimized for performance with:

- **Code splitting** for reduced bundle sizes
- **Image optimization** with Next.js Image component
- **Static generation** for improved loading speeds
- **Lazy loading** for enhanced user experience

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.

---

## Support

If you find this project helpful, please consider:

- **Starring the repository** on GitHub
- **Reporting issues** or suggesting improvements
- **Contributing** to the codebase
- **Sharing** with others who might benefit

---

## Contact Information

**Maintainer**: Your Name  
**Email**: [rianmubarok.13@gmail.com](mailto:rianmubarok.13@gmail.com)  
**Project Repository**: [https://github.com/rianmubarok/itsRian](https://github.com/rianmubarok/itsRian)  
**Live Demo**: [https://](https://)

---

<div align="center">
  <p>Built with modern web technologies and best practices</p>
  <p><strong>Ready for professional deployment</strong></p>
</div>
