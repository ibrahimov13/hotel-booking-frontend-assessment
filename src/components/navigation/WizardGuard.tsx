import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../hooks/useBooking'
import type { ReactNode } from 'react'

interface WizardGuardProps {
  children: ReactNode
  requiredStep: 1 | 2 | 3
}

export const WizardGuard = ({ children, requiredStep }: WizardGuardProps) => {
  const navigate = useNavigate()
  const { state } = useBooking()

  useEffect(() => {
    if (requiredStep === 2) {
      const step1Complete =
        state.basics.citizenship &&
        state.basics.country &&
        state.basics.hotelId !== null &&
        state.basics.boardType &&
        state.dateRange.startDate &&
        state.dateRange.nights > 0

      if (!step1Complete) {
        navigate('/', { replace: true })
        return
      }
    }

    if (requiredStep === 3) {
      const step1Complete =
        state.basics.citizenship &&
        state.basics.country &&
        state.basics.hotelId !== null &&
        state.basics.boardType &&
        state.dateRange.startDate &&
        state.dateRange.nights > 0

      const step2Complete =
        state.dailyMeals.length === state.dateRange.nights &&
        state.dailyMeals.some(
          (meal) => meal.lunchId !== null || meal.dinnerId !== null,
        )

      if (!step1Complete || !step2Complete) {
        if (!step1Complete) {
          navigate('/', { replace: true })
        } else {
          navigate('/step-2', { replace: true })
        }
        return
      }
    }
  }, [requiredStep, state, navigate])

  return <>{children}</>
}

