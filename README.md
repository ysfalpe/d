# Shotsy ✨

> Create stunning App Store & Google Play screenshots in seconds with AI-powered caption generation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ysfalpe/d)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **AI-Powered Captions** - Describe your app, get compelling marketing copy instantly
- **Beautiful Templates** - Modern, minimalist designs that convert
- **All Sizes Included** - Export for iPhone, iPad, and Android in one click
- **Device Frames** - Automatically wrap screenshots in the latest device frames
- **No Design Skills Required** - Upload → Generate → Download

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: CSS Modules
- **Authentication**: [Clerk](https://clerk.com/)
- **Payments**: [Polar](https://polar.sh/)
- **Database**: PostgreSQL + [Prisma](https://prisma.io/)
- **AI**: [OpenRouter](https://openrouter.ai/) (Gemini 2.5 Flash)
- **Hosting**: [Vercel](https://vercel.com/)

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Clerk account
- Polar account
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ysfalpe/d.git
cd d
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Database
DATABASE_URL=postgresql://...

# Polar
POLAR_ACCESS_TOKEN=...
POLAR_PRODUCT_ID=...
POLAR_WEBHOOK_SECRET=...

# OpenRouter
OPENROUTER_API_KEY=...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Set up the database:
```bash
npx prisma migrate dev
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── actions/           # Server Actions
│   ├── api/               # API routes (webhooks)
│   ├── blog/              # Blog pages
│   ├── editor/            # Screenshot editor
│   ├── pricing/           # Pricing page
│   └── ...
├── components/            # React components
│   ├── editor/           # Editor components
│   ├── layout/           # Header, Footer
│   ├── modals/           # Modal dialogs
│   └── ui/               # UI primitives
└── lib/                  # Utilities
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | PostgreSQL connection string |
| `POLAR_ACCESS_TOKEN` | Polar API token |
| `POLAR_PRODUCT_ID` | Polar product ID for subscriptions |
| `POLAR_WEBHOOK_SECRET` | Polar webhook signing secret |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Questions? Reach out at [ifytech77@gmail.com](mailto:ifytech77@gmail.com)

---

Made with ❤️ for indie developers
