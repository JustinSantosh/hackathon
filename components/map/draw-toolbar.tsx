"use client"

import {
  Layers,
  PenTool,
  ScanSearch,
  LocateFixed,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Save,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface DrawToolbarProps {
  isDrawing: boolean
  isScanning: boolean
  boundaryLoaded: boolean
  onLoadBoundary: () => void
  onToggleDraw: () => void
  onRunComplianceCheck: () => void
  onSaveBaseline: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  onLocate: () => void
}

export function DrawToolbar({
  isDrawing,
  isScanning,
  boundaryLoaded,
  onLoadBoundary,
  onToggleDraw,
  onRunComplianceCheck,
  onSaveBaseline,
  onZoomIn,
  onZoomOut,
  onResetView,
  onLocate,
}: DrawToolbarProps) {
  return (
    <>
      {/* Main toolbar */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1.5">
        {/* Zoom controls */}
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
          <ToolbarButton
            icon={ZoomIn}
            label="Zoom in"
            onClick={onZoomIn}
          />
          <div className="h-px bg-border" />
          <ToolbarButton
            icon={ZoomOut}
            label="Zoom out"
            onClick={onZoomOut}
          />
        </div>

        {/* View controls */}
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
          <ToolbarButton
            icon={Maximize2}
            label="Reset view"
            onClick={onResetView}
          />
          <div className="h-px bg-border" />
          <ToolbarButton
            icon={LocateFixed}
            label="Locate plot"
            onClick={onLocate}
          />
        </div>
      </div>

      {/* Geospatial tools - left side */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <Button
          onClick={onLoadBoundary}
          disabled={boundaryLoaded}
          className={`h-9 text-xs font-medium shadow-lg transition-all ${
            boundaryLoaded
              ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/20"
              : "bg-card border border-border text-foreground hover:bg-secondary"
          }`}
          variant="outline"
        >
          <Layers className="w-3.5 h-3.5 mr-1.5" />
          {boundaryLoaded ? "Boundary Active" : "Load CSIDC Base Boundary"}
        </Button>

        <Button
          onClick={onToggleDraw}
          className={`h-9 text-xs font-medium shadow-lg transition-all ${
            isDrawing
              ? "bg-[hsl(186_100%_42%/0.15)] text-[hsl(186_100%_42%)] border border-[hsl(186_100%_42%/0.3)] hover:bg-[hsl(186_100%_42%/0.2)]"
              : "bg-card border border-border text-foreground hover:bg-secondary"
          }`}
          variant="outline"
        >
          <PenTool className="w-3.5 h-3.5 mr-1.5" />
          {isDrawing ? "Drawing Mode Active" : "Define Baseline"}
        </Button>

        <Button
          onClick={onRunComplianceCheck}
          disabled={isScanning || !boundaryLoaded}
          className={`h-9 text-xs font-medium shadow-lg transition-all ${
            isScanning
              ? "bg-[hsl(186_100%_42%/0.15)] text-[hsl(186_100%_42%)] border border-[hsl(186_100%_42%/0.3)]"
              : "bg-card border border-border text-foreground hover:bg-secondary"
          }`}
          variant="outline"
        >
          <ScanSearch className={`w-3.5 h-3.5 mr-1.5 ${isScanning ? "animate-pulse" : ""}`} />
          {isScanning ? "Scanning..." : "Run Compliance Check"}
        </Button>
      </div>

      {/* Drawing mode overlay */}
      {isDrawing && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2">
          <div className="bg-card/95 backdrop-blur-sm border border-[hsl(186_100%_42%/0.3)] rounded-lg px-4 py-2.5 flex items-center gap-3 glow-cyan">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(186_100%_42%)] animate-pulse" />
              <span className="text-xs text-[hsl(186_100%_42%)] font-medium">
                Click on map to define boundary points
              </span>
            </div>
            <div className="h-4 w-px bg-border" />
            <Button
              onClick={onSaveBaseline}
              size="sm"
              className="h-7 text-[10px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="w-3 h-3 mr-1" />
              Save Approved Block
            </Button>
            <Button
              onClick={onToggleDraw}
              size="sm"
              variant="ghost"
              className="h-7 text-[10px] text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
