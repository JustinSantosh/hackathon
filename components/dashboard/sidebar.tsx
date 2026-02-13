"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  AlertTriangle,
  ChevronRight,
  Shield,
  Clock,
  FileText,
  Info,
  LogOut,
  Building2,
  Hexagon,
  Download,
  Settings,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { activePlotInfo, flaggedIncidents } from "@/lib/geo-data"
import type { Feature, Polygon } from "geojson"

type ViolationData = {
  encroachmentPolygon: Feature<Polygon> | null
  encroachmentAreaSqm: number
}

interface SidebarProps {
  onLogout: () => void
  onIncidentSelect: (id: string) => void
  isScanning?: boolean
  violationData?: ViolationData | null
  legacyAlignmentCorrected?: boolean
  onLegacyAlignmentChange?: (corrected: boolean) => void
  onDownloadNotice?: () => void
}

export function Sidebar({
  onLogout,
  onIncidentSelect,
  isScanning,
  violationData,
  legacyAlignmentCorrected = false,
  onLegacyAlignmentChange,
  onDownloadNotice,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const hasViolation = violationData && violationData.encroachmentAreaSqm > 0

  const severityStyles = {
    critical: {
      bg: "bg-[hsl(271_91%_65%/0.1)]",
      border: "border-[hsl(271_91%_65%/0.3)]",
      text: "text-[hsl(271_91%_65%)]",
      dot: "bg-[hsl(271_91%_65%)]",
    },
    warning: {
      bg: "bg-[hsl(38_92%_50%/0.1)]",
      border: "border-[hsl(38_92%_50%/0.3)]",
      text: "text-[hsl(38_92%_50%)]",
      dot: "bg-[hsl(38_92%_50%)]",
    },
    info: {
      bg: "bg-[hsl(186_100%_42%/0.1)]",
      border: "border-[hsl(186_100%_42%/0.3)]",
      text: "text-[hsl(186_100%_42%)]",
      dot: "bg-[hsl(186_100%_42%)]",
    },
  }

  return (
    <div className="w-80 h-full bg-[hsl(222_47%_8%)] border-r border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(160_84%_39%/0.1)] border border-[hsl(160_84%_39%/0.2)]">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">CSIDC</h2>
            <p className="text-[10px] text-muted-foreground">Compliance Portal</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 py-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search village, plot, coordinates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Active Plot Info */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Building2 className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Active Plot
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {activePlotInfo.plotNo}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[hsl(160_84%_39%/0.1)] text-primary border border-[hsl(160_84%_39%/0.2)]">
                {activePlotInfo.status}
              </span>
            </div>
            <div className="px-3 py-2 flex flex-col gap-1.5">
              {[
                { label: "Allottee", value: activePlotInfo.allottee },
                { label: "Village", value: `${activePlotInfo.village}, ${activePlotInfo.district}` },
                { label: "Allotted Area", value: activePlotInfo.allottedArea },
                { label: "Covered Area", value: activePlotInfo.coveredArea },
                { label: "Lease Period", value: activePlotInfo.leasePeriod },
                { label: "Annual Dues", value: activePlotInfo.annualDues },
                { label: "Due Status", value: activePlotInfo.dueStatus },
                { label: "Coordinates", value: activePlotInfo.coordinates },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-start">
                  <span className="text-[10px] text-muted-foreground">{item.label}</span>
                  <span className="text-[10px] font-medium text-foreground text-right max-w-[60%]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legacy Alignment Correction */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Settings className="w-3 h-3 text-[hsl(186_100%_42%)]" />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Survey Tools
            </span>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor="legacy-alignment"
                  className="text-[10px] font-medium text-foreground cursor-pointer"
                >
                  Correct Legacy Alignment
                </Label>
                <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">
                  Auto-corrects 20-year-old mapping errors from Amaseoni topographical survey
                </p>
              </div>
              <Switch
                id="legacy-alignment"
                checked={legacyAlignmentCorrected}
                onCheckedChange={onLegacyAlignmentChange}
                className="shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Download Notice */}
        <div className="px-3 pb-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <Button
              onClick={onDownloadNotice}
              disabled={!hasViolation}
              className="w-full h-9 text-xs font-medium bg-[hsl(271_91%_65%)] text-white hover:bg-[hsl(271_91%_65%/0.9)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Download className="w-3.5 h-3.5 mr-2" />
              Download Notice
            </Button>
            {!hasViolation && (
              <p className="text-[9px] text-muted-foreground mt-2 text-center">
                Run compliance check to generate notice
              </p>
            )}
            {hasViolation && (
              <p className="text-[9px] text-muted-foreground mt-2 text-center">
                {violationData?.encroachmentAreaSqm.toLocaleString()} sqm violation detected
              </p>
            )}
          </div>
        </div>

        {/* Flagged Incidents */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3 h-3 text-[hsl(271_91%_65%)]" />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Flagged Incidents
            </span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-[hsl(271_91%_65%/0.1)] text-[hsl(271_91%_65%)] font-medium">
              {flaggedIncidents.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {flaggedIncidents.map((incident) => {
              const style = severityStyles[incident.severity]
              return (
                <button
                  key={incident.id}
                  onClick={() => onIncidentSelect(incident.id)}
                  className={`w-full text-left bg-card border rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary cursor-pointer ${style.border}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      <span className="text-[10px] font-semibold text-foreground">
                        {incident.id}
                      </span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <p className={`text-[10px] font-medium ${style.text} mb-0.5`}>
                    {incident.type} - Plot {incident.plot}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
                    {incident.description}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock className="w-2.5 h-2.5 text-muted-foreground" />
                    <span className="text-[9px] text-muted-foreground">{incident.date}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Hexagon className="w-3 h-3 text-primary" />
            <span className="text-[9px] text-muted-foreground">Gov-Tech v4.2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] text-muted-foreground">System Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
