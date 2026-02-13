import * as turf from "@turf/turf"
import type { Feature, Polygon } from "geojson"

/**
 * Calculates the area of encroachment by finding the portion of the second polygon
 * that lies outside the first polygon (base allotment).
 * 
 * @param baseAllotment - The legal/base polygon (GeoJSON Feature with Polygon geometry)
 * @param currentStructure - The structure polygon that may be encroaching (GeoJSON Feature with Polygon geometry)
 * @returns An object containing:
 *   - encroachmentPolygon: The GeoJSON polygon representing the encroached area (or null if no encroachment)
 *   - encroachmentAreaSqm: The area in square meters of the encroachment (0 if no encroachment)
 */
export function calculateEncroachment(
  baseAllotment: Feature<Polygon>,
  currentStructure: Feature<Polygon>
): {
  encroachmentPolygon: Feature<Polygon> | null
  encroachmentAreaSqm: number
} {
  try {
    // Calculate the difference: parts of currentStructure that are outside baseAllotment
    const difference = turf.difference(currentStructure, baseAllotment)

    // If difference is null or doesn't exist, there's no encroachment
    if (!difference || difference.geometry.type !== "Polygon") {
      return {
        encroachmentPolygon: null,
        encroachmentAreaSqm: 0,
      }
    }

    // Calculate the area in square meters
    // turf.area returns area in square meters
    const areaSqm = turf.area(difference as Feature<Polygon>)

    return {
      encroachmentPolygon: difference as Feature<Polygon>,
      encroachmentAreaSqm: Math.round(areaSqm * 100) / 100, // Round to 2 decimal places
    }
  } catch (error) {
    // Handle cases where difference calculation fails (e.g., invalid geometries)
    console.error("Error calculating encroachment:", error)
    return {
      encroachmentPolygon: null,
      encroachmentAreaSqm: 0,
    }
  }
}
