# Hotel Booking System – Frontend Technical Task

This project is the implementation of the Hotel Booking Frontend Assessment.

## 🛠️ Tech Stack

- **React 19** + **Vite**
- **TypeScript**
- **Context API** (global state management)
- **TailwindCSS**
- **React Router DOM 7**
- Clean component architecture

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── common/    # Button, Card, LoadingSpinner, PageHeader
│   ├── forms/     # Form components (Input, Select, DatePicker, etc.)
│   ├── navigation/# StepIndicator, WizardActions, WizardGuard
│   └── summary/   # SummaryCard, DailyBreakdownTable
├── context/        # BookingContext for state management
├── data/          # Static data (countries, hotels, meals)
├── hooks/         # Custom hooks (useBooking)
├── layouts/       # StepperLayout
├── pages/         # StepOne, StepTwo, StepThree
├── routes/        # AppRoutes
├── types/         # TypeScript definitions
└── utils/         # Helper functions (date, pricing, validation, storage, pdfExport)
```

## 🎯 Features

- Multi-step booking wizard (3 steps)
- Dynamic pricing calculation
- Meal selection based on board type (FB/HB/NB)
- Form validation
- State persistence with localStorage
- PDF export functionality
- Responsive design

## 🔧 Setup Instructions

```bash
npm install
npm run dev
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🚀 Live Demo

*(Deployment link will be added here)*
