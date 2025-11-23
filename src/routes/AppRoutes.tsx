import { Route, Routes } from 'react-router-dom'
import { StepOne } from '../pages/StepOne'
import { StepTwo } from '../pages/StepTwo'
import { StepThree } from '../pages/StepThree'
import { WizardGuard } from '../components/navigation/WizardGuard'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<StepOne />} />
    <Route
      path="/step-2"
      element={
        <WizardGuard requiredStep={2}>
          <StepTwo />
        </WizardGuard>
      }
    />
    <Route
      path="/step-3"
      element={
        <WizardGuard requiredStep={3}>
          <StepThree />
        </WizardGuard>
      }
    />
  </Routes>
)

