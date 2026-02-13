// Amaseoni Industrial Area - Approved CSIDC Boundary (GeoJSON)
export const approvedBoundary = {
  type: "Feature" as const,
  properties: {
    name: "Amaseoni Industrial Area - Approved Block",
    area_sqm: 45200,
    status: "approved",
    allottee: "M/s Bharat Steel Forge Pvt. Ltd.",
    plot_no: "IA-27/B",
  },
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [81.6345, 21.2510],
        [81.6380, 21.2510],
        [81.6380, 21.2540],
        [81.6345, 21.2540],
        [81.6345, 21.2510],
      ],
    ],
  },
}

// Detected encroachment (from "OSM Overpass API" query) - simulated
export const detectedEncroachment = {
  type: "Feature" as const,
  properties: {
    name: "Unauthorized Structure - Detected via OSM",
    area_sqm: 8340,
    status: "violation",
    type: "Commercial Building Encroachment",
    detected_on: "2025-01-15",
  },
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [81.6370, 21.2530],
        [81.6395, 21.2530],
        [81.6395, 21.2550],
        [81.6370, 21.2550],
        [81.6370, 21.2530],
      ],
    ],
  },
}

// CSIDC base boundary - larger area
export const csidcBaseBoundary = {
  type: "Feature" as const,
  properties: {
    name: "CSIDC Amaseoni Industrial Complex",
    total_area_sqm: 250000,
  },
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [81.6300, 21.2480],
        [81.6420, 21.2480],
        [81.6420, 21.2580],
        [81.6300, 21.2580],
        [81.6300, 21.2480],
      ],
    ],
  },
}

// Flagged incidents data
export const flaggedIncidents = [
  {
    id: "INC-2025-001",
    type: "Encroachment",
    plot: "IA-27/B",
    date: "2025-01-15",
    severity: "critical" as const,
    description: "Unauthorized commercial structure detected beyond allotted boundary by 8,340 sqm",
  },
  {
    id: "INC-2025-002",
    type: "Boundary Overlap",
    plot: "IA-31/A",
    date: "2025-01-12",
    severity: "warning" as const,
    description: "Fence line extends 12m into adjacent government reserve land",
  },
  {
    id: "INC-2025-003",
    type: "Lease Default",
    plot: "IA-19/C",
    date: "2025-01-08",
    severity: "info" as const,
    description: "Quarterly lease payment overdue by 45 days. Notice pending.",
  },
]

// Active plot info
export const activePlotInfo = {
  plotNo: "IA-27/B",
  village: "Amaseoni",
  district: "Raipur",
  allottee: "M/s Bharat Steel Forge Pvt. Ltd.",
  status: "Active Lease",
  allottedArea: "45,200 sqm",
  coveredArea: "31,480 sqm",
  leasePeriod: "2019 - 2049",
  annualDues: "INR 12,45,000",
  dueStatus: "Paid",
  lastInspection: "2024-11-20",
  coordinates: "21.2525 N, 81.6362 E",
}

// Base allotment - Legal industrial plot in Amaseoni
export const BASE_ALLOTMENT = {
  type: "Feature" as const,
  properties: {
    name: "Base Allotment - Legal Industrial Plot",
    area_sqm: 50000,
    status: "approved",
    plot_no: "IA-45/C",
    location: "Amaseoni",
  },
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [81.675, 21.188],
        [81.683, 21.188],
        [81.683, 21.194],
        [81.675, 21.194],
        [81.675, 21.188],
      ],
    ],
  },
}

// Current structure - Encroaching structure overlapping base allotment
export const CURRENT_STRUCTURE = {
  type: "Feature" as const,
  properties: {
    name: "Current Structure - Encroachment Detected",
    area_sqm: 65000,
    status: "violation",
    encroachment_area_sqm: 15000,
    detected_on: "2025-02-10",
  },
  geometry: {
    type: "Polygon" as const,
    coordinates: [
      [
        [81.673, 21.186],
        [81.685, 21.186],
        [81.685, 21.196],
        [81.673, 21.196],
        [81.673, 21.186],
      ],
    ],
  },
}
