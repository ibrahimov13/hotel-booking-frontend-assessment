import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepperLayout } from '../layouts/StepperLayout'
import { Card } from '../components/common/Card'
import { SummaryCard } from '../components/summary/SummaryCard'
import { DailyBreakdownTable } from '../components/summary/DailyBreakdownTable'
import { useBooking } from '../hooks/useBooking'
import { boardTypes } from '../data/options'
import { formatDateRange } from '../utils/date'
import { buildPricingBreakdown, getSelectedHotel } from '../utils/pricing'
import { Button } from '../components/common/Button'
import { WizardActions } from '../components/navigation/WizardActions'
import { exportBookingSummaryAsPDF } from '../utils/pdfExport'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

export const StepThree = () => {
  const navigate = useNavigate()
  const { state, setPricing, resetBooking } = useBooking()
  const [isExporting, setIsExporting] = useState(false)
  
  const pricing = useMemo(
    () => buildPricingBreakdown(state),
    [
      state.basics.citizenship,
      state.basics.country,
      state.basics.boardType,
      state.basics.hotelId,
      state.dateRange.startDate,
      state.dateRange.nights,
      JSON.stringify(state.dailyMeals),
    ],
  )

  const prevPricingRef = useRef<string>('')
  const pricingKey = JSON.stringify(pricing)

  useEffect(() => {
    if (prevPricingRef.current !== pricingKey) {
      prevPricingRef.current = pricingKey
      setPricing(pricing)
    }
  }, [pricingKey, pricing, setPricing])

  const handleExportPDF = () => {
    setIsExporting(true)
    try {
      exportBookingSummaryAsPDF(state, pricing)
    } finally {
      setTimeout(() => setIsExporting(false), 1000)
    }
  }

  const boardLabel =
    boardTypes.find((board) => board.code === state.basics.boardType)?.name ??
    '—'

  const selectedHotel = getSelectedHotel(
    state.basics.country,
    state.basics.hotelId,
  )

  const summaryItems = [
    { label: 'Citizenship', value: state.basics.citizenship },
    {
      label: 'Travel window',
      value: formatDateRange(
        state.dateRange.startDate,
        state.dateRange.nights,
      ),
    },
    {
      label: 'Nights',
      value: `${state.dateRange.nights} ${
        state.dateRange.nights > 1 ? 'nights' : 'night'
      }`,
    },
    { label: 'Destination', value: state.basics.country },
    { label: 'Board type', value: boardLabel },
    {
      label: 'Hotel',
      value: selectedHotel
        ? `${selectedHotel.name} · $${selectedHotel.price}/night`
        : '—',
    },
  ]

  return (
    <StepperLayout
      title="Summary & pricing"
      subtitle="Review configuration and pricing before final submission."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Configuration recap">
          <SummaryCard items={summaryItems} />
        </Card>

        <Card title="Totals">
          <div className="space-y-4 rounded-2xl bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Hotel total</span>
              <span className="text-lg font-semibold text-slate-900">
                ${pricing.hotelTotal}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Meals total</span>
              <span className="text-lg font-semibold text-slate-900">
                ${pricing.mealTotal}
              </span>
            </div>
            <hr className="border-slate-200" />
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-slate-700">
                Grand total
              </span>
              <span className="text-2xl font-bold text-brand">
                ${pricing.grandTotal}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Daily breakdown">
        <DailyBreakdownTable rows={pricing.days} />
      </Card>

      <WizardActions
        leftSlot={
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/step-2')}
          >
            Back to Step 2
          </Button>
        }
        rightSlot={
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleExportPDF}
                disabled={isExporting}
                leftIcon={isExporting ? <LoadingSpinner size="sm" /> : undefined}
                className="flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">
                  {isExporting ? 'Exporting...' : 'Export PDF'}
                </span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  resetBooking()
                  navigate('/')
                }}
                className="flex-1 sm:flex-none"
              >
                Reset
              </Button>
              <Button type="button" className="flex-1 sm:flex-none">
                Confirm
              </Button>
            </div>
          </div>
        }
      />
    </StepperLayout>
  )
}

