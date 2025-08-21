# 🌟 Personal Portfolio Website

> Modern, responsive portfolio built with Next.js 15 and cutting-edge web technologies. Showcase your projects, blog posts, and professional journey with style.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## ✨ Features

🎨 **Modern Design** — Clean, responsive interface optimized for all devices  
📝 **Blog & Portfolio** — Dynamic content management with Notion CMS  
💬 **Interactive Guestbook** — Visitor engagement with social authentication  
📧 **Contact Forms** — Direct communication via Formspree integration  
🚀 **Performance First** — Lightning-fast loading with Next.js optimizations  
🌙 **Theme Support** — Dark/light mode with smooth transitions  
🔍 **SEO Ready** — Optimized for search engines and social sharing

## 🛠️ Tech Stack

This website is built using these technologies:

- ◼️ **Next.js 15** — React framework for building fast, SEO-friendly web apps
- ⚛️ **React 19** — UI library for creating interactive components
- 🔰 **TypeScript** — Strongly typed JavaScript for better maintainability
- 💠 **Tailwind CSS 4** — Utility-first CSS framework for rapid styling
- 🔥 **Firebase** — Authentication (Google & GitHub) and backend services
- 🦫 **Supabase** — Database and storage for guestbook and profile images
- 📜 **Notion API** — Headless CMS for managing blog and portfolio content
- ➰ **Framer Motion** — Smooth and interactive animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/rianmubarok/itsRian.git
cd itsRian

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## ⚙️ Configuration

Create `.env.local` with your credentials:

```env
# Notion CMS
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_blog_database_id
NOTION_PROJECTS_DATABASE_ID=your_projects_database_id

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Firebase Auth
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Contact Form
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_formspree_form_id
```

### 📝 Notion Setup

1. Create integration at [Notion Developers](https://www.notion.so/my-integrations)
2. Create two databases: **Blog** and **Projects**
3. Share databases with your integration
4. Copy database IDs from URLs

**Blog Database Properties:**

- title (Title), slug (Text), description (Text), tags (Multi-select), date (Date), readingTime (Text), thumbnail (URL), contentEn (Text), contentIn (Text)

**Projects Database Properties:**

- title (Title), slug (Text), description (Text), detail (Text), image (URL), tags (Multi-select), createdAt (Date), sourceCode (URL), liveProject (URL)

### 🗄️ Supabase Setup

1. Create project at [Supabase](https://app.supabase.com/)
2. Copy Project URL and API keys from Settings > API
3. Create tables using SQL Editor:

```sql
-- Guestbook
create table guestbook (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  message text not null,
  created_at timestamp with time zone default now(),
  profile_image_url text
);

-- Blog views tracking
create table blog_views (
  slug text primary key,
  count integer not null default 0
);
```

### 🔥 Firebase Setup

1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Google & GitHub authentication
3. Copy web app config values

### 📬 Formspree Setup

1. Create form at [Formspree](https://formspree.io/)
2. Copy form ID for contact integration

## 📁 Project Structure

```
├── app/                # Next.js 15 App Router
├── components/         # Reusable UI components
├── lib/               # Utilities & configurations
├── public/            # Static assets
├── types/             # TypeScript definitions
└── data/              # Static content
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repo to [Vercel](https://vercel.com/)
2. Set environment variables
3. Deploy automatically on push

## 🎯 Perfect For

- 👨‍💻 **Developers** showcasing technical projects
- 🎨 **Designers** presenting portfolios
- 🎓 **Students** building professional presence
- 💼 **Freelancers** attracting clients
- 🚀 **Professionals** establishing online brand

## 📄 License

MIT License — feel free to use for personal or commercial projects.

## 🤝 Support

Found this helpful?

- ⭐ Star the repo
- 🐛 Report issues
- 🔧 Contribute improvements
- 📢 Share with others

---

**Live Demo**: [https://itsrian.my.id/](https://itsrian.my.id/)  
**Contact**: [rianmubarok.13@gmail.com](mailto:rianmubarok.13@gmail.com)

<div align="center">
  <strong>🚀 Ready to build your digital presence? Let's get started!</strong>
</div>
