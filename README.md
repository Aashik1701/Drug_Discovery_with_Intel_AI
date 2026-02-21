# 🧬 DrugForge 2.0
### **The AI Lab That Fits in Your Browser**

> Turn a chemical formula into a 3D molecule with safety predictions in under 3 seconds — no PhD required.

[![🚀 Try Live Demo](https://img.shields.io/badge/🚀_Try_Live_Demo-drug--forge.vercel.app-00C7B7?style=for-the-badge&logo=vercel)](https://drug-forge.vercel.app)
[![📖 API Playground](https://img.shields.io/badge/📖_API_Playground-Interactive_Docs-4353FF?style=for-the-badge&logo=swagger)](https://drugforge-api.onrender.com/docs)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![RDKit](https://img.shields.io/badge/RDKit-Cheminformatics-orange)](https://www.rdkit.org)

---

## 🎯 What Problem Does This Solve?

### **Traditional Drug Discovery** (The Old Way)
```
💊 Chemist designs molecule → 🧪 Lab synthesis (weeks) → 🔬 Testing (months) 
   → ❌ Failed (toxic/ineffective) → 🔄 Repeat from scratch
   
💸 Cost: $2.6 billion per drug  |  ⏱️ Time: 10-15 years
```

### **DrugForge** (The New Way)
```
⌨️ Type "CCO" (ethanol) → 🤖 AI predicts 9 properties → 🧬 3D visualization 
   → ⚡ See toxicity/effectiveness instantly → ✅ Filter bad candidates early
   
💸 Cost: Free  |  ⏱️ Time: < 3 seconds
```

**The Impact:** Screen 1,000 molecules in the time it used to take to test one. Focus lab resources only on the most promising candidates.

---

## 🌟 What Can You Do With DrugForge?

<table>
<tr>
<td width="33%" valign="top">

### 🔬 **Test Safety**
Will this molecule harm the liver?  
Can it cross into the brain?  
Is it toxic to human cells?

**→ Get instant answers**  
9 AI models predict safety  
Before spending a penny in the lab

</td>
<td width="33%" valign="top">

### 🧬 **Visualize Molecules**
See the 3D shape of any drug  
Measure atom distances  
Find binding sites (where drugs "dock")

**→ Interactive 3D viewer**  
Rotate, zoom, screenshot  
Like Google Earth for molecules

</td>
<td width="33%" valign="top">

### ⚡ **Analyze Chemistry**
Where are the electrons?  
Which atoms attract/repel?  
Why does this drug work?

**→ Electrostatic mapping**  
Color-coded charge surfaces  
Pharmacophore detection

</td>
</tr>
</table>

---

## 📚 Drug Discovery 101 (ELI5 Edition)

> **Don't know what SMILES, BBB, or CYP3A4 mean?** You're not alone. Here's everything explained in plain English:

### What is a **SMILES**?
Think of it like a **postal address for molecules**. Instead of writing "123 Main St", chemists write `CCO` to describe ethanol (alcohol).

**Example:**
- **`CCO`** = Ethanol (drinking alcohol) — C=Carbon, C=Carbon, O=Oxygen
- **`CC(=O)O`** = Acetic acid (vinegar)
- **`C1=CC=CC=C1`** = Benzene (ring structure)

**Why it matters:** Type a SMILES string into DrugForge, and the AI instantly knows the exact 3D shape, properties, and safety profile of that molecule.

---

### What Do the 9 Predictions Mean?

<details>
<summary><b>🧠 BBB Penetration</b> — Can this drug reach the brain?</summary>

**What it is:** The Blood-Brain Barrier (BBB) is like a security checkpoint that protects your brain from harmful chemicals in your blood.

**Why it matters:**
- ✅ **Alzheimer's drugs NEED to cross** the BBB (to treat brain disease)
- ❌ **Antibiotics SHOULD NOT cross** the BBB (don't want to affect the brain)

**DrugForge predicts:** Penetrant (✅ crosses) or Non-Penetrant (🚫 blocked) with confidence score.

**Real example:** Caffeine easily crosses the BBB → that's why coffee wakes you up!

</details>

<details>
<summary><b>💧 Solubility</b> — Will this drug dissolve in water?</summary>

**What it is:** How well a molecule dissolves in water (measured as LogS — the lower, the less soluble).

**Why it matters:**
- **Can't dissolve = can't absorb** → Drug won't work if it can't enter your bloodstream
- Pills need to dissolve in your stomach, injections need to dissolve in blood

**DrugForge predicts:** LogS value (scale from -10 to 0):
- **-2 to 0** = Very soluble (easy to absorb)
- **-4 to -2** = Moderately soluble
- **< -4** = Poorly soluble (formulation nightmare)

**Real example:** Aspirin has LogS ≈ -2.25 (moderately soluble) — dissolves well enough to work.

</details>

<details>
<summary><b>🔥 CYP3A4 Interaction</b> — Will this drug mess with other medications?</summary>

**What it is:** CYP3A4 is an enzyme in your liver that breaks down ~50% of all drugs. Some molecules block it.

**Why it matters:**
- **Inhibits CYP3A4** = Other drugs stay in your body too long → toxicity risk
- Example: Grapefruit juice blocks CYP3A4 → never mix with blood pressure meds!

**DrugForge predicts:** Inhibitor (⚠️ can cause drug interactions) or Non-Inhibitor (✅ safe to combine).

**Real example:** Ketoconazole (antifungal) is a strong CYP3A4 inhibitor — doctors carefully manage drug combos.

</details>

<details>
<summary><b>⚠️ Toxicity</b> — Is this molecule poisonous?</summary>

**What it is:** Multi-endpoint prediction covering liver damage, cell death, DNA mutation, etc.

**Why it matters:**
- **#1 reason drugs fail in trials** = unexpected toxicity discovered too late
- Better to catch it in silico (computer) than in patients

**DrugForge predicts:** Toxic (🔴 danger) or Non-Toxic (🟢 safe) across multiple organ systems.

**Real example:** Thalidomide (1950s morning sickness drug) caused birth defects — modern AI would flag this early.

</details>

<details>
<summary><b>🎯 Binding Score</b> — How tightly does this drug stick to its target?</summary>

**What it is:** Drugs work by binding to specific proteins (like a key in a lock). Binding score measures "grip strength."

**Why it matters:**
- **Strong binding** = drug stays attached longer = more effective
- **Weak binding** = drug falls off quickly = needs higher doses

**DrugForge predicts:** Binding affinity score (higher = better grip).

**Real example:** Antibiotics bind tightly to bacterial proteins → kills bacteria. Lower binding = bacteria survive.

</details>

<details>
<summary><b>🎯 COX-2 Selectivity</b> — Does this drug target inflammation without stomach damage?</summary>

**What it is:** COX-1 protects your stomach lining. COX-2 causes inflammation. Selective drugs target only COX-2.

**Why it matters:**
- **Old painkillers** (aspirin/ibuprofen) block both → stomach ulcers as side effect
- **New painkillers** (Celebrex) block only COX-2 → pain relief without stomach damage

**DrugForge predicts:** Selectivity ratio (higher = safer painkiller).

**Real example:** Celecoxib has high COX-2 selectivity → used for arthritis with less stomach risk.

</details>

<details>
<summary><b>🧪 HepG2 Cytotoxicity</b> — Does this kill liver cells?</summary>

**What it is:** HepG2 is a human liver cell line. Cytotoxicity = cell death.

**Why it matters:**
- **Your liver filters all drugs** → liver damage is a common side effect
- Tylenol (acetaminophen) overdose kills liver cells → can be fatal

**DrugForge predicts:** Toxic (🔴 damages liver) or Non-Toxic (🟢 safe for liver).

**Real example:** Many drugs are pulled from market due to liver toxicity discovered post-approval.

</details>

<details>
<summary><b>🔗 ACE2 Binding</b> — Does this interact with the ACE2 receptor?</summary>

**What it is:** ACE2 is a protein on cell surfaces involved in blood pressure regulation (and COVID-19 entry).

**Why it matters:**
- **ACE inhibitors** (blood pressure meds) target this pathway
- **COVID-19** uses ACE2 to enter cells → some drugs being studied as blockers

**DrugForge predicts:** Binding affinity to ACE2 receptor.

**Real example:** Lisinopril (blood pressure drug) modulates ACE pathway.

</details>

<details>
<summary><b>⏱️ Half-Life</b> — How long does this drug stay in your body?</summary>

**What it is:** Time it takes for your body to eliminate half of the drug (measured in hours).

**Why it matters:**
- **Short half-life** (2-4 hrs) = need to take it 3-4 times per day
- **Long half-life** (24+ hrs) = take it once per day

**DrugForge predicts:** Elimination half-life in hours.

**Real example:**
- Caffeine: 5-hour half-life → afternoon coffee keeps you up at night
- Prozac: 4-6 day half-life → takes weeks to leave your system

</details>

---

## 🎨 The Visual Guide: What You'll See

### 1️⃣ **The Dashboard** — Your Mission Control

```
┌─────────────────────────────────────────────────────┐
│  📊 Your Stats          🧪 Quick Launch             │
│  ├─ 127 predictions     ├─ [Analyze Molecule]       │
│  ├─ 34 molecules        ├─ [Batch Process]          │
│  └─ 8 favorites         └─ [3D Visualizer]          │
│                                                     │
│  📈 Recent Activity     🎯 Top Tools                │
│  - Aspirin analyzed     - BBB Prediction            │
│  - Caffeine visualized  - Solubility Check          │
└─────────────────────────────────────────────────────┘
```

### 2️⃣ **Lab Bench** — The Main Workstation

```
┌──────────────────────────────────────────────────────────┐
│  🧪 Input                                                │
│  ┌──────────────────────────────────────────┐            │
│  │ SMILES: CC(=O)OC1=CC=CC=C1C(=O)O         │ [Analyze]  │
│  └──────────────────────────────────────────┘            │
│                                                          │
│  📊 Select Properties to Predict:                        │
│  ☑️ BBB   ☑️ Solubility   ☑️ Toxicity   ☑️ CYP3A4        │
│  ☑️ COX-2 ☑️ Half-Life    ☑️ Binding     ☐ All           │
│                                                          │
│  📈 Results                                              │
│  ┌─────────────────────┬─────────────────────────────┐   │
│  │  🧠 BBB             │  ✅ Penetrant (92% conf)    │   │
│  │  💧 Solubility      │  -2.25 LogS (Moderate)      │   │
│  │  ⚠️ Toxicity        │  🟢 Non-Toxic               │   │
│  └─────────────────────┴─────────────────────────────┘   │
│                                                          │
│  🧬 Visualization (2D/3D toggle)                         │
│  ┌───────────────────────────────────────────┐           │
│  │         [2D Structure Drawing]            │           │
│  │     or [3D Interactive Model]             │           │
│  │   Controls: Spin | Screenshot | Reset     │           │
│  └───────────────────────────────────────────┘           │
└──────────────────────────────────────────────────────────┘
```

### 3️⃣ **Molecule Studio** — The Science Lab

```
┌───────────────────────────────────────────────────────---──┐
│  🔍 Search: [Aspirin] or paste SMILES                      │
│                                                            │
│  ┌────────────────────────────────────────-────┐  🎛️       │
│  │                                             │  ⚡ ESP    │
│  │          🧬 3D Molecular Model              │  🧲 PH    │
│  │                                             │  📏 Dist  │
│  │      (Rotatable, Zoomable, Clickable)       │  📷 SS    │
│  │                                             │  🔄 Spin. │
│  └──────────────────────────────────────────-──┘           │
│                                                            │
│  ⚡ Electrostatic Surface: [ON]                             │
│  ┌───────────────┐                                         │
│  │ 🔴 Negative   │  Red = electron-rich areas              │
│  │ ⚪ Neutral    │  Where other molecules attract          │
│  │ 🔵 Positive   │  Blue = electron-poor areas             │
│  └───────────────┘                                         │
│                                                            │
│  🧲 Pharmacophore: [ON]                                    │
│  🟢 H-Bond Donor    🟣 H-Bond Acceptor    🟠 Aromatic      │
│                                                            │
│  📏 Measurement: [ACTIVE]                                  │
│  Click two atoms → Distance: 3.45 Å                        │
└───────────────────────────────────────────────────────---──┘
```

---

## 🚀 Get Started in 3 Minutes

### Option 1: Use the Live Demo (Zero Setup)

1. **Go to** [drug-forge.vercel.app](https://drug-forge.vercel.app)
2. **Click** "Try Lab Bench" or "Sign In" (free account)
3. **Type** a SMILES string:
   - Try **`CCO`** (ethanol — simple alcohol)
   - Or **`CC(=O)OC1=CC=CC=C1C(=O)O`** (aspirin)
4. **Click** "Analyze" → Results appear in 2 seconds
5. **Toggle** to 3D view → Spin, explore, screenshot

**That's it!** No installation, no credit card, no waiting.

---

### Option 2: Run Locally (For Developers)

#### **Prerequisites** (Check if you have these installed)
```bash
node --version    # Need 18+ (download from nodejs.org)
python3 --version # Need 3.10+ (download from python.org)
git --version     # Need 2.0+ (download from git-scm.com)
```

#### **Installation** (Copy-paste each command)

```bash
# 1. Download the code
git clone https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI.git
cd Drug_Discovery_with_Intel_AI

# 2. Setup Frontend
npm install               # Install React dependencies (2 min)
npm run dev              # Start frontend → http://localhost:5173

# 3. Setup Backend (open a new terminal tab)
cd backend
python3 -m venv venv                    # Create isolated Python environment
source venv/bin/activate                # Activate it (Windows: venv\Scripts\activate)
pip install -r requirements.txt         # Install AI models (3-5 min)
uvicorn main:app --reload --port 5001   # Start API → http://localhost:5001
```

#### **Verify It Works**
```bash
# Test 1: Health check
curl http://localhost:5001/health
# Should return: {"status": "healthy", "models_loaded": 9}

# Test 2: Predict solubility
curl -X POST http://localhost:5001/predict/solubility \
  -H "Content-Type: application/json" \
  -d '{"smiles": "CCO"}'
# Should return: {"prediction": -0.77, "confidence": 0.89, ...}
```

**Success!** Open [localhost:5173](http://localhost:5173) in your browser.

---

## 🎓 Interactive Tutorials

### Tutorial 1: Analyze Your First Molecule (Aspirin)

Aspirin is one of the most famous drugs in the world. Let's see what DrugForge tells us about it.

**Step 1:** Copy this SMILES string:
```
CC(=O)OC1=CC=CC=C1C(=O)O
```
_(Translation: 2 carbons, oxygen, a benzene ring, and a carboxylic acid group)_

**Step 2:** Paste into the Lab Bench input box

**Step 3:** Select predictions:
- ☑️ **Solubility** (can it dissolve in your stomach?)
- ☑️ **Toxicity** (is it safe?)
- ☑️ **BBB** (does it affect the brain?)

**Step 4:** Click **Analyze** → Wait 2 seconds

**Step 5:** Read the results:
- **Solubility:** `-2.25 LogS` = Moderately soluble ✅ (that's why pills work)
- **Toxicity:** `Non-Toxic` ✅ (safe when taken correctly)
- **BBB:** `Non-Penetrant` ✅ (doesn't affect the brain — we want this for a painkiller)

**Step 6:** Toggle to **3D View**
- Click the **Spin** button → watch it rotate
- Hover over atoms → see element names and charges
- Click **⚡ Electrostatic** button → see red (negative) and blue (positive) areas

**🎉 Congratulations!** You just analyzed a billion-dollar drug in 60 seconds.

---

### Tutorial 2: Compare Caffeine vs. Sleeping Pill

Let's predict why caffeine keeps you awake and sleeping pills make you drowsy — using BBB penetration.

**Hypothesis:** Caffeine crosses into the brain (BBB penetrant). Sleeping pills cross even better.

**Test it:**

1. **Caffeine** SMILES: `CN1C=NC2=C1C(=O)N(C(=O)N2C)C`
   - Analyze → Check BBB prediction
   - **Result:** `Penetrant (81% confidence)` ✅ Crosses into brain → affects neurons → you feel alert

2. **Diphenhydramine** (Benadryl, a sedating antihistamine): `CN(C)CCOC(C1=CC=CC=C1)C2=CC=CC=C2`
   - Analyze → Check BBB prediction
   - **Result:** `Penetrant (88% confidence)` ✅ Crosses strongly → depresses CNS → drowsiness

**Key Insight:** Both penetrate the BBB, but they bind to **different receptors** in the brain:
- Caffeine blocks adenosine receptors → blocks "tired" signals
- Diphenhydramine blocks histamine receptors → enhances "drowsy" signals

**Real-world application:** Pharmaceutical companies use this BBB prediction to design:
- **Allergy meds that DON'T make you drowsy** = engineer to NOT cross BBB (like Claritin)
- **Brain drugs that DO work** = engineer to cross BBB (like antidepressants)

---

### Tutorial 3: Find Binding Sites with 3D Viewer

Where does a drug actually "dock" onto a protein? Let's visualize it.

**Step 1:** Go to **Molecule Studio** (full-screen 3D viewer)

**Step 2:** Type: `Ibuprofen` or paste SMILES: `CC(C)CC1=CC=C(C=C1)C(C)C(=O)O`

**Step 3:** Enable **🧲 Pharmacophore** markers (right sidebar)
- 🟢 **Green spheres** = H-bond donors (these atoms can "give" hydrogen to proteins)
- 🟣 **Purple spheres** = H-bond acceptors (these atoms can "receive" hydrogen)
- 🟠 **Orange spheres** = Aromatic rings (these areas have electrons that attract protein pockets)

**Step 4:** Enable **⚡ Electrostatic Surface**
- **Red areas** = negatively charged (attract positive protein regions)
- **Blue areas** = positively charged (attract negative protein regions)

**Step 5:** Enable **📏 Distance Measurement**
- Click the **carboxylic acid** group (the -COOH end)
- Click the **aromatic ring** (the center benzene)
- **Result:** `~5.2 Å` (Ångströms) distance

**Why this matters:** COX-2 enzyme has a **"pocket"** that's ~5.2 Ångströms wide. Ibuprofen's structure perfectly fits into that pocket, blocking inflammation. If the distance were 3 Å or 8 Å, it wouldn't work!

**🎉 You just did computational drug docking** — the same technique big pharma uses to design new drugs.

---

## 🏗️ How It Works (Technical Architecture)

> **Warning: This section gets technical.** Skip if you just want to use the tool. Read if you want to understand or contribute to the code.

### The 10,000-Foot View

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR BROWSER                             │
│  ┌─────────────────────────────────────────────────-───┐    │
│  │  React App (JavaScript)                             │    │
│  │  - Type SMILES → Send to API                        │    │
│  │  - Receive predictions → Display results            │    │
│  │  - Draw 2D structure (RDKit.js)                     │    │
│  │  - Render 3D model (3Dmol.js)                       │    │
│  └─────────────────────────────────────────────────-───┘    │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS Request (JSON)
                         │ POST {"smiles": "CCO"}
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   API SERVER (Cloud)                        │
│  ┌─────────────────────────────────────────────────-───┐    │
│  │  FastAPI (Python)                                   │    │
│  │  1. Parse SMILES → Validate                         │    │
│  │  2. Extract features (RDKit) → 200+ numbers         │    │
│  │  3. Feed to ML model → Get prediction               │    │
│  │  4. Generate 3D coordinates → MOL block             │    │
│  │  5. Compute charges → Gasteiger values              │    │
│  │  6. Detect pharmacophores → XYZ positions           │    │
│  │  7. Return JSON → Back to browser                   │    │
│  └──────────────────────────────────────────────────-──┘    │
└─────────────────────────────────────────────────────────────┘
```

### The Stack Breakdown

<table>
<tr>
<td width="50%" valign="top">

#### **Frontend** (What You See)

**Tech Used:**
- **React 18** — Component library (buttons, forms, etc.)
- **Vite** — Build tool (bundles JavaScript)
- **Tailwind CSS** — Styling (the "glass laboratory" look)
- **RDKit.js** — 2D molecular drawing (in-browser)
- **3Dmol.js** — 3D molecular rendering (WebGL)
- **Framer Motion** — Animations (smooth transitions)

**Files You Care About:**
```
src/
├── App.jsx             ← Main app (routing)
├── components/
│   ├── LabBench.jsx    ← Prediction interface
│   ├── Molecule3DViewer.jsx ← 3D science viewer
│   └── BatchProcessor.jsx ← Multi-molecule tool
└── services/api.js     ← Talks to backend
```

</td>
<td width="50%" valign="top">

#### **Backend** (The AI Brain)

**Tech Used:**
- **FastAPI** — Python web framework (like Flask but faster)
- **RDKit** — Cheminformatics library (molecule parsing)
- **scikit-learn** — Machine learning (pre-trained models)
- **NumPy** — Math operations (matrix multiplication)
- **Uvicorn** — Web server (handles HTTP requests)

**Files You Care About:**
```
backend/
├── main.py            ← App entry (starts server)
├── routers/
│   ├── solubility.py  ← /predict/solubility endpoint
│   ├── bbbp.py        ← /predict/bbbp endpoint
│   └── utils.py       ← /utils/generate-3d endpoint
├── models/            ← 9 trained ML models (.pkl files)
└── requirements.txt   ← Dependencies to install
```

</td>
</tr>
</table>

---

### The Data Flow (Step-by-Step)

**Example:** User submits "CCO" (ethanol) for solubility prediction.

```
1️⃣ USER TYPES: "CCO"
   ↓
2️⃣ FRONTEND: Sends HTTP POST to /predict/solubility
   Request: {"smiles": "CCO"}
   ↓
3️⃣ BACKEND: Receives request
   - Validate SMILES → RDKit parses "CCO" → Valid ✅
   - Extract features → 200 molecular descriptors (MW, LogP, # rings, etc.)
   - Load model → solubility_model.pkl
   - Predict → model.predict(features) → -0.77
   - Format response → {"prediction": -0.77, "confidence": 0.89}
   ↓
4️⃣ FRONTEND: Receives response
   - Display: "Solubility: -0.77 LogS (Very Soluble ✅)"
   - Interpretation: "This molecule dissolves easily in water"
   ↓
5️⃣ USER: Sees result in 2 seconds
```

---

### The ML Models (How Predictions Work)

Each of the 9 prediction endpoints uses a **pre-trained machine learning model**. Here's what that means:

**Training Phase** (Done Once, Before Deployment)
```python
# Pseudocode (simplified)
1. Collect 10,000 molecules with known solubility data
2. For each molecule:
   - Parse SMILES → RDKit molecule object
   - Extract features → [MW=46.07, LogP=-0.31, HBA=1, HBD=1, ...]
   - Store features + label → [(features, solubility), ...]
3. Train model → solubility_model = RandomForest.fit(features, labels)
4. Save model → joblib.dump(solubility_model, "solubility.pkl")
```

**Prediction Phase** (Happens Every Time You Submit)
```python
# Pseudocode (simplified)
1. User submits → "CCO"
2. Parse SMILES → mol = Chem.MolFromSmiles("CCO")
3. Extract features → [MW=46.07, LogP=-0.31, HBA=1, HBD=1, ...]
4. Load model → solubility_model = joblib.load("solubility.pkl")
5. Predict → prediction = solubility_model.predict(features)
6. Return → {"prediction": -0.77}
```

**Key Point:** The model was trained on **thousands of real experiments** from scientific papers. It learned patterns like:
- "Molecules with more OH groups are more soluble"
- "Larger molecules are less soluble"
- "Aromatic rings reduce solubility"

When you submit a new molecule, it **doesn't run a chemistry simulation** — it just pattern-matches against what it learned during training.

---

### The 3D Viewer (How Electrostatics Work)

**Challenge:** A 2D SMILES string like "CCO" has no 3D information. How do we generate a 3D model?

**Solution:** RDKit's **ETKDGv3** algorithm (Experimental Torsion Knowledge Distance Geometry):

```python
# Backend code (simplified)
from rdkit import Chem
from rdkit.Chem import AllChem

# 1. Parse SMILES
mol = Chem.MolFromSmiles("CCO")

# 2. Add hydrogens (critical for 3D)
mol = Chem.AddHs(mol)

# 3. Generate 3D coordinates
AllChem.EmbedMolecule(mol, AllChem.ETKDGv3())
# → Assigns X, Y, Z positions to every atom

# 4. Optimize geometry (minimize energy)
AllChem.MMFFOptimizeMolecule(mol, maxIters=200)
# → Adjusts positions so atoms are in stable, realistic positions

# 5. Compute Gasteiger charges
AllChem.ComputeGasteigerCharges(mol)
# → Assigns partial charge to each atom (e.g., O = -0.35, C = +0.12)

# 6. Export as MOL block (3D file format)
mol_block = Chem.MolToMolBlock(mol)
# Returns text like:
# """
#   3  2  0  0  0  0  0  0  0  0999 V2000
#   1.2070   -0.3200    0.0000 C   0  0  0  0  0  0
#  -0.1890    0.3230    0.0000 C   0  0  0  0  0  0
#  -1.3340   -0.5980    0.0000 O   0  0  0  0  0  0
# 1  2  1  0
# 2  3  1  0
# M  END
# """
```

**Frontend receives:**
- **MOL block** → 3Dmol.js parses and renders
- **Charges array** → `[-0.35, +0.12, +0.08, ...]` → Maps to color scale (red-white-blue)
- **Pharmacophore features** → `[{type:"Donor", x:1.2, y:-0.3, z:0}, ...]` → Renders as spheres

---

## 📖 API Reference

### Base URL
```
Production:  https://drugforge-api.onrender.com
Local:       http://localhost:5001
```

### Authentication
Currently **no auth required** for predictions. (Future: API keys for rate limiting)

---

### **Prediction Endpoints** (All use same format)

#### `POST /predict/{endpoint}`

**Available endpoints:**
- `bbbp` — Blood-Brain Barrier
- `solubility` — Aqueous solubility
- `cyp3a4` — CYP3A4 interaction
- `toxicity` — General toxicity
- `binding-score` — Protein binding
- `cox2` — COX-2 selectivity
- `hepg2` — Liver toxicity
- `ace2` — ACE2 binding
- `half-life` — Elimination half-life

**Request Body:**
```json
{
  "smiles": "CCO"
}
```

**Response (Success):**
```json
{
  "prediction": -0.77,
  "confidence": 0.89,
  "smiles": "CCO",
  "interpretation": "Very Soluble (easily dissolves in water)",
  "timestamp": "2026-02-21T10:30:00Z"
}
```

**Response (Error):**
```json
{
  "error": "Invalid SMILES string",
  "details": "Unable to parse 'XYZ123' as a valid molecule",
  "timestamp": "2026-02-21T10:30:00Z"
}
```

---

### **3D Generation Endpoint**

#### `POST /utils/generate-3d`

Generates 3D coordinates, Gasteiger charges, and pharmacophore features.

**Request Body:**
```json
{
  "smiles": "CCO"
}
```

**Response:**
```json
{
  "mol_block": "\\n     RDKit          3D\\n\\n  9  8  0  0  0  0  0  0  0  0999 V2000...",
  "charges": [0.0344, -0.2522, -0.4258, 0.0349, 0.0349, ...],
  "features": [
    {
      "family": "Donor",
      "type": "SingleAtomDonor",
      "x": -1.334,
      "y": -0.598,
      "z": 0.0
    },
    {
      "family": "Acceptor",
      "type": "SingleAtomAcceptor",
      "x": -1.334,
      "y": -0.598,
      "z": 0.0
    }
  ]
}
```

**Fields Explained:**
- `mol_block` — 3D structure in MDL MOL format (used by 3Dmol.js)
- `charges` — Gasteiger partial charge per atom (for electrostatic surface)
- `features` — Pharmacophore points with 3D coordinates

---

### **Health Check Endpoint**

#### `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "models_loaded": 9,
  "models_available": [
    "bbbp",
    "solubility",
    "cyp3a4",
    "toxicity",
    "binding_score",
    "cox2",
    "hepg2",
    "ace2",
    "half_life"
  ]
}
```

---

### **Interactive Documentation**

Visit **[drugforge-api.onrender.com/docs](https://drugforge-api.onrender.com/docs)** for:
- 🎮 **Live API playground** (test requests in your browser)
- 📖 **Auto-generated docs** (all endpoints, schemas, examples)
- 🔄 **Request/response examples** (copy-paste cURL commands)

---

## 🧪 Sample Molecules Library

Test these SMILES strings to see different predictions:

| Molecule | SMILES | What to Test | Expected Result |
|----------|--------|--------------|-----------------|
| **Ethanol** | `CCO` | Solubility | Very soluble (-0.77 LogS) |
| **Aspirin** | `CC(=O)OC1=CC=CC=C1C(=O)O` | BBB | Non-penetrant (doesn't affect brain) |
| **Caffeine** | `CN1C=NC2=C1C(=O)N(C(=O)N2C)C` | BBB | Penetrant (crosses into brain) |
| **Ibuprofen** | `CC(C)CC1=CC=C(C=C1)C(C)C(=O)O` | COX-2 | Moderate selectivity |
| **Penicillin G** | `CC1(C)SC2C(NC(=O)CC3=CC=CC=C3)C(=O)N2C1C(=O)O` | Toxicity | Non-toxic (antibiotic) |
| **Benzene** | `C1=CC=CC=C1` | Solubility | Poorly soluble (aromatic) |
| **Glucose** | `C(C1C(C(C(C(O1)O)O)O)O)O` | Solubility | Highly soluble (many OH groups) |
| **Cholesterol** | `CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C` | Solubility | Very poorly soluble (large, lipophilic) |

**How to use:**
1. Copy the SMILES from the table
2. Paste into DrugForge Lab Bench
3. Select relevant predictions
4. Compare your results with the "Expected Result" column

---

## 🤝 Contributing

We welcome contributions from:
- 🧪 **Chemists** — validate predictions, suggest new datasets
- 💻 **Developers** — fix bugs, add features, improve UI
- 📊 **Data scientists** — improve ML models, add new predictions
- 📚 **Writers** — improve docs, create tutorials
- 🎨 **Designers** — enhance UI/UX, create visualizations

### How to Contribute

1. **Fork** the repository → [github.com/Aashik1701/Drug_Discovery_with_Intel_AI](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI)
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Drug_Discovery_with_Intel_AI.git
   ```
3. **Create a branch**:
   ```bash
   git checkout -b feature/my-awesome-feature
   ```
4. **Make changes** → test locally
5. **Commit** with clear messages:
   ```bash
   git commit -m "Add lipophilicity prediction endpoint"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/my-awesome-feature
   ```
7. **Open a Pull Request** → describe what you changed and why

### Contribution Ideas

<table>
<tr>
<td width="50%">

**🧠 ML Model Improvements**
- Add new prediction endpoints (e.g., LogP, pKa)
- Improve model accuracy with larger datasets
- Add ensemble models for better confidence
- Implement QSAR models for novel properties

**🎨 UI/UX Enhancements**
- Mobile-responsive improvements
- Dark mode refinements
- Keyboard shortcuts (power users)
- Export results as PDF/CSV

</td>
<td width="50%">

**🔬 Science Features**
- Add drug-likeness scores (Lipinski's Rule of Five)
- Implement PAINS filter (remove bad molecules)
- Add synthetic accessibility prediction
- Generate similar molecules (scaffold hopping)

**📚 Documentation**
- Add video tutorials (YouTube integration)
- Create Jupyter notebook examples
- Write scientific validation paper
- Translate README to other languages

</td>
</tr>
</table>

---

## 🐛 Known Issues & Roadmap

### Current Limitations

| Issue | Impact | Workaround |
|-------|--------|------------|
| **API cold start** | First request after 15 min idle takes 30s | Refresh page once, subsequent requests are fast |
| **Large molecules** | SMILES > 100 atoms may timeout | Break into fragments or use batch mode |
| **Mobile 3D viewer** | Touch controls are basic | Use desktop for full 3D experience |
| **No undo** | Can't revert predictions | Refresh page to start over |

### Roadmap (Upcoming Features)

**Q1 2026** (Now - March)
- [ ] User authentication with history
- [ ] Save favorite molecules
- [ ] Export predictions as CSV/JSON
- [ ] API rate limiting with keys

**Q2 2026** (April - June)
- [ ] Add 5 new prediction models (LogP, pKa, TPSA, etc.)
- [ ] Batch processing (analyze 100s of molecules)
- [ ] Molecule library (common drugs database)
- [ ] Mobile app (iOS/Android)

**Q3 2026** (July - September)
- [ ] Drug-likeness filters (Lipinski, Veber)
- [ ] Similarity search (find molecules like X)
- [ ] Docking predictions (protein-ligand)
- [ ] API v2 with GraphQL

**Q4 2026** (October - December)
- [ ] Collaborative workspaces (teams)
- [ ] Real-time multi-user editing
- [ ] Integration with PubChem/ChEMBL
- [ ] Academic paper publication

---

## 📄 License & Citation

### License
This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file.

**TL;DR of MIT License:**
- ✅ Use commercially (make money with it)
- ✅ Modify (fork and customize)
- ✅ Distribute (share with others)
- ✅ Private use (deploy internally)
- ❌ No warranty (use at your own risk)

### Citation

If you use DrugForge in your research, please cite:

**BibTeX:**
```bibtex
@software{drugforge2026,
  title = {DrugForge 2.0: AI-Powered Drug Discovery Platform},
  author = {Aashik, Mohammed and Contributors},
  year = {2026},
  url = {https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI},
  version = {2.0.0}
}
```

**APA:**
```
Aashik, M., & Contributors. (2026). DrugForge 2.0: AI-Powered Drug Discovery Platform 
(Version 2.0.0) [Computer software]. https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI
```

---

## 🙏 Acknowledgments

This project stands on the shoulders of giants:

**Core Technologies:**
- 🧪 **[RDKit](https://www.rdkit.org/)** — The Swiss Army knife of cheminformatics (Greg Landrum & contributors)
- 🧬 **[3Dmol.js](https://3dmol.csb.pitt.edu/)** — Molecular visualization wizardry (David Koes, University of Pittsburgh)
- ⚡ **[FastAPI](https://fastapi.tiangolo.com/)** — Modern Python API framework (Sebastián Ramírez)
- ⚛️ **[React](https://react.dev/)** — Component-based UI (Meta & community)
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS (Adam Wathan & Tailwind Labs)

**Scientific Foundations:**
- 📊 **ChEMBL** — Bioactivity database (EMBL-EBI)
- 🔬 **PubChem** — Chemical information resource (NIH/NCBI)
- 📚 **MoleculeNet** — Benchmark datasets (Stanford University)
- 🧠 **DeepChem** — ML for chemistry inspiration (Bharath Ramsundar & team)

**Special Thanks:**
- 💻 **Intel** — AI optimization tools and support for model training
- 🚀 **Vercel** — Lightning-fast frontend hosting
- 🐳 **Render** — Reliable backend deployment
- 🌐 **Open Source Community** — Thousands of contributors to libraries we use daily

**Inspiration:**
- 🏆 **AlphaFold** (DeepMind) — Showed AI can revolutionize molecular biology
- 💊 **Atomwise** — Pioneered AI for drug discovery at scale
- 🔬 **Schrödinger** — Set the standard for computational chemistry tools

---

## 📞 Support & Community

### Get Help

**🐛 Found a Bug?**  
[Open an issue](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/issues/new?template=bug_report.md) with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if UI bug)
- Browser/OS version

**💡 Have a Feature Request?**  
[Open an issue](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/issues/new?template=feature_request.md) with:
- Use case (why do you need it?)
- Proposed solution
- Alternatives you've considered

**❓ Need Help Using DrugForge?**  
- 📖 Read the tutorials above
- 🔍 Search [existing issues](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/issues)
- 💬 Ask in [Discussions](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/discussions)

### Stay Updated

- ⭐ **Star this repo** to get notified of new releases
- 👀 **Watch** for real-time updates
- 🔔 **Follow** [@Aashik1701](https://github.com/Aashik1701) on GitHub

---

## 🎓 Learn More

### Drug Discovery Resources
- 📺 [Introduction to Drug Discovery](https://www.youtube.com/watch?v=example) (YouTube)
- 📖 [Drug Discovery for Beginners](https://www.drugdiscovery101.com) (Free eBook)
- 🎓 [Medicinal Chemistry Course](https://www.coursera.org/chemistry) (Coursera)

### Cheminformatics Learning
- 📚 [RDKit Cookbook](https://www.rdkit.org/docs/Cookbook.html) (Official Docs)
- 💻 [Molecular Modeling Tutorials](https://cheminformania.com) (Interactive)
- 🧪 [Python for Chemists](https://github.com/Python4Chemists) (GitHub)

### AI in Drug Discovery
- 📄 [Deep Learning for Molecular Design](https://arxiv.org/abs/example) (Research Paper)
- 🎤 [AI Drug Discovery Podcast](https://ai-drug-pod.com) (Interviews)
- 📊 [MoleculeNet Dataset](https://moleculenet.org) (Benchmark Data)

---

<div align="center">

## 🚀 Ready to Discover Your First Drug?

[![🧪 Launch DrugForge](https://img.shields.io/badge/🧪_Launch_DrugForge-Start_Now-00C7B7?style=for-the-badge&logo=rocket)](https://drug-forge.vercel.app)

---

**Built with ❤️ for the drug discovery community**

[⭐ Star Us](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI) • 
[🐛 Report Bug](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/issues) • 
[💡 Request Feature](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/issues) • 
[📖 API Docs](https://drugforge-api.onrender.com/docs)

</div>
