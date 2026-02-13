"use client"

import { MapPin, Ruler, IndianRupee, AlertTriangle } from "lucide-react"

const stats = [
  {
    label: "Active Plots",
    value: "47",
    icon: MapPin,
    color: "text-[hsl(160_84%_39%)]",
    bgColor: "bg-[hsl(160_84%_39%/0.1)]",
  },
  {
    label: "Total Allotted",
    value: "11.8 Lakh sqm",
    icon: Ruler,
    color: "text-[hsl(186_100%_42%)]",
    bgColor: "bg-[hsl(186_100%_42%/0.1)]",
  },
  {
    label: "Lease Revenue",
    value: "5.84 Cr",
    icon: IndianRupee,
    color: "text-[hsl(160_84%_39%)]",
    bgColor: "bg-[hsl(160_84%_39%/0.1)]",
  },
  {
    label: "Flagged",
    value: "3",
    icon: AlertTriangle,
    color: "text-[hsl(271_91%_65%)]",
    bgColor: "bg-[hsl(271_91%_65%/0.1)]",
  },
]

export function StatCards() {
  return (
    <div className="flex gap-2 px-3 py-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex-1 flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2"
        >
          <div className={`flex items-center justify-center w-7 h-7 rounded-md ${stat.bgColor}`}>
            <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground truncate">{stat.label}</p>
            <p className="text-xs font-semibold text-foreground truncate">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
