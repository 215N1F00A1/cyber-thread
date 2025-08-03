# 🚀 Cyber Thread – A Mini LinkedIn-like Community Platform

A fully responsive and functional LinkedIn-style community app where users can register, log in, create posts, and explore public profiles of other members.

> ✅ Built as part of the Full Stack Internship at **CIAAN Cyber Tech Pvt. Ltd**

---

## 🌐 Live Demo

🔗 [https://cyber-thread.vercel.app](https://cyber-thread.vercel.app)  
🔗 GitHub Repo: [https://github.com/215N1F00A1/cyber-thread](https://github.com/215N1F00A1/cyber-thread)

---

## ⚙️ Tech Stack

### Frontend
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** for styling
- **Supabase** for auth + database
- **Shadcn/ui** for beautiful UI components

### Backend
- Supabase (as Backend-as-a-Service)
- REST APIs via Supabase SDK
- Realtime sync using Supabase channels

---

## ✨ Features

- 🔐 **Authentication** – User register, login, and logout securely
- 🧑‍💼 **User Profiles** – View any user’s name, email, bio, and posts
- 📝 **Public Post Feed** – All users can view and create text-only posts
- 🖼️ **Responsive UI** – Optimized for mobile, tablet, and desktop
- ⚡ **Realtime Updates** – Instant post updates with Supabase subscriptions
- 🔎 **Clean UX** – Minimal and modern interface with smooth navigation

---

## 📸 Screenshots

![Homepage](./public/screenshots/home.png)
![Profile Page](./public/screenshots/profile.png)
![Post Feed](./public/screenshots/feed.png)

---

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/215N1F00A1/cyber-thread.git
cd cyber-thread
2. Install Dependencies

npm install
# or
yarn install
3. Set Up Environment Variables
Create a .env.local file:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
Replace with your Supabase project’s credentials.

4. Run Locally
npm run dev
Go to http://localhost:3000

🧪 Demo Credentials (Optional)
You can add test users for demo (if required). Example:

Email: demo@cyber.com
Password: demopass123
📁 Folder Structure
.
├── app/                # Next.js App Router
│   ├── (auth)          # Login/Register pages
│   ├── (main)          # Feed, Profile, etc.
│   └── layout.tsx      # Shared layout
├── components/         # Reusable UI components
├── lib/                # Supabase client & helpers
├── public/             # Static assets
└── styles/             # Global styles
🚀 Deployment
Deployed using Vercel
Backend hosted via Supabase

📩 Submission Info
🔗 GitHub: https://github.com/215N1F00A1/cyber-thread

🔗 Live: https://cyber-thread.vercel.app

📧 Email: [Submit to ciaancybertech@gmail.com or hr@ciaancybertech.com]

🙌 Acknowledgements
Thanks to CIAAN Cyber Tech Pvt. Ltd for the opportunity to build and learn through this real-world project.

📌 License
This project is licensed under the MIT License – feel free to use or extend it.
