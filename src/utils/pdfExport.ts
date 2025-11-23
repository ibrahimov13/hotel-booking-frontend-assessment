import type { BookingState, PricingBreakdown } from '../types/booking'
import { boardTypes } from '../data/options'
import { getSelectedHotel } from './pricing'
import { formatDateRange } from './date'

export const generateBookingSummaryHTML = (
  state: BookingState,
  pricing: PricingBreakdown,
): string => {
  const boardLabel =
    boardTypes.find((board) => board.code === state.basics.boardType)?.name ??
    '—'

  const selectedHotel = getSelectedHotel(
    state.basics.country,
    state.basics.hotelId,
  )

  const travelWindow = formatDateRange(
    state.dateRange.startDate,
    state.dateRange.nights,
  )

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Summary</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      color: #0f172a;
      padding: 40px;
      background: white;
    }
    .header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
    }
    .header p {
      color: #64748b;
      font-size: 14px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 12px;
      margin-bottom: 12px;
    }
    .info-label {
      font-weight: 600;
      color: #475569;
      font-size: 14px;
    }
    .info-value {
      color: #0f172a;
      font-size: 14px;
    }
    .totals {
      background: #f8fafc;
      padding: 24px;
      border-radius: 12px;
      margin-top: 30px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .total-row.grand {
      border-top: 2px solid #e2e8f0;
      margin-top: 12px;
      padding-top: 16px;
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
    }
    .total-label {
      color: #64748b;
    }
    .total-value {
      font-weight: 600;
      color: #0f172a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
      font-size: 13px;
    }
    th {
      background: #f8fafc;
      font-weight: 600;
      color: #475569;
      text-transform: uppercase;
      font-size: 11px;
    }
    td:last-child {
      text-align: right;
      font-weight: 600;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
    @media print {
      body {
        padding: 20px;
      }
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Hotel Booking Summary</h1>
    <p>Generated on ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}</p>
  </div>

  <div class="section">
    <h2 class="section-title">Configuration</h2>
    <div class="info-grid">
      <div class="info-label">Citizenship:</div>
      <div class="info-value">${state.basics.citizenship}</div>
      
      <div class="info-label">Travel Window:</div>
      <div class="info-value">${travelWindow}</div>
      
      <div class="info-label">Nights:</div>
      <div class="info-value">${state.dateRange.nights} ${
    state.dateRange.nights > 1 ? 'nights' : 'night'
  }</div>
      
      <div class="info-label">Destination:</div>
      <div class="info-value">${state.basics.country}</div>
      
      <div class="info-label">Board Type:</div>
      <div class="info-value">${boardLabel}</div>
      
      <div class="info-label">Hotel:</div>
      <div class="info-value">${
        selectedHotel
          ? `${selectedHotel.name} · $${selectedHotel.price}/night`
          : '—'
      }</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Daily Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hotel</th>
          <th>Lunch</th>
          <th>Dinner</th>
          <th>Daily Total</th>
        </tr>
      </thead>
      <tbody>
        ${pricing.days
          .map(
            (day) => `
          <tr>
            <td>${day.dayLabel}</td>
            <td>$${day.hotelPrice}</td>
            <td>${day.lunchLabel ? `${day.lunchLabel} · ` : ''}$${
              day.lunchPrice
            }</td>
            <td>${day.dinnerLabel ? `${day.dinnerLabel} · ` : ''}$${
              day.dinnerPrice
            }</td>
            <td>$${day.total}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <div class="totals">
    <div class="total-row">
      <span class="total-label">Hotel Total:</span>
      <span class="total-value">$${pricing.hotelTotal}</span>
    </div>
    <div class="total-row">
      <span class="total-label">Meals Total:</span>
      <span class="total-value">$${pricing.mealTotal}</span>
    </div>
    <div class="total-row grand">
      <span>Grand Total:</span>
      <span>$${pricing.grandTotal}</span>
    </div>
  </div>

  <div class="footer">
    <p>This is a booking summary. Please confirm all details before proceeding.</p>
  </div>
</body>
</html>
  `.trim()
}

export const printBookingSummary = (
  state: BookingState,
  pricing: PricingBreakdown,
): void => {
  const html = generateBookingSummaryHTML(state, pricing)
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    console.error('Failed to open print window')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.focus()

  setTimeout(() => {
    printWindow.print()
  }, 250)
}

export const exportBookingSummaryAsPDF = (
  state: BookingState,
  pricing: PricingBreakdown,
): void => {
  printBookingSummary(state, pricing)
}

