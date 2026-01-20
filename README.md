
# 🎤 AI Mock Interview Platform

An **AI-powered mock interview web application** that helps users prepare for job interviews by generating personalized interview questions using their **resume** or **job description**, and guiding them through structured mock interview sessions.

This project demonstrates **real-world AI orchestration**, **workflow automation**, **scalable backend design**, and **production-grade frontend architecture**.

---

## 🚀 What This Project Does

### ✅ Core Features
- Upload resume (PDF) and generate AI-based interview questions
- OR generate interview questions using job title & job description
- AI generates **structured interview questions + answers**
- Interview sessions stored securely in database
- Authentication & user management
- Rate-limiting to control free usage & enable premium upgrades
- Workflow-driven AI logic (not hardcoded APIs)

---

## 🧠 Why This Project Is Different

Unlike basic AI apps that directly call an LLM:
- This project uses **n8n workflows** to orchestrate AI logic
- AI outputs are **validated, normalized, and controlled**
- Production safety via **workflow duplication & versioning**
- Clean separation of **frontend, backend, AI, and database**

This reflects **industry-level architecture**, not tutorials.

---

## 🛠 Tech Stack

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** – dialogs, tabs, buttons
- **Aceternity UI** – hero sections & animations

### Backend / Infra
- **n8n** – AI workflow orchestration
- **OpenRouter** – free LLM models
- **ConvexDB** – serverless database
- **ImageKit** – resume upload & CDN
- **Clerk.ai** – authentication
- **ArcJet** – rate limiting & premium gating
- **Akool AI** – avatar-based interviews

---

## 📸 Screenshots (Add These)


### 🏠 Landing Page
![Landing Page](/public/screenshots/landing.png)

---
### 📊 Dashboard
![Dashboard](/public/screenshots/dashboard.png)

---
### 📄 Resume Upload Dialog
![Resume Upload](/public/screenshots/resume_upload.png)

---
### 🧾 Job Description Form
![Job Description](/public/screenshots/jd_upload.png)

---
### Start Your Interview
![Start Interview](/public/screenshots/start-interview.png)


---

## 🔄 Complete Project Flow (Step-by-Step)

### 1️⃣ User Authentication

* Managed using **Clerk.ai**
* User session available across app via context

---

### 2️⃣ Dashboard

* Displays existing interview sessions
* Option to create a new interview

---

### 3️⃣ Create Interview

User can choose **one of two paths**:

#### 🟣 Option A: Resume Upload

1. User uploads PDF
2. File uploaded to **ImageKit**
3. ImageKit returns public `resumeUrl`
4. `resumeUrl` sent to backend

#### 🟣 Option B: Job Description

1. User enters job title
2. User pastes job description
3. Data sent directly to backend

---

### 4️⃣ Backend API (Next.js)

* Handles file uploads
* Sends data to **n8n webhook**
* Receives normalized AI output

---

### 5️⃣ n8n AI Workflow (Core Logic)

#### Webhook Node

* Entry point for all requests

#### IF Node

* Determines:

  * Resume flow OR
  * Job description flow

---

#### Resume Flow

1. Download PDF from ImageKit
2. Extract text from PDF
3. Send extracted text to AI Agent
4. AI generates interview Q&A
5. **Edit Fields node cleans AI output**
6. Responds with valid JSON

---

#### Job Description Flow

1. Send job title + description to AI Agent
2. Generate interview Q&A
3. Normalize response
4. Return clean JSON

---

### 🔄 n8n Workflow (Very Important)

![n8n Workflow](/public/screenshots/n8n_workflow.png)
---

### 6️⃣ Data Stored in ConvexDB

```ts
InterviewSessionTable: defineTable({
  interviewQuestions: v.any(),
  resumeUrl: v.string(),
  userId: v.id("userTable"),
  status: v.string(),
});
```

---

### 7️⃣ Rate Limiting & Premium Logic

* Implemented using **ArcJet**
* Limits free mock interviews
* Designed for future paid upgrades

---

## 🧪 AI Prompt Discipline

AI is forced to return **only valid JSON**:

```json
{
  "questions": [
    {
      "question": "...",
      "answer": "..."
    }
  ]
}
```

This avoids:

* Stringified JSON
* Markdown-wrapped responses
* DB validation errors

---

## 🧩 Akool AI (Experimental)

* Tested for avatar-based voice interviews
* Dropped from final flow due to paid constraints
* Code remains modular for future integration

---

## 🖥️ Run Locally

### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd ai-mock-interview
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Environment Variables

Create a `.env.local` file:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# ImageKit
IMAGEKIT_URL_ENDPOINT=
IMAGEKIT_URL_PUBLIC_KEY=
IMAGEKIT_URL_PRIVATE_KEY=

# ArcJet
ARCJET_KEY=

# Akool (optional / experimental)
AKOOL_CLIENT_ID=
AKOOL_SEC_ID=
AKOOL_API_TOKEN=
```

---

### 4️⃣ Start Convex

```bash
npx convex dev
```

---

### 5️⃣ Start n8n

```bash
n8n start
```

---

### 6️⃣ Start Next.js App

```bash
npm run dev
```

---

## 🧠 Skills Demonstrated

* AI workflow orchestration
* Prompt engineering
* File processing & parsing
* Serverless databases
* Auth & rate limiting
* Production safety practices
* Modular architecture
* Clean API contracts

---

## 📌 Future Enhancements

* Live voice-based interview sessions
* Interview scoring & feedback
* Resume improvement suggestions
* Admin analytics dashboard

---