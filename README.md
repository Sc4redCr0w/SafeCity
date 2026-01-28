# SafeCity - Crime Analytics & Prediction Platform

A comprehensive crime analytics and prediction platform leveraging machine learning to help law enforcement agencies predict, prevent, and protect cities from crime.

## 🎯 Features

- **Crime Analytics Dashboard** - Real-time crime statistics and trends across Indian cities
- **Crime Prediction** - ML-powered risk assessment with interactive maps
- **Accident Risk Prediction** - Location-based accident risk analysis
- **FIR Management** - First Information Report management system
- **Interactive Maps** - Leaflet-based map visualization with crime heatmaps
- **3D Globe Visualization** - Rotating globe background on landing page
- **Professional UI** - Dark theme with Tailwind CSS and lucide-react icons

## 📋 Tech Stack

### Frontend
- **Next.js 16.1.5** (React framework with Turbopack)
- **React 19+**
- **TypeScript**
- **Tailwind CSS**
- **Leaflet** (Map visualization)
- **Three.js** (3D Globe)
- **lucide-react** (Icons)

### Backend
- **FastAPI** (Python web framework)
- **Uvicorn** (ASGI server)
- **Pandas** (Data manipulation)
- **NumPy** (Numerical computing)
- **scikit-learn** (Machine Learning)
- **Pickle** (Model serialization)

### Database
- **CSV files** for data storage (crime dataset, FIR records)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Conda (recommended)

### Backend Setup

1. **Create and activate Conda environment:**
```bash
conda create -n safecity python=3.9
conda activate safecity
```

2. **Install Python dependencies:**
```bash
cd SafeCity/backend
pip install fastapi uvicorn pandas numpy scikit-learn requests
```

3. **Verify installation:**
```bash
python -c "import fastapi; import pandas; import numpy; import sklearn; print('All packages installed successfully')"
```

### Frontend Setup

1. **Install Node dependencies:**
```bash
cd SafeCity/frontend/safe
npm install
```

2. **Install additional packages (if not already included):**
```bash
npm install three @types/three leaflet react-leaflet lucide-react
```

3. **Verify installation:**
```bash
npm list
```

## 🚀 Running the Project

### Start Backend (Terminal 1)
```bash
conda activate safecity
cd SafeCity/backend
python api.py
```
Backend runs on: `http://127.0.0.1:8001`

### Start Frontend (Terminal 2)
```bash
cd SafeCity/frontend/safe
npm run dev
```
Frontend runs on: `http://localhost:3000`

## 📁 Project Structure

```
SafeCity/
├── backend/
│   ├── api.py                          # FastAPI application
│   ├── fir.csv                         # FIR records database
│   └── model/
│       ├── crime_risk_model.pkl        # Crime prediction model
│       ├── accident_risk_model.pkl     # Accident prediction model
│       ├── crime_type_model.pkl        # Crime type predictor
│       ├── crime_type_encoder.pkl      # Label encoder
│       ├── accident_model.py           # Accident model training
│       ├── crime_model.py              # Crime model training
│       ├── crime_type_predictor.py     # Crime type model training
│       └── indian_crimes_csv/
│           └── crime_dataset_india.csv # Crime dataset (39,960+ records)
│
└── frontend/
    └── safe/
        ├── package.json
        ├── src/
        │   ├── app/
        │   │   ├── layout.tsx           # Root layout with navbar
        │   │   ├── page.tsx             # Home page
        │   │   ├── landing/page.tsx     # Landing page with 3D globe
        │   │   ├── dashboard/page.tsx   # Dashboard
        │   │   ├── crime-analytics/     # Crime analytics page
        │   │   ├── crime-prediction/    # Crime prediction page
        │   │   ├── fir/page.tsx         # FIR management
        │   │   ├── predict/page.tsx     # Citywise prediction
        │   │   └── predict-accident/    # Accident prediction
        │   ├── components/
        │   │   ├── Navbar.tsx           # Global navbar
        │   │   ├── Globe3D.tsx          # 3D rotating globe
        │   │   ├── CrimePredictionMap.tsx
        │   │   ├── PredictionMap.tsx
        │   │   ├── FilteredHeatmapMap.tsx
        │   │   └── dashboard/
        │   ├── services/
        │   │   ├── firService.ts        # FIR API calls
        │   │   ├── dashboardService.ts
        │   │   ├── predictionService.ts
        │   │   └── newsService.ts
        │   ├── types/
        │   │   ├── dashboard.ts
        │   │   ├── prediction.ts
        │   │   └── news.ts
        │   └── lib/
        │       └── leafletFix.ts        # Leaflet fix for SSR
```

## 🔌 API Endpoints

### Crime Analytics
- `GET /api/crime/statistics` - Overall crime statistics
- `GET /api/crime/by-city?city=<name>` - Crime data by city
- `GET /api/crime/heatmap-data` - Geographic heatmap data
- `GET /api/crime/top-crimes?limit=N` - Top crime types
- `GET /api/crime/predict-by-city?city=<name>` - Crime risk prediction

### Crime Type Prediction
- `POST /api/crime/predict-crime-types?city=<name>` - Predict crime probabilities

### Accident Prediction
- `POST /predict` - Accident risk prediction at coordinates

### FIR Management
- `POST /api/fir/add` - Add new FIR
- `GET /api/fir/search` - Search FIRs
- `GET /api/fir/{report_number}` - Get FIR by report number
- `PUT /api/fir/{report_number}` - Update FIR

## 📊 Data Sources

- **Crime Dataset**: `backend/model/indian_crimes_csv/crime_dataset_india.csv`
  - 39,960+ crime records
  - Columns: Report Number, Date, City, Crime Description, Victim Info, etc.
  
- **FIR Database**: `backend/fir.csv`
  - User-submitted FIRs
  - Auto-incrementing report numbers

## 🤖 Machine Learning Models

### Crime Risk Model
- **Type**: RandomForestClassifier
- **Input Features**: Crime type, hour, day of week, weekend flag, zone ID, crime count, coordinates
- **Output**: Risk probability and level (High/Medium/Low)

### Crime Type Predictor
- **Type**: RandomForestClassifier with Label Encoding
- **Input**: City name
- **Output**: Probability for each crime type

### Accident Risk Model
- **Type**: RandomForestClassifier
- **Input**: Hour, day of week, zone ID, coordinates, crime history
- **Output**: Accident risk probability and urgency score

## 🎨 UI/UX Features

- **Dark Theme** - Slate-950 background with blue/cyan gradients
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Maps** - Leaflet maps with custom markers and heatmaps
- **Real-time Updates** - Live API integration
- **Professional Cards** - Gradient backgrounds and hover effects
- **Global Navigation** - Fixed navbar on all pages

## 🛠 Troubleshooting

### Backend Issues
```bash
# Backend won't start?
conda activate safecity
python api.py

# Module not found errors?
conda install pandas numpy scikit-learn fastapi uvicorn

# Port already in use?
# Check if something is running on port 8001
# Or change port in api.py
```

### Frontend Issues
```bash
# Dependencies missing?
npm install

# Build errors?
npm run build

# Dev server issues?
npm run dev -- --hostname 0.0.0.0
```

## 📝 Environment Variables

Create `.env.local` in `frontend/safe/` if needed:
```
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8001
```

## 🚀 Deployment

### Build Frontend
```bash
cd SafeCity/frontend/safe
npm run build
npm run start
```

### Run Backend in Production
```bash
conda activate safecity
python -m uvicorn api:app --host 0.0.0.0 --port 8001
```

## 📄 License

This project is provided as-is for educational and law enforcement purposes.

## 👥 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**SafeCity** - Making cities safer through intelligent crime prevention.
