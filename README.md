# Dynamic.xyz Web3 Message Signer & Verifier Task

This project is a full-stack web app built with **Next.js** (frontend) and **Node.js/Express** (backend) that lets users sign and verify blockchain messages securely using Dynamic.xyz’s headless authentication.

- **Frontend:** `/app`, `/components`
- **Backend:** `/backend` folder

---

## ✨ Features

- Web3 wallet connection and custom message signing (Dynamic.xyz, headless mode)
- Signature verification using raw ethers.js on backend (no third party)
- Message/signature history (persists in localStorage)
- No database; session and history are in-memory or on client
- Modern, modular React components & custom CSS or CSS modules

---

## 🏁 Quick Start

### 1. Clone & Install

git clone <your-repo-url>
cd dynamic.xyz # or your root project folder
npm install # only installs frontend deps
cd backend
npm install
cd ..

---

### 2. Set Up Environment Variables

Create a `.env.local` file in your root project:

.env.local (at project root, NOT in backend)
NEXT_PUBLIC_DYNAMIC_ENV_ID=your_dynamic_environment_id
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

text

- Replace `your_dynamic_environment_id` with your Dynamic.xyz value.

---

### 3. Run Backend (Node/Express)

From the project root:

cd backend
node index.js # or use nodemon for auto-reload

text

- Runs on `http://localhost:4000` by default.

---

### 4. Run Frontend (Next.js)

From the project root:

npm run dev

or, if using yarn:
yarn dev
text

- Frontend runs on `http://localhost:3000`

---

## 🧩 Project Structure

app/ → Next.js app folder (app router)
components/ → All React components: Header, SignMessage, History
layout.tsx → App shell, context providers
page.tsx → Main page, uses modular components

backend/ → Node.js + Express backend (signature verification)
index.js
package.json

.env.local → Secrets and config variables (see above)

text

---

## 🤖 Development Notes

- **No DB used:** All message history in browser storage; session is frontend context/in-memory.
- **No widget**: Uses Dynamic SDK headless API only (all UI custom).
- **Signature verify API:** `/verify-signature` (handled by ethers.js in backend, not any SaaS).
- Change endpoints/port in `.env.local` and `backend/index.js` as needed.

---

## 💡 Troubleshooting

- **localStorage error in SSR?**: All access is done in `useEffect` and is safe for Next.js.
- **Multiple lockfile warning?** Delete stray `package-lock.json` from root if not needed.
- **Signature still fails verify?** Check message whitespace and content is exactly the same in sign and verify.

---

## 📖 Scripts

All scripts run from root unless noted.

| Command                     | Description                     |
| --------------------------- | ------------------------------- |
| npm run dev                 | Run frontend app (Next.js)      |
| cd backend && node index.js | Run backend server              |
| npm install                 | Install dependencies (frontend) |
| (cd backend && npm install) | Install backend dependencies    |

## Trade-offs & Potential Improvements

- No DB: For simplicity and per requirements, all history is per-browser localStorage. For multi-device history, would add DB + user auth.
- No global state manager: Local state & context is sufficient for current scope, but scalable apps may benefit from Zustand/Jotai.
- Testing: Used minimal/sample tests for demonstration. In production, would add more edge-case/unit/integration coverage.
- Environment variables: All API endpoints/config through `.env.local` for security and easy migration.

### Areas to Improve

- Responsive/small screen optimizations
- UX: Copy-to-clipboard toast, notifications
- Real database or session sync if needed for "real" users
