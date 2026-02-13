# CSIDC Compliance Dashboard

A modern web application for monitoring industrial land compliance and detecting encroachments using geospatial analysis.

## Features

- 🗺️ **Interactive Map Visualization** - Leaflet-based map with real-time boundary visualization
- 🔍 **Automated Compliance Scanning** - Detects unauthorized encroachments using geospatial analysis
- 📊 **Dashboard Analytics** - Real-time statistics and compliance metrics
- 📄 **Legal Notice Generation** - Automated Show Cause Notice generation with print functionality
- 🛠️ **Legacy Alignment Correction** - Corrects 20-year-old mapping errors from Amaseoni topographical survey
- 🎨 **Modern UI** - Built with Next.js, React, Tailwind CSS, and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 3.4.17
- **Components**: shadcn/ui (Radix UI primitives)
- **Maps**: Leaflet 1.9.4, react-leaflet 4.2.1
- **Geospatial**: @turf/turf 7.3.4
- **Forms**: react-hook-form, zod
- **Icons**: lucide-react
- **Language**: TypeScript 5.7.3

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd project
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
project/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── auth/              # Authentication components
│   ├── dashboard/          # Dashboard components
│   ├── map/               # Map-related components
│   └── ui/                # Reusable UI components
├── lib/                    # Utility functions
│   ├── compliance-logic.ts # Encroachment calculation logic
│   ├── geo-data.ts        # GeoJSON data
│   └── utils.ts           # Helper functions
└── hooks/                  # Custom React hooks
```

## Key Features Explained

### Compliance Scanning
- Uses Turf.js to calculate polygon differences
- Detects encroachments by comparing current structures against approved boundaries
- Provides real-time scanning progress visualization

### Legacy Alignment Correction
- Corrects historical mapping errors from the Amaseoni topographical survey
- Applies coordinate offsets to align legacy data with current standards
- Toggle-able feature in the sidebar

### Legal Notice Generation
- Generates formal Show Cause Notices
- Includes all plot details and violation information
- Print-ready format with professional government document styling

## Build

```bash
npm run build
```

## License

This project is for demonstration purposes.

## Acknowledgments

- Chhattisgarh State Industrial Development Corporation (CSIDC)
- Built with modern web technologies for government compliance monitoring
