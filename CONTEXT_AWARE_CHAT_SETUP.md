# 🧠 Context-Aware Chat Widget - Complete Setup Guide

## Overview
The ChatWidget is now fully integrated into DrugForge! It's a floating AI assistant that automatically sees what molecules and predictions the researcher is analyzing, then provides intelligent insights without requiring the user to explain their current context.

---

## ✅ What Was Built

### 1. **Backend Chat Endpoint** (`backend/routers/chat.py`)
- Secure FastAPI route: `POST /api/chat/ask`
- Takes user message + invisible context (SMILES, predictions, etc.)
- Injects context into system prompt for Gemini 1.5 Pro
- **API key NEVER reaches frontend** — security by design

### 2. **Global Context Tracking** (`src/context/DrugForgeContext.jsx`)
- New state: `activeContext` — stores what researcher is viewing
- New setter: `setActiveContext()` — LabBench calls this with SMILES + results
- Available to all components via `useDrugForge()` hook

### 3. **Floating Chat Widget** (`src/components/ChatWidget.jsx`)
- Beautiful glass-morphism UI matching DrugForge aesthetic
- Expands from minimized button to full chat window
- Shows context indicator: what molecule is being analyzed
- Auto-scroll to latest message
- Real-time loading states

### 4. **Lab Bench Integration** (`src/components/LabBench.jsx`)
- Automatically sends analysis results to `activeContext`
- Whenever predictions run, the AI knows what's being analyzed
- No extra UI burden — it just happens

### 5. **Frontend App Integration** (`src/App.jsx`)
- ChatWidget rendered globally on every page
- Always available via floating button

---

## 🚀 Setup Instructions

### Step 1: Get a Gemini API Key
1. Go to **[Google AI Studio](https://aistudio.google.com/)**
2. Click **"Get API Key"** (top-left button)
3. Create a new API key
4. Copy the key

### Step 2: Set Backend Environment Variables

**Create or update your `backend/.env`:**

```bash
# ... existing variables ...

# Google Gemini API (for Context-Aware Chat)
GEMINI_API_KEY=paste-your-key-here
```

### Step 3: Install Dependencies

**Backend:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

The new dependency `google-generativeai>=0.3.0` will be installed automatically.

**Frontend:**
Frontend dependencies are already installed (axios is used for API calls).

### Step 4: Start Backend & Frontend

**Backend (in one terminal):**
```bash
cd backend
source venv/bin/activate
ENVIRONMENT=production uvicorn main:app --host 0.0.0.0 --port 5001 --log-level info
```

**Frontend (in another terminal):**
```bash
npm run dev
```

### Step 5: Test It Out

1. Go to **http://localhost:5173/app/analyze**
2. Enter a SMILES (e.g., `CCO` for ethanol)
3. Click **"Run All Models"**
4. Wait for predictions to complete
5. Click the **floating chat button** (bottom-right)
6. Ask questions like:
   - *"Why is this toxic?"*
   - *"How can I improve solubility?"*
   - *"What does this binding score mean?"*
   - *"Should I add a substituent?"*

The AI will instantly know you're analyzing ethanol and all its predictions! 🎉

---

## How It Works (Behind the Scenes)

### Flow Diagram:
```
1. User enters SMILES in LabBench
   ↓
2. LabBench runs predictions via FastAPI
   ↓
3. LabBench calls setActiveContext({smiles, results, ...})
   ↓
4. ChatWidget reads activeContext from global state
   ↓
5. User types question → ChatWidget sends to /api/chat/ask
   ↓
6. Backend receives: { message, context }
   ↓
7. Backend injects context into system prompt
   ↓
8. Gemini sees full picture: "User is analyzing ethanol with 0.093 Toxicity score"
   ↓
9. Gemini generates scientifically-grounded response
   ↓
10. ChatWidget displays response with auto-scroll
```

### Example Context Sent to Gemini:

When the chat endpoint receives a message about ethanol's toxicity, here's what Gemini actually sees:

```
System Prompt:
You are the DrugForge AI, an expert cheminformatics assistant...

--- SCREEN CONTEXT (Researcher is currently analyzing this) ---
• smiles: CCO
• results: {solubility: 0.76, toxicity: 0.093, bbbp: 0.65, ...}
• activeTab: admet
• timestamp: 2026-02-21T...
---

Researcher Question: Why did the model flag this as Toxic?

Answer: [Gemini responds with full knowledge of what's on screen]
```

---

## 🔧 Architecture Details

### Security: API Key Protection
- **❌ Never** put GEMINI_API_KEY in frontend `.env`
- **✅ Always** put it in backend `.env` only
- **How it works:**
  1. Frontend sends: `{message, context}` to backend
  2. Backend receives it
  3. Backend adds API key to Gemini SDK
  4. Backend calls Gemini (never exposed to frontend)
  5. Backend returns only the response text
  6. Frontend displays the response

### File Structure:
```
DrugForge/
├── backend/
│   ├── routers/
│   │   └── chat.py                ← New: Chat endpoint
│   ├── main.py                    ← Updated: Registered chat router
│   ├── requirements.txt            ← Updated: Added google-generativeai
│   └── .env                        ← Updated: Added GEMINI_API_KEY
├── src/
│   ├── components/
│   │   ├── ChatWidget.jsx          ← New: Floating chat UI
│   │   ├── LabBench.jsx            ← Updated: Sends context to ChatWidget
│   │   └── ...
│   ├── context/
│   │   └── DrugForgeContext.jsx    ← Updated: Added activeContext state
│   └── App.jsx                     ← Updated: Renders ChatWidget globally
└── ...
```

---

## 📝 Example Questions You Can Ask

The AI will instantly understand your current analysis:

| Question | AI Knows |
|----------|----------|
| "Why is this toxic?" | SMILES, Toxicity score, all other predictions |
| "How can I make it less toxic?" | Entire molecular structure, toxicity reasoning |
| "Is this good for absorption?" | BBBP score, solubility, all ADMET data |
| "What functional groups affect binding?" | Exact molecular structure from SMILES |
| "Should I add a methyl group?" | Current structure, how changes affect predictions |

---

## 🎨 UI Features

### Chat Button States:
- **Minimized**: Cyan gradient button with "Chat" label (bottom-right)
  - Hover scales up with glow effect
  - Shows it's ready to click
  
- **Expanded**: Chat window with:
  - Header showing "DrugForge AI" with sparkle icon
  - Context indicator (shows current SMILES being analyzed)
  - Message history with scrolling
  - Input field with send button
  - Loading state while AI thinks
  - Auto-scroll to latest message

### Glass Morphism Design:
- Matches DrugForge aesthetic perfectly
- Semi-transparent with backdrop blur
- Cyan/violet gradient theme
- Works on any background

---

## 🚨 Troubleshooting

### Chat Button Doesn't Appear?
- Check browser console for errors
- Verify `ChatWidget` is imported in `App.jsx`
- Restart dev server

### "Failed to connect to AI engine" Error?
- Check `GEMINI_API_KEY` is set in `backend/.env`
- Restart backend server
- Verify API key is valid (test on [aistudio.google.com](https://aistudio.google.com))

### Context Not Updating?
- Run predictions first (LabBench shows results)
- Then open chat widget — context should display below header
- If still blank, check browser console

### Slow Responses?
- Gemini 1.5 Pro can take 5-10 seconds for complex reasoning
- This is normal — it's thinking deeply about the context!
- Loading spinner shows it's working

---

## 🔮 Next Steps & Ideas

### Now That Context-Aware AI Exists:
1. **Batch Context**: Send entire batch analysis to chat
   - *"Why do these 10 molecules have low solubility?"*
   
2. **Molecule Comparison**: Compare molecules side-by-side
   - *"Why is CCO less toxic than CC(C)O?"*
   
3. **Synthesis Suggestions**: AI suggests synthetic routes
   - *"How would you synthesize this optimized version?"*
   
4. **Literature Search**: AI finds relevant papers
   - *"Show me papers on optimizing this scaffold"*

5. **Conversation History**: Remember multi-turn discussions
   - Build on previous questions in the same analysis session

---

## 📚 API Documentation

### POST `/api/chat/ask`

**Request:**
```json
{
  "message": "Why is this toxic?",
  "context": {
    "smiles": "CCO",
    "results": {
      "solubility": 0.76,
      "toxicity": 0.093,
      "bbbp": 0.65
    },
    "activeTab": "admet"
  }
}
```

**Response:**
```json
{
  "reply": "The Toxicity score of 0.093 is quite low, actually. This suggests ethanol has low toxicity risk..."
}
```

---

## 🎓 Next Phase Ideas

When you're ready to extend this:

- **Video Analysis**: "Analyze this movie of my docking simulation"
- **File Upload**: "Analyze this CSV of 100 compounds"
- **Voice Input**: "Talk to the AI, don't type"
- **Export Reports**: "Create a PDF analysis for my advisor"
- **Save Conversations**: "Load my analysis from yesterday"

---

## ✨ You've Built Something Special

The Context-Aware Chat Widget transforms DrugForge from a calculation tool into an **interactive research partner**.

Researchers can now ask natural questions. The AI always knows what's on screen. No more explaining your data — the AI sees it.

**This is the future of computational chemistry.** 🧪🤖

---

**Questions?** Check the console for error messages and verify:
1. Backend .env has GEMINI_API_KEY
2. Backend is running (`uvicorn main:app`)
3. Frontend is running (`npm run dev`)
4. Browser console has no JavaScript errors
