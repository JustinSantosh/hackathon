"use client"

import { useState, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import { toast } from "sonner"
import { AlertTriangle, FileText } from "lucide-react"
import { Sidebar } from "./sidebar"
import { StatCards } from "./stat-cards"
import { LegalNoticeModal } from "./legal-notice-modal"
import { DrawToolbar } from "@/components/map/draw-toolbar"
import { ScanOverlay } from "@/components/map/scan-overlay"
import { calculateEncroachment } from "@/lib/compliance-logic"
import { BASE_ALLOTMENT, CURRENT_STRUCTURE, activePlotInfo } from "@/lib/geo-data"
import type L from "leaflet"
import type { Feature, Polygon } from "geojson"
import type { PlotData } from "@/components/dashboard/legal-notice-modal"

const MapViewport = dynamic(
  () => import("@/components/map/map-viewport").then((m) => ({ default: m.MapViewport })),
  { ssr: false }
)

interface ComplianceDashboardProps {
  onLogout: () => void
}

type ViolationData = {
  encroachmentPolygon: Feature<Polygon> | null
  encroachmentAreaSqm: number
}

export function ComplianceDashboard({ onLogout }: ComplianceDashboardProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [boundaryLoaded, setBoundaryLoaded] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [complianceChecked, setComplianceChecked] = useState(false)
  const [showLegalNotice, setShowLegalNotice] = useState(false)
  const [violationData, setViolationData] = useState<ViolationData | null>(null)
  const [legacyAlignmentCorrected, setLegacyAlignmentCorrected] = useState(false)

  const handleLoadBoundary = useCallback(() => {
    setBoundaryLoaded(true)
    toast.success("CSIDC base boundary loaded", {
      description: "Amaseoni Industrial Complex - 25 hectares",
    })
  }, [])

  const handleToggleDraw = useCallback(() => {
    setIsDrawing((prev) => !prev)
    if (!isDrawing) {
      toast.info("Drawing mode enabled", {
        description: "Click on the map to place boundary points",
      })
    }
  }, [isDrawing])

  const handleSaveBaseline = useCallback(() => {
    setIsDrawing(false)
    toast.success("Approved block boundary saved", {
      description: "Plot IA-27/B baseline recorded",
    })
  }, [])

  const handleStartScan = useCallback(() => {
    setIsScanning(true)
    setScanProgress(0)

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)

    // 2-second timeout to simulate analysis
    setTimeout(() => {
      clearInterval(interval)
      setScanProgress(100)

      // Calculate encroachment using the utility function
      const result = calculateEncroachment(BASE_ALLOTMENT, CURRENT_STRUCTURE)
      setViolationData(result)
      setComplianceChecked(true)

      setTimeout(() => {
        setIsScanning(false)

        // Show encroachment warning toast if violation detected
        if (result.encroachmentAreaSqm > 0) {
          toast.warning("Encroachment Detected", {
            description: `Unauthorized structure found: ${result.encroachmentAreaSqm.toLocaleString()} sqm beyond allotted boundary`,
            duration: 10000,
            action: {
              label: "Generate Legal Notice",
              onClick: () => setShowLegalNotice(true),
            },
            icon: <AlertTriangle className="w-4 h-4 text-[hsl(271_91%_65%)]" />,
          })
        } else {
          toast.success("Compliance Check Complete", {
            description: "No encroachments detected. All structures are within approved boundaries.",
          })
        }
      }, 500)
    }, 2000)
  }, [])

  const handleRunComplianceCheck = useCallback(() => {
    if (!boundaryLoaded) {
      toast.error("Load boundary first", {
        description: "Please load the CSIDC base boundary before running compliance check",
      })
      return
    }

    handleStartScan()
  }, [boundaryLoaded, handleStartScan])

  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn()
  }, [])

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut()
  }, [])

  const handleResetView = useCallback(() => {
    mapRef.current?.setView([21.2525, 81.636], 15)
  }, [])

  const handleLocate = useCallback(() => {
    mapRef.current?.setView([21.2525, 81.6362], 17)
  }, [])

  const handleIncidentSelect = useCallback(
    (id: string) => {
      if (id === "INC-2025-001") {
        // Center on encroachment area
        mapRef.current?.setView([21.254, 81.6382], 16)
        if (!complianceChecked) {
          handleRunComplianceCheck()
        }
      }
    },
    [complianceChecked, handleRunComplianceCheck]
  )

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Stat cards header */}
      <StatCards />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          onLogout={onLogout}
          onIncidentSelect={handleIncidentSelect}
          isScanning={isScanning}
          violationData={violationData}
          legacyAlignmentCorrected={legacyAlignmentCorrected}
          onLegacyAlignmentChange={setLegacyAlignmentCorrected}
          onDownloadNotice={() => setShowLegalNotice(true)}
        />

        {/* Map area */}
        <div className="flex-1 relative">
          <MapViewport
            baseline={BASE_ALLOTMENT}
            encroachment={
              violationData?.encroachmentPolygon || CURRENT_STRUCTURE
            }
            isScanning={isScanning}
            violationData={violationData}
            legacyAlignmentCorrected={legacyAlignmentCorrected}
          />

          <DrawToolbar
            isDrawing={isDrawing}
            isScanning={isScanning}
            boundaryLoaded={boundaryLoaded}
            onLoadBoundary={handleLoadBoundary}
            onToggleDraw={handleToggleDraw}
            onRunComplianceCheck={handleRunComplianceCheck}
            onSaveBaseline={handleSaveBaseline}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetView}
            onLocate={handleLocate}
          />

          {isScanning && (
            <ScanOverlay
              isScanning={isScanning}
              scanProgress={scanProgress}
              violationData={violationData}
            />
          )}

          {/* Compliance result badge */}
          {complianceChecked && !isScanning && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
              <div className="bg-card/95 backdrop-blur-sm border border-[hsl(271_91%_65%/0.3)] rounded-lg px-4 py-2 flex items-center gap-3 glow-purple">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(271_91%_65%)]" />
                  <span className="text-xs font-semibold text-[hsl(271_91%_65%)]">
                    Compliance Violation Found
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <span className="text-[10px] text-muted-foreground">
                  {violationData?.encroachmentAreaSqm
                    ? `${violationData.encroachmentAreaSqm.toLocaleString()} sqm encroachment`
                    : "No violation data"}
                </span>
                <button
                  onClick={() => setShowLegalNotice(true)}
                  className="flex items-center gap-1 text-[10px] font-medium text-[hsl(186_100%_42%)] hover:text-[hsl(186_100%_42%/0.8)] transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  Legal Notice
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legal Notice Modal */}
      <LegalNoticeModal
        open={showLegalNotice}
        onClose={() => setShowLegalNotice(false)}
        plotData={activePlotInfo as PlotData}
        violationData={violationData}
      />
    </div>
  )
}
