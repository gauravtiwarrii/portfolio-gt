# Gaurav Tiwari | Engineering Portfolio

Personal portfolio for software engineering, data engineering, and AI systems work. Built with Next.js and React, it brings together selected projects, engineering approach, experience, skills, GitHub activity, writing, and contact details.

## Features

- Responsive portfolio homepage with project case studies and systems architecture
- Project pages, technical blog, and reading progress indicators
- GitHub repository and profile data, with graceful fallback when the API is unavailable
- Contact form with optional email delivery through Resend
- Password-protected admin area for managing blog posts
- Open Graph image generation

## Tech Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS and CSS Modules
- Markdown blog content parsed with `gray-matter` and rendered with `react-markdown`
- Resend for optional contact email delivery

## Getting Started

Requirements: Node.js 20 or later and npm.

```bash
git clone https://github.com/gauravtiwarrii/portfolio-gt.git
cd portfolio-gt
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root as needed:

| Variable | Purpose | Required |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Password for the admin login | Only for admin access |
| `RESEND_API_KEY` | Sends contact form submissions by email; without it, submissions are saved locally in development | No |
| `GITHUB_TOKEN` | Authenticates GitHub API requests to increase the available rate limit | No |
| `NEXT_PUBLIC_APP_URL` | Canonical site URL used in site metadata and links | No; defaults to `https://gauravtiwari.dev` |
| `NEXT_PUBLIC_BASE_URL` | Base URL used by the admin editor for API requests | No; defaults to `http://localhost:3000` |

Example:

```env
ADMIN_PASSWORD=your-admin-password
RESEND_API_KEY=re_your_api_key
GITHUB_TOKEN=github_pat_your_token
NEXT_PUBLIC_APP_URL=https://example.com
NEXT_PUBLIC_BASE_URL=https://example.com
```

Keep secrets out of source control. Without `RESEND_API_KEY`, contact submissions are saved to `data/messages.json`; use persistent storage when deploying to an ephemeral serverless filesystem.

## Routes

- `/` - portfolio homepage
- `/projects` - project index
- `/projects/[slug]` - project case study
- `/blog` - writing index
- `/blog/[slug]` - blog post
- `/admin/login` - admin sign-in
- `/admin` - blog management dashboard
- `/api/contact` - contact form endpoint
- `/api/github` - GitHub profile and repository data

The `/about` and `/contact` paths redirect to their corresponding homepage sections.

## Blog Content

Blog posts are Markdown files in `content/blogs/`. Include front matter for the title, excerpt, date, and read time; tags and a cover image are optional.

```md
---
title: Example post
excerpt: A short summary of the post.
date: 2026-01-15
readTime: 5 min read
tags:
  - Data Engineering
coverImage: /images/example.jpg
---

Post content goes here.
```

## Scripts

```bash
npm run dev     # Start the development server
npm run lint    # Run ESLint
npm run build   # Create a production build
npm run start   # Serve the production build
```

Deploy on a Node.js-compatible host such as Vercel. Configure the required environment variables in the host's project settings before enabling admin access or email delivery.