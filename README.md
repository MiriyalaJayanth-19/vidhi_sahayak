# VidhiSahayak - Your Legal Assistant

VidhiSahayak is a modern, AI-powered legal assistance platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides users with legal guidance, document generation, and lawyer consultation services through an intuitive interface.

## ✨ Features

- **AI-Powered Legal Assistance**: Get instant answers to your legal queries using advanced AI
- **Voice Search**: Hands-free search using voice commands
- **Document Generation**: Create ready-to-print legal documents
- **Lawyer Consultation**: Connect with verified legal professionals
- **Category-based Navigation**: Easily find information by legal categories
- **Dark Mode**: Built-in dark theme support
- **Responsive Design**: Works seamlessly on all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with dark mode support
- **UI Components**: shadcn/ui
- **Type Safety**: TypeScript
- **Icons**: Lucide Icons
- **Form Handling**: React Hook Form
- **State Management**: React Context API
- **Backend**: Next.js API Routes
- **Database**: Supabase (for future authentication and data storage)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vidhisahayak.git
   cd vidhisahayak
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Add other environment variables as needed
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/new) and import your repository
3. The project will be automatically detected as a Next.js project
4. Add your environment variables
5. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
src/
├── app/                 # App Router routes
│   ├── api/            # API routes
│   ├── categories/      # Category pages
│   ├── documents/       # Document generation
│   ├── consultation/    # Lawyer consultation
│   └── ...
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── navbar.tsx      # Navigation bar
│   └── ...
├── lib/                # Utility functions and configs
│   ├── categories.ts   # Legal categories data
│   └── ...
└── styles/             # Global styles
```


## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI Components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

💡 **Note**: This project is currently in development. Some features might be placeholders or under active development.

## Roadmap

- Auth and roles (user/lawyer/consultant) with onboarding
- Real database (Supabase) for categories, lawyers, consultations
- Payments for bookings
- AI chat integration with retrieval
