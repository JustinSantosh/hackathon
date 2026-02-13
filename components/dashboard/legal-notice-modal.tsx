"use client"

import {
  FileText,
  X,
  Printer,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Feature, Polygon } from "geojson"

type ViolationData = {
  encroachmentPolygon: Feature<Polygon> | null
  encroachmentAreaSqm: number
}

export type PlotData = {
  plotNo: string
  village: string
  district: string
  allottee: string
  status: string
  allottedArea: string
  coveredArea: string
  leasePeriod: string
  annualDues: string
  dueStatus: string
  lastInspection?: string
  coordinates?: string
}

interface LegalNoticeModalProps {
  open: boolean
  onClose: () => void
  plotData: PlotData
  violationData?: ViolationData | null
}

export function LegalNoticeModal({
  open,
  onClose,
  plotData,
  violationData,
}: LegalNoticeModalProps) {
  if (!open) return null

  const encroachmentArea = violationData?.encroachmentAreaSqm || 0
  const plotId = plotData.plotNo

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="legal-notice-print relative z-10 w-full max-w-3xl mx-4 bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-2xl print:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b-2 border-gray-300 bg-gray-50 print:bg-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Show Cause Notice
              </h3>
              <p className="text-xs text-gray-600">
                Official Government Document
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-gray-500 hover:text-gray-900 hide-when-print"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Document Content */}
        <div className="px-8 py-6 bg-white">
          {/* Official Header */}
          <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
            <div className="mb-2">
              <p className="text-xs text-gray-600 uppercase tracking-widest font-semibold">
                Government of Chhattisgarh
              </p>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1">
              Chhattisgarh State Industrial Development Corporation (CSIDC)
            </h1>
            <p className="text-xs text-gray-600 mt-2">
              Udyog Bhawan, Ring Road No. 1, Raipur - 492001, Chhattisgarh
            </p>
            <p className="text-xs text-gray-600">
              Phone: 0771-2426000 | Email: info@csidc.gov.in
            </p>
          </div>

          {/* Notice Title */}
          <div className="mb-6 text-center">
            <div className="inline-block bg-red-50 border-2 border-red-300 px-6 py-2 rounded">
              <p className="text-sm font-bold text-red-800 uppercase tracking-wide">
                Show Cause Notice
              </p>
            </div>
          </div>

          {/* Reference Number */}
          <div className="mb-6 text-right">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Ref No.:</span> CSIDC/EST/{new Date().getFullYear()}/{String(Math.floor(Math.random() * 10000)).padStart(4, '0')}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              <span className="font-semibold">Date:</span> {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Main Body */}
          <div className="mb-8 space-y-4 text-sm text-gray-800 leading-relaxed">
            <p>
              <span className="font-bold">To,</span>
            </p>
            <p className="ml-4">
              {plotData.allottee}
              <br />
              Plot No. {plotId}
              <br />
              {plotData.village}, {plotData.district}
              <br />
              Chhattisgarh
            </p>

            <div className="mt-6">
              <p className="font-bold mb-3">Subject: Show Cause Notice for Unauthorized Encroachment</p>
              
              <p className="mb-4">
                It has been detected via automated monitoring that <span className="font-bold">{plotId}</span> has an unauthorized encroachment of <span className="font-bold">{encroachmentArea.toLocaleString()} sq. meters</span>.
              </p>

              <p className="mb-4">
                This encroachment has been identified through geospatial analysis and satellite imagery verification conducted by the CSIDC Compliance Monitoring System. The unauthorized structure extends beyond the approved allotment boundary, violating the terms and conditions of the lease agreement executed between CSIDC and the allottee.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <p className="text-sm font-semibold text-yellow-800 mb-2">
                  Details of Violation:
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-900 space-y-1">
                  <li>Plot Number: {plotId}</li>
                  <li>Allottee: {plotData.allottee}</li>
                  <li>Location: {plotData.village}, {plotData.district}</li>
                  <li>Allotted Area: {plotData.allottedArea}</li>
                  <li>Encroached Area: {encroachmentArea.toLocaleString()} square meters</li>
                  <li>Detection Date: {new Date().toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}</li>
                  <li>Lease Status: {plotData.status}</li>
                  <li>Violation Type: Unauthorized construction beyond approved boundary</li>
                </ul>
              </div>

              <p className="mb-4">
                In view of the above, you are hereby directed to show cause within <span className="font-bold">15 (fifteen) working days</span> from the date of receipt of this notice as to why appropriate action should not be taken against you under the provisions of the CSIDC Act and the terms of your lease agreement.
              </p>

              <p className="mb-4">
                If no satisfactory explanation is received within the stipulated period, CSIDC reserves the right to:
              </p>

              <ol className="list-decimal list-inside ml-4 space-y-2 mb-4">
                <li>Initiate eviction proceedings under Section 14(2) of the CSIDC Act</li>
                <li>Cancel the industrial allotment and revoke the lease deed</li>
                <li>Impose penalties as per the terms of the lease agreement</li>
                <li>Take legal action for unauthorized occupation of government land</li>
              </ol>

              <p className="mb-4">
                You are also directed to immediately cease any further construction or activity in the encroached area until the matter is resolved.
              </p>

              <p className="text-xs text-gray-600 italic mt-6">
                This is a computer-generated notice. For any clarification, please contact the Estate Management Division at estate@csidc.gov.in or call 0771-2426000.
              </p>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-12 pt-6 border-t-2 border-gray-300">
            <div className="text-right">
              <p className="font-bold text-gray-900 mb-2">
                For and on behalf of
              </p>
              <p className="font-bold text-gray-900 mb-8">
                Chhattisgarh State Industrial Development Corporation
              </p>
              <div className="mt-16">
                <div className="border-t-2 border-gray-400 w-48 ml-auto mb-2"></div>
                <p className="text-sm font-semibold text-gray-700">
                  Authorized Signatory
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Estate Management Division
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-8 py-4 border-t-2 border-gray-300 bg-gray-50 hide-when-print">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="text-sm bg-white border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Notice
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-sm bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Close
          </Button>
        </div>
      </div>

    </div>
  )
}
