# VidhiSahayak — AI-Powered Indian Legal Copilot

India's AI-powered legal assistance platform supporting 12+ Indian languages. Get legal guidance, generate ready-to-print documents, and consult verified lawyers.

---

## 📁 Project Structure

```
vidhi_sahayak/
├── frontend/          # Next.js 16 application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/
│   │   ├── contexts/  # AuthContext (JWT auth)
│   │   └── lib/       # api-client, lang-utils, categories, etc.
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── backend/           # Node.js + Express API
│   ├── controllers/   # authController, chatController, lawyerController, ttsController
│   ├── middleware/    # JWT auth, rate limiting
│   ├── models/        # Mongoose models (User, ChatSession, Document, Consultation)
│   ├── routes/        # Express route files
│   ├── config/        # MongoDB connection
│   ├── server.js      # Entry point
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml # Runs frontend + backend + MongoDB together
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- A Gemini / OpenAI API key (for AI chat)

---

### Backend

```bash
cd backend
cp .env.example .env    # Fill in MONGODB_URI, JWT_SECRET, GEMINI_API_KEY
npm install
npm run dev             # Starts on http://localhost:5000
```

**Key env vars:**
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs (use a long random string) |
| `GEMINI_API_KEY` | Google Gemini API key for AI chat |
| `GOOGLE_TTS_API_KEY` | Google Text-to-Speech API key |
| `PORT` | Server port (default: 5000) |

---

### Frontend

```bash
cd frontend
cp .env.example .env.local   # Set NEXT_PUBLIC_BACKEND_URL
npm install
npm run dev                   # Starts on http://localhost:3000
```

**Key env vars:**
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Express backend URL (e.g. `http://localhost:5000/api`) |

---

### Docker Compose (runs everything)

```bash
# Create .env at root with your secrets
JWT_SECRET=your_long_secret
GEMINI_API_KEY=your_key

docker-compose up --build
# Frontend → http://localhost:3000
# Backend  → http://localhost:5000
# MongoDB  → localhost:27017
```

---

## 🏗️ Architecture

```
Browser
  ↓  HTTPS
AWS Amplify (Next.js frontend)
  ↓  HTTP + JWT Bearer token
AWS Elastic Beanstalk (Express backend :5000)
  ↓  Mongoose ODM
MongoDB Atlas
```

### API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register user |
| `POST` | `/api/auth/login` | Login, returns JWT |
| `GET` | `/api/auth/me` | Get current user (auth required) |
| `POST` | `/api/chat` | AI legal chat (optional auth) |
| `GET` | `/api/lawyers` | List lawyers with filters |
| `GET` | `/api/lawyers/:id` | Single lawyer profile |
| `POST` | `/api/tts` | Text-to-speech synthesis |
| `GET` | `/health` | Health check |

---

## ☁️ AWS Deployment

### Backend → Elastic Beanstalk
1. Zip the `backend/` folder (excluding `node_modules`)
2. Create a new Node.js Elastic Beanstalk application
3. Set environment variables in EB configuration
4. Deploy the ZIP

### Frontend → AWS Amplify
1. Connect this GitHub repo to Amplify
2. Set build command: `cd frontend && npm run build`
3. Set environment variable: `NEXT_PUBLIC_BACKEND_URL=https://your-eb-url.amazonaws.com/api`

### Database → MongoDB Atlas
1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Choose AWS as cloud provider, same region as backend
3. Copy connection string into `MONGODB_URI`
