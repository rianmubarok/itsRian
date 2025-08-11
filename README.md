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
└── data/               # Static content and configuration
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

Create a `.env.local` file in the root of your project with the following variables:

```env
# Notion Configuration
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_blog_database_id
NOTION_PROJECTS_DATABASE_ID=your_notion_projects_database_id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Firebase Web App
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Formspree
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_formspree_form_id
```

### Notion Setup

1. **Create a Notion integration** at [Notion Developers](https://www.notion.so/my-integrations) and copy the integration token (`NOTION_TOKEN`).
2. **Share your Notion databases** (for blogs and projects) with your integration.
3. Copy the database IDs from the Notion URL and set them as `NOTION_DATABASE_ID` (for blogs) and `NOTION_PROJECTS_DATABASE_ID` (for projects).

### Notion Database Setup

You need two Notion databases: one for blogs and one for projects. Each database should have the following properties:

#### Blog Database (for `NOTION_DATABASE_ID`)

- **Title** (type: Title)
- **Slug** (type: Text)
- **Date** (type: Date)
- **Tags** (type: Multi-select)
- **Excerpt** (type: Text)
- **Thumbnail** (type: URL or Files)
- **Content** (type: Text or use Notion's built-in content blocks)

#### Projects Database (for `NOTION_PROJECTS_DATABASE_ID`)

- **Title** (type: Title)
- **Slug** (type: Text)
- **Description** (type: Text)
- **Stack** (type: Multi-select)
- **Demo URL** (type: URL)
- **Source URL** (type: URL)
- **Thumbnail** (type: URL or Files)

> **Note:** After creating the databases, share them with your Notion integration so your app can access them.

---

### Supabase Setup

1. **Create a Supabase project** at [Supabase](https://app.supabase.com/).
2. Go to your project settings > API and copy the `Project URL` and `anon public` key. Set them as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. For server-side operations, copy the `service_role` key and set it as `SUPABASE_SERVICE_ROLE_KEY` (keep this key secret, do not expose it to the client).

### Supabase Table Setup

You need to create tables in Supabase for features like the guestbook, blog views, and profile images. Use the SQL Editor in the Supabase dashboard to run the following example SQL:

#### Guestbook Table

```sql
create table guestbook (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  profile_image_url text
);
```

#### Blog Views Table

```sql
create table blog_views (
  slug text primary key,
  count integer not null default 0
);
```

#### Profile Images Table

```sql
create table profile_images (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

> **Note:**
>
> - You can adjust the table schemas as needed for your use case.
> - Make sure to enable Row Level Security (RLS) and configure policies as needed for your app's security.

---

### Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/).
2. Register a web app and copy the API key, Auth domain, Project ID, and App ID. Set them in the corresponding variables above.

### Formspree Setup

1. **Create a form** at [Formspree](https://formspree.io/) and copy your form ID.
2. Set it as `NEXT_PUBLIC_FORMSPREE_FORM_ID`.

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

**Email**: [rianmubarok.13@gmail.com](mailto:rianmubarok.13@gmail.com)  
**Project Repository**: [https://github.com/rianmubarok/itsRian](https://github.com/rianmubarok/itsRian)  
**Live Demo**: [https://itsrian.my.id/](https://itsrian.my.id/)

---

<div align="center">
  <p>Built with modern web technologies and best practices</p>
  <p><strong>Ready for professional deployment</strong></p>
</div>
