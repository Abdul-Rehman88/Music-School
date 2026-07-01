# 🎵 Sonder Music School

A modern, visually immersive music school website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** — delivering a cinematic learning experience with smooth animations and a polished dark-themed UI.

🌐 **Live Demo:** https://music-school-liard-beta.vercel.app/
---

## 📸 Preview
<img width="1920" height="5717" alt="image" src="https://github.com/user-attachments/assets/9b410cb8-b05b-44c9-a973-d763320c7d68" />


---

## ✨ Features

### Student Side
- 🎸 Browse courses by category (Guitar, Vocals, Production & more)
- 🎯 Personalized learning journey section
- 💬 Live Feedback & Engagement experience
- 🎙️ Featured webinars for skill enhancement
- 👨‍🏫 Meet the instructors section
- ⭐ Student testimonials

### General
- 🌊 Canvas-based animated wave & spotlight effects
- ⚡ Lenis smooth scrolling
- 🎨 Dark mode first with canvas-aware color updates
- 📱 Fully responsive with mobile-optimized scroll behavior
- 🧭 Floating pill-style navbar with smooth routing

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| UI Components | Aceternity UI |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Hosting | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.17+`
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/sonder-music-school.git
cd sonder-music-school

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Aceternity UI Setup

Install the required Aceternity UI components:

```bash
npx shadcn@latest add "https://ui.aceternity.com/registry/wavy-background.json"
npx shadcn@latest add "https://ui.aceternity.com/registry/sticky-scroll-reveal.json"
npx shadcn@latest add "https://ui.aceternity.com/registry/animated-tooltip.json"
npx shadcn@latest add "https://ui.aceternity.com/registry/background-gradient.json"
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
sonder-music-school/
├── src/
│   ├── app/
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact page
│   │   ├── courses/
│   │   │   └── page.tsx            # Courses listing page
│   │   ├── globals.css             # Global styles & CSS variables
│   │   ├── layout.tsx              # Root layout with Lenis provider
│   │   └── page.tsx                # Home page — section composition
│   ├── assets/                     # Static assets (images, fonts)
│   ├── components/
│   │   ├── ui/                     # Aceternity UI primitives
│   │   │   ├── 3d-card.tsx
│   │   │   ├── animated-tooltip.tsx
│   │   │   ├── background-beams.tsx
│   │   │   ├── background-gradient.tsx
│   │   │   ├── card-hover-effect.tsx
│   │   │   ├── engagement-panel.tsx
│   │   │   ├── infinite-moving-cards.tsx
│   │   │   ├── moving-border.tsx
│   │   │   ├── navbar-menu.tsx
│   │   │   ├── SmoothScrollProvider.tsx
│   │   │   ├── Spotlight.tsx
│   │   │   ├── sticky-scroll-reveal.tsx
│   │   │   └── wavy-background.tsx
│   │   ├── FeaturedCourses.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroBanner.jsx
│   │   ├── Instructors.tsx
│   │   ├── Navbar.tsx
│   │   ├── TestimonialCards.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── UpcomingWebinars.tsx
│   │   └── WhyChooseUs.tsx
│   ├── data/
│   │   └── music_courses.json      # Course data
│   ├── hooks/
│   │   └── useIsDarkMode.ts        # Dark mode detection hook
│   └── lib/
│       └── utils.ts                # Utility functions
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🌐 Deployment

This project is deployed on **Vercel**. To redeploy:

```bash
npm run build
vercel deploy
```

Or connect your GitHub repo to Vercel for automatic deployments on every push.

---

## 📄 License

This project is for portfolio and educational purposes.  
© 2025 Sonder Music School. All rights reserved.

---
