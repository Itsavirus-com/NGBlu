'use client'

import { useTranslations } from 'next-intl'
import { useSnapshot } from 'valtio'

import { loadingModel } from '@/stores/loading-model'
import { getCurrentLocale, getTranslation } from '@/utils/translation'

import Loading from './Loading'

interface LoadingOverlayProps {
  /**
   * Only show when specific ID is loading
   */
  id?: string
}

const LoadingOverlay = ({ id }: LoadingOverlayProps) => {
  const t = useTranslations()
  const { loadingStates, isLoading } = useSnapshot(loadingModel)

  // If ID is provided, only show for that specific loading state
  if (id) {
    const loadingState = loadingStates.find(state => state.id === id)
    if (!loadingState) return null

    const message = loadingState.message?.startsWith('common.')
      ? getTranslation(loadingState.message, getCurrentLocale())
      : loadingState.message

    return <Loading fullPage message={message} progress={loadingState.progress} />
  }

  // Otherwise, show for any loading state
  if (!isLoading) return null

  // Get the most recent loading state
  const mostRecent = [...loadingStates].sort((a, b) => b.timestamp - a.timestamp)[0]

  const message = mostRecent?.message?.startsWith('common.')
    ? getTranslation(mostRecent.message, getCurrentLocale())
    : mostRecent?.message || getTranslation('common.retrievingData', getCurrentLocale())

  return <Loading fullPage message={message} progress={mostRecent?.progress} />
}

export default LoadingOverlay
