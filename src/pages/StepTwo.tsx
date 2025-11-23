import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepperLayout } from '../layouts/StepperLayout'
import { Card } from '../components/common/Card'
import { MealSelector } from '../components/forms/MealSelector'
import { DailyMealsTable } from '../components/forms/DailyMealsTable'
import { useBooking } from '../hooks/useBooking'
import { generateTravelDays } from '../utils/date'
import { mealOptions } from '../data/options'
import { validateDailyMeals } from '../utils/validation'
import { Button } from '../components/common/Button'
import { WizardActions } from '../components/navigation/WizardActions'

export const StepTwo = () => {
  const navigate = useNavigate()
  const { state, setDailyMeals } = useBooking()
  const [error, setError] = useState<string | null>(null)

  const travelDays = useMemo(
    () =>
      generateTravelDays(state.dateRange.startDate, state.dateRange.nights),
    [state.dateRange.startDate, state.dateRange.nights],
  )

  const countryMeals = state.basics.country
    ? mealOptions[state.basics.country]
    : undefined

  const handleMealChange = (
    dayIndex: number,
    type: 'lunch' | 'dinner',
    mealId: number | null,
  ) => {
    if (state.basics.boardType === 'NB') return

    if (state.basics.boardType === 'HB' && mealId) {
      if (type === 'lunch') {
        setDailyMeals(dayIndex, { lunchId: mealId, dinnerId: null })
      } else {
        setDailyMeals(dayIndex, { dinnerId: mealId, lunchId: null })
      }
      return
    }

    if (type === 'lunch') {
      setDailyMeals(dayIndex, { lunchId: mealId })
    } else {
      setDailyMeals(dayIndex, { dinnerId: mealId })
    }
  }

  const handleNext = () => {
    const validation = validateDailyMeals(
      state.basics.boardType,
      state.dailyMeals,
      state.dateRange.nights,
    )

    if (!validation.isValid) {
      setError(validation.message ?? 'Please review your meal selections.')
      return
    }

    setError(null)
    navigate('/step-3')
  }

  return (
    <StepperLayout
      title="Daily configuration"
      subtitle="Configure lunch and dinner per travel day based on board type."
    >
      <Card
        title="Meal plan rules"
        description="FB permits both meals, HB allows one meal per day, NB disables meals."
      >
        <MealSelector boardType={state.basics.boardType} />
      </Card>

      <Card title="Daily planner">
        <DailyMealsTable
          days={travelDays}
          boardType={state.basics.boardType}
          selections={state.dailyMeals}
          mealOptions={countryMeals}
          onMealChange={handleMealChange}
        />
        {error ? (
          <p className="mt-4 text-sm text-rose-600">{error}</p>
        ) : null}
      </Card>

      <WizardActions
        leftSlot={
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Back to Step 1
          </Button>
        }
        rightSlot={
          <Button type="button" onClick={handleNext}>
            Next: Summary
          </Button>
        }
      />
    </StepperLayout>
  )
}

