"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import type { Feature, Polygon } from "geojson"

type ViolationData = {
  encroachmentPolygon: Feature<Polygon> | null
  encroachmentAreaSqm: number
}

interface MapViewportProps {
  baseline: Feature<Polygon>
  encroachment: Feature<Polygon>
  isScanning?: boolean
  violationData?: ViolationData | null
  legacyAlignmentCorrected?: boolean
}

export function MapViewport({
  baseline,
  encroachment,
  isScanning,
  violationData,
  legacyAlignmentCorrected = false,
}: MapViewportProps) {
  // Apply coordinate offset correction for legacy alignment
  const getCorrectedBaseline = (): Feature<Polygon> => {
    if (!legacyAlignmentCorrected) return baseline

    // Apply a small coordinate offset to correct legacy mapping errors
    // This simulates correcting 20-year-old topographical survey errors
    const correctedCoordinates = baseline.geometry.coordinates.map((ring) =>
      ring.map((coord) => [
        coord[0] + 0.00015, // Small longitude offset (~15 meters)
        coord[1] - 0.00008, // Small latitude offset (~8 meters)
      ])
    )

    return {
      ...baseline,
      geometry: {
        ...baseline.geometry,
        coordinates: correctedCoordinates,
      },
    }
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[21.191, 81.679]}
        zoom={17}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        className="w-full h-full"
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
          subdomains="abcd"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> | CARTO'
        />
        <GeoJSON
          key={legacyAlignmentCorrected ? "corrected" : "original"}
          data={getCorrectedBaseline()}
          style={{
            color: "#10b981",
            weight: 2.5,
            opacity: 0.9,
            fillColor: "#10b981",
            fillOpacity: 0.12,
          }}
        />
        {encroachment && (
          <GeoJSON
            data={encroachment}
            style={{
              color: "#a855f7",
              weight: 2.5,
              opacity: 0.9,
              fillColor: "#a855f7",
              fillOpacity: 0.15,
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}
