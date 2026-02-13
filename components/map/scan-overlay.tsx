"use client"

import type { Feature, Polygon } from "geojson"

type ViolationData = {
  encroachmentPolygon: Feature<Polygon> | null
  encroachmentAreaSqm: number
}

interface ScanOverlayProps {
  isScanning: boolean
  scanProgress: number
  violationData?: ViolationData | null
}

export function ScanOverlay({
  isScanning,
  scanProgress,
  violationData,
}: ScanOverlayProps) {
  return (
    <div className="absolute inset-0 z-[1001] pointer-events-none overflow-hidden">
      {/* Dark overlay with slight transparency */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />

      {/* Horizontal laser line that slides up and down */}
      <div className="absolute left-0 right-0 h-1 animate-scan-laser">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-[hsl(186_100%_42%)] to-transparent opacity-90">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-sm bg-[hsl(186_100%_42%)] opacity-50 [box-shadow:0_0_20px_4px_rgba(0,212,255,0.6)]" />
        </div>
      </div>

      {/* Center badge with pulse effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="relative">
          {/* Pulse ring effect */}
          <div className="absolute inset-0 rounded-full bg-[hsl(186_100%_42%)] opacity-20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-[hsl(186_100%_42%)] opacity-10 animate-pulse" />
          
          {/* Main badge */}
          <div className="relative bg-card/95 backdrop-blur-md border border-[hsl(186_100%_42%/0.4)] rounded-lg px-4 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              {/* Scanning indicator dots */}
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(186_100%_42%)] animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(186_100%_42%)] animate-pulse [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(186_100%_42%)] animate-pulse [animation-delay:0.4s]" />
              </div>
              
              {/* Text */}
              <span className="text-sm font-semibold text-[hsl(186_100%_42%)] tracking-wide">
                Analyzing Spatial Data...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
