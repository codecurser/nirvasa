# Nirvasa - Premium Event Management & Digital Showcase

**Nirvasa** (also known as Manya) is a modern, high-performance web application designed for luxury event planning, corporate conferences, grand weddings, and brand experiences. Built with **React 19**, **TypeScript**, and **Vite**, it features smooth physics-based scrolling, dynamic Framer Motion animations, and a rich interactive blog system.

---

## ✨ Features

- 🎭 **Corporate & Luxury Events**: Showcases bespoke event planning, stage setups, interactive panels, and custom audio routing.
- 💍 **Bespoke Wedding Planning**: Elegant ceremony design, location sourcing, and custom structural setups.
- 📜 **Interactive Blog System**: Built-in blog showcase with category filtering, modal view, and detailed blog post view.
- ⚡ **Smooth Scrolling**: Integrated with **Lenis** smooth scroll for fluid user experience.
- 🎨 **Modern Design & Micro-animations**: Powered by **Framer Motion**, Tailwind CSS v4, and Lucide React icons.
- 📱 **Fully Responsive**: Optimized for seamless navigation on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [Oxlint](https://oxc.rs/)

---

## 📂 Project Structure

```
nirvasa/
├── public/              # Static public assets
├── src/
│   ├── assets/          # Project images and logos
│   ├── components/      # UI components (BlogSection, BlogModal, BlogDetailPage, etc.)
│   ├── data/            # Mock data and content structures
│   ├── types/           # TypeScript interface & type definitions
│   ├── App.tsx          # Main application page & navigation logic
│   ├── index.css        # Global CSS & Tailwind imports
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codecurser/nirvasa.git
   cd nirvasa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the app.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the Vite development server with HMR.
- `npm run build` - Compiles TypeScript and builds the production bundle in `dist/`.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs Oxlint to inspect code for errors and linting warnings.

---

## 📄 License

This project is proprietary and confidential. All rights reserved.
