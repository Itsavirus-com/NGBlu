'use client'

import { redirect } from 'next/navigation'

export default function OnboardingPage() {
  // Redirect to profile completion as the main onboarding flow
  redirect('/dashboard/onboarding/profile-completion')
}
