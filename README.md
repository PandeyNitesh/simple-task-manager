# 🧩 TaskBoard – T3 Fullstack App Deployed with SST

TaskBoard is a full-stack application built using the [T3 Stack](https://create.t3.gg), with authentication handled by **NextAuth** (credentials provider), **Supabase** as the database, and deployed on **AWS serverless** infrastructure using **SST v3** and **OpenNext**.

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/) – Frontend Framework
- [tRPC](https://trpc.io/) – Type-safe API Layer
- [Prisma](https://www.prisma.io/) – ORM for Supabase
- [Supabase](https://supabase.io/) – Postgres DB (used in dev & prod)
- [NextAuth.js](https://next-auth.js.org/) – Auth (Credentials Provider)
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [SST v3](https://sst.dev/) – Serverless infrastructure deployment
- [OpenNext](https://github.com/serverless-stack/open-next) – Adapter for deploying Next.js to AWS Lambda

---

## 🚀 Project Structure

```
/
├── app/                  # App routes
├── pages/                # Traditional pages
├── server/               # tRPC routers, Prisma client, auth config
├── utils/                # tRPC API client and helpers
├── prisma/               # schema.prisma + migrations
├── public/               # Static assets
├── styles/               # Global CSS
├── sst.config.ts         # SST deployment config
├── .env                  # Environment variables
└── README.md             # You're here
```

---

## 🧑‍💻 Development

1. **Install dependencies:**

```bash
npm install
```

2. **Run locally:**

```bash
npx prisma generate
npx prisma db push
npm run dev
```

3. **Start SST dev mode:**

```bash
npx sst dev
```

---

## ☁️ Deployment (AWS via SST)

1. **Ensure you're authenticated with AWS:**

```bash
aws configure
```

2. **Deploy to AWS:**

```bash
npx sst deploy
```

The deployed site URL will be printed after deploy.

---

## 🛠️ Environment Variables

Create a `.env` file in the root with:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-deployed-url.com
```

---

## 🔐 Authentication

- **NextAuth** is set up with **credentials provider**.
- After login, users are redirected to `/dashboard`.
- Auth sessions are managed server-side via Prisma Adapter (or direct Supabase integration).

---

## 📥 API Routes

```bash
/api/ping               # Health check
/api/auth/[...nextauth]# Auth routes
/api/trpc/[trpc]        # tRPC handler
/api/task               # Task-related API
/api/profile            # Profile details
```

---

## 📦 Build & Logs

- Build artifacts (`.next/`, `.open-next/`) are not committed to Git.
- AWS Lambda logs are viewable in **CloudWatch → Log groups** (prefixed with `/aws/lambda/`).

---

## 🧹 Notes

- Prisma binary must target `linux-arm64` for Lambda:

  In `schema.prisma`:

  ```prisma
  generator client {
    provider      = "prisma-client-js"
    binaryTargets = ["native", "linux-arm64-openssl-1.0.x"]
  }
  ```

  Then regenerate:

  ```bash
  npx prisma generate
  ```

- Do **not** push `.sst/` or `.open-next/` folders to Git.

---

## 📄 License

MIT

---

## ✨ Credits

Built with ❤️ using the [T3 Stack](https://create.t3.gg) and [SST](https://sst.dev/)
