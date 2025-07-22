# 🧠 AI Career Coach Agent

Your intelligent assistant for smarter career decisions — powered by Google Gemini, Next.js, Clerk, and Inngest. Get personalized career guidance, interactive roadmaps, resume reviews, and more, all in one modern platform.

---

## 🚀 Features

- 🔍 **AI Career Coach Agent**: Provides intelligent, tailored career guidance using Inngest serverless functions and Gemini integration.
- 🤖 **AI Roadmap Generator**: Generates customized career roadmaps based on user input and selected career paths.
- 🧠 **Multiple AI Agents**: Includes AI Resume Reviewer, Skill Gap Analyzer, Career Switch Planner, and more—each built with reusable agent templates.
- 📈 **Real-time Data Fetching**: Uses serverless API routes and async polling to track Inngest function runs in real time.
- 🎨 **Modern UI**: Clean, responsive design using Tailwind CSS with components from shadcn/ui.
- 🔐 **Authentication with Clerk**: Secured login/signup system integrated via Clerk for a smooth auth experience.
- 💡 **Lottie Animations & Skeletons**: Beautiful loading states and animations for engaging user experience.
- 📦 **Modular Code Structure**: Clean separation of logic, API routes, agents, and reusable components.
- 🌐 **Vercel Deployed**: Ready for production with Vercel deployment, CI/CD, and environment variable support.
- 🧪 **Framer Motion & AOS Ready**: Components designed to easily support animation libraries (if needed).
- 🛠️ **Easy to Extend**: Built to be developer-friendly, with simple patterns to add new agents or update logic.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend/API**: Serverless functions (Edge compatible), Inngest for async workflows
- **Authentication**: Clerk
- **AI**: Gemini
- **Animations**: Lottie, Skeletons
- **Deployment**: Vercel

---

## 📦 Installation

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install
```

### 🔐 Environment Variables

Create a `.env.local` file and add the following:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SERVER_HOST=https://inn.inngest.com
Gemini_API_KEY=your_gemini_key
```

---

## 💻 Running Locally

Start the Inngest dev server:

```bash
npx inngest-cli@latest dev
```

Start the Next.js development server:

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

Deploy the frontend to Vercel:

- Push your code to GitHub
- Import the repo into Vercel
- Add the same environment variables in the Vercel Dashboard
- Deploy and go live 🎉

---

## 📂 Folder Structure (Highlights)

```
.
├── app/
│   ├── api/               # Serverless route handlers (POST/GET)
│   ├── dashboard/         # Dashboard pages and layouts
│   └── components/        # Shared UI components (Header, Footer, AgentCard, etc.)
├── inngest/               # Inngest client and event function definitions
├── public/                # Static assets, animations, images
├── lib/                   # Utility functions
└── README.md
```

---

## ✨ Adding a New Agent

1. Create a new API route inside `app/api/your-agent-name/route.ts`
2. Define an Inngest function in `inngest/functions/yourAgent.ts`
3. Add UI component and route under `app/dashboard/_components/` or `app/`
4. Wire them together in the main dashboard or a page

---

© 2025 Priyanshu — All rights reserved
