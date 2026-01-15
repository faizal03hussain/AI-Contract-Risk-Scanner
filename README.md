<<<<<<< HEAD
# ContractLens AI - AI Contract Risk Scanner

<div align="center">

![ContractLens AI](https://img.shields.io/badge/AI-Contract%20Analysis-8B5CF6)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

**Upload a contract → get risks + safer alternatives in 30 seconds**

[Live Demo](#) | [Features](#features) | [Setup](#setup) | [Architecture](#architecture)

</div>

---

## 🎯 Overview

ContractLens AI is an enterprise-grade web application that analyzes contract PDFs using AI and provides:

- **Risk Score (0-100)** with visual dashboard
- **Clause-by-clause analysis** with severity levels
- **Highlighted risky text** with explanations
- **Suggested safer alternatives** with negotiation tips
- **Executive summary** of top risks
- **Interactive chat** with citations
- **Exportable reports**

Built for startup founders, HR teams, sales teams, freelancers, and legal ops as a first-pass screening tool before sending contracts to legal review.

---

## ✨ Features

### 🔍 **Risk Analysis**
- Overall risk score with color-coded visual indicator
- Category breakdown: Termination, Payment, Liability, IP, Confidentiality, etc.
- Severity levels: Low, Medium, High, Critical
- Confidence scores for each finding

### 📝 **Clause Detection**
- Automatic extraction and classification
- Evidence citations with page numbers
- "Why it's risky" explanations
- Suggested safer rewrites
- Negotiation tips for each risk

### 💬 **Chat with Contract**
- RAG-powered Q&A
- Questions like "Can they terminate anytime?" or "Who owns the IP?"
- Answers with citations and page references
- Suggested question chips for common queries

### 📄 **PDF Viewer**
- Page navigation with zoom controls
- Highlight overlays for risky clauses
- Click citation to jump to page
- Side-by-side evidence display

### 🎨 **Premium UI/UX**
- Dark mode with gradient aesthetics
- Animated risk score circle
- Interactive expandable risk cards
- Smooth transitions and hover effects
- Glassmorphism design elements
- Mobile responsive

### 🔒 **Security & Privacy**
- **Privacy by default**: No storage of contract text
- Only analysis results saved (if enabled)
- Rate limiting per IP (10 requests/hour)
- Prompt injection protection
- Content redaction in logs

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenRouter API key ([get one here](https://openrouter.ai/))

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/faizal03hussain/AI-Contract-Risk-Scanner.git
cd AI-Contract-Risk-Scanner

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OPENROUTER_API_KEY
\`\`\`

### Environment Variables

Create a \`.env\` file:

\`\`\`env
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL_FAST=openai/gpt-4o-mini
OPENROUTER_MODEL_REASONING=openai/gpt-4o
MAX_PDF_MB=5
MAX_PAGES=10
RATE_LIMIT_PER_HOUR=10
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) and start analyzing contracts!

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.7
- **Styling**: TailwindCSS 3.4 + shadcn/ui
- **State**: Zustand
- **Animations**: Framer Motion
- **AI**: OpenRouter API (GPT-4o, GPT-4o-mini)
- **PDF**: react-pdf + pdfjs-dist
- **Validation**: Zod schemas

### Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Landing page
│   ├── app/page.tsx          # Main application
│   ├── privacy/page.tsx      # Privacy policy
│   ├── terms/page.tsx        # Terms of service
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── upload-zone.tsx       # Drag-and-drop upload
│   ├── pdf-viewer.tsx        # PDF display
│   ├── risk-score-card.tsx   # Animated risk score
│   ├── risk-breakdown.tsx    # Category breakdown
│   ├── risks-table.tsx       # Interactive risk table
│   ├── suggested-edits.tsx   # Safer alternatives
│   ├── top-risks.tsx         # Executive summary
│   └── contract-chat.tsx     # Q&A interface
├── lib/
│   ├── schema.ts             # Zod schemas
│   ├── utils.ts              # Utility functions
│   ├── store.ts              # Zustand state
│   ├── openrouter.ts         # AI client
│   └── rate-limit.ts         # Rate limiting
└── types/
    └── index.ts              # TypeScript types
\`\`\`

### AI Pipeline

1. **Upload PDF** → Client-side file validation
2. **Extract Text** → Server-side PDF parsing (per page)
3. **LLM Call #1** → Fast model for clause extraction
4. **LLM Call #2** → Reasoning model for risk analysis + rewrites
5. **Zod Validation** → Ensure structured output
6. **Render UI** → Display risks, scores, suggestions
7. **Chat (RAG)** → Retrieve relevant chunks + answer with citations

---

## 📊 Screenshots

### Landing Page
Premium hero section with gradient background and feature highlights.

### Risk Dashboard
Animated circular risk score, category breakdown with progress bars, and top 5 risks.

### Risk Analysis
Expandable risk cards showing evidence, suggested rewrites, and negotiation tips.

### Chat Interface
Interactive Q&A with suggested questions and page citations.

---

## 🔧 Configuration

### File Limits

Adjust in \`.env\`:
- \`MAX_PDF_MB\`: Maximum file size (default: 5MB)
- \`MAX_PAGES\`: Maximum pages to process (default: 10)

### Rate Limiting

- \`RATE_LIMIT_PER_HOUR\`: Requests per IP per hour (default: 10)
- Configurable in \`lib/rate-limit.ts\`

### AI Models

- **Fast model** (\`OPENROUTER_MODEL_FAST\`): For clause extraction
- **Reasoning model** (\`OPENROUTER_MODEL_REASONING\`): For risk analysis

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Set these in Vercel:
- \`OPENROUTER_API_KEY\`
- \`OPENROUTER_MODEL_FAST\`
- \`OPENROUTER_MODEL_REASONING\`
- \`MAX_PDF_MB\`
- \`MAX_PAGES\`
- \`RATE_LIMIT_PER_HOUR\`
- \`NEXT_PUBLIC_SITE_URL\` (your production URL)

---

## ⚠️ Important Disclaimers

**This tool is NOT a substitute for legal advice.**

- Provides automated analysis for informational purposes only
- AI-generated output may contain errors or inaccuracies
- Not tailored to specific legal jurisdictions
- Always consult qualified attorneys before making legal decisions

---

## 🛡️ Security

- **Privacy by design**: Contracts processed in memory, not stored by default
- **Rate limiting**: 10 requests/hour per IP (configurable)
- **Prompt injection protection**: AI system prompts explicitly ignore document instructions
- **Content redaction**: Raw contract text never logged
- **HTTPS only**: All API calls encrypted

---

## 🤝 Contributing

This is a portfolio project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🙌 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [OpenRouter](https://openrouter.ai/)
- Icons from [Lucide](https://lucide.dev/)

---

## 📧 Contact

For questions or feedback:
- GitHub: [@faizal03hussain](https://github.com/faizal03hussain)
- Repository: [AI-Contract-Risk-Scanner](https://github.com/faizal03hussain/AI-Contract-Risk-Scanner)

---

<div align="center">

**Built with ❤️ for safer contracts**

</div>
=======
# AI-Contract-Risk-Scanner
AI Contract Risk Scanner
>>>>>>> c152a15c223f1858e0aebc324eef802b0f66660b
