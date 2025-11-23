import type { ReactNode } from 'react'
import { AppContainer } from '../components/common/AppContainer'
import { PageHeader } from '../components/common/PageHeader'
import { StepIndicator } from '../components/navigation/StepIndicator'

interface StepperLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export const StepperLayout = ({
  title,
  subtitle,
  children,
}: StepperLayoutProps) => (
  <AppContainer>
    <PageHeader title={title} subtitle={subtitle} />
    <div className="space-y-6">
      <StepIndicator />
      {children}
    </div>
  </AppContainer>
)

