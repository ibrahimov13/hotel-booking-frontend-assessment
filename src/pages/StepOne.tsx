import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StepperLayout } from '../layouts/StepperLayout'
import { Card } from '../components/common/Card'
import { FormSection } from '../components/forms/FormSection'
import { SelectField } from '../components/forms/SelectField'
import { DateRangePicker } from '../components/forms/DateRangePicker'
import { countries, hotelsByCountry } from '../data/options'
import { useBooking } from '../hooks/useBooking'
import { BoardTypeRadioGroup } from '../components/forms/BoardTypeRadioGroup'
import { Button } from '../components/common/Button'
import { WizardActions } from '../components/navigation/WizardActions'
import { validateStepOne, type StepOneErrors } from '../utils/validation'

const citizenshipOptions = [
  'Azerbaijan',
  'Turkey',
  'United Arab Emirates',
  'Italy',
  'United Kingdom',
  'United States',
]

export const StepOne = () => {
  const { state, updateBasics, updateDateRange } = useBooking()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<StepOneErrors>({})

  const hotelOptions = useMemo(
    () => (state.basics.country ? hotelsByCountry[state.basics.country] ?? [] : []),
    [state.basics.country],
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const validation = validateStepOne(state.basics, state.dateRange)
    setErrors(validation)

    if (Object.keys(validation).length === 0) {
      navigate('/step-2')
    }
  }

  return (
    <StepperLayout
      title="Trip Configuration"
      subtitle="Provide citizenship, travel window, and destination details."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Traveler information">
          <FormSection title="Citizenship">
            <SelectField
              label="Citizenship"
              value={state.basics.citizenship}
              onChange={(event) =>
                updateBasics({ citizenship: event.target.value })
              }
              error={errors.citizenship}
            >
              {citizenshipOptions.map((citizen) => (
                <option key={citizen} value={citizen}>
                  {citizen}
                </option>
              ))}
            </SelectField>
          </FormSection>
        </Card>

        <Card title="Travel details">
          <div className="space-y-6">
            <FormSection
              title="Date range"
              description="Starting date and number of nights."
            >
              <DateRangePicker
                startDate={state.dateRange.startDate}
                nights={state.dateRange.nights}
                onStartDateChange={(value) => updateDateRange({ startDate: value })}
                onNightChange={(value) => updateDateRange({ nights: value })}
                errors={{
                  startDate: errors.startDate,
                  nights: errors.nights,
                }}
              />
            </FormSection>

            <FormSection title="Destination & board">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField
                    label="Country"
                    value={state.basics.country}
                    onChange={(event) =>
                      updateBasics({ country: event.target.value })
                    }
                    error={errors.country}
                  >
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField
                    label="Hotel"
                    value={
                      state.basics.hotelId ? String(state.basics.hotelId) : ''
                    }
                    onChange={(event) =>
                      updateBasics({
                        hotelId: event.target.value
                          ? Number(event.target.value)
                          : null,
                      })
                    }
                    disabled={!state.basics.country}
                    error={errors.hotelId}
                    placeholder={
                      state.basics.country
                        ? 'Select hotel'
                        : 'Choose country first'
                    }
                  >
                    {hotelOptions.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} · ${hotel.price}
                      </option>
                    ))}
                  </SelectField>
                </div>

                <BoardTypeRadioGroup
                  value={state.basics.boardType}
                  onChange={(code) => updateBasics({ boardType: code })}
                  error={errors.boardType}
                />
              </div>
            </FormSection>
          </div>
        </Card>

        <WizardActions
          rightSlot={<Button type="submit">Next: Daily setup</Button>}
        />
      </form>
    </StepperLayout>
  )
}

