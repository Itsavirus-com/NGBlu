import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const useProductConfiguration = () => {
  const { control, setValue } = useFormContext<CreateBusinessPartnerFormData>()

  // Layer 3 switches
  const layer3 = useWatch({ control, name: 'layer3' })
  const whiteLabel = useWatch({ control, name: 'whiteLabel' })
  const direct = useWatch({ control, name: 'direct' })

  // Layer 3 White Label options
  const whiteLabelInternet = useWatch({ control, name: 'whiteLabelInternet' })
  const whiteLabelIPVPN = useWatch({ control, name: 'whiteLabelIPVPN' })
  const whiteLabelMobileData = useWatch({ control, name: 'whiteLabelMobileData' })
  const whiteLabelSDWAN = useWatch({ control, name: 'whiteLabelSDWAN' })

  // Layer 3 Direct options
  const directInternet = useWatch({ control, name: 'directInternet' })
  const directIPVPN = useWatch({ control, name: 'directIPVPN' })
  const directMobileData = useWatch({ control, name: 'directMobileData' })
  const directSDWAN = useWatch({ control, name: 'directSDWAN' })

  // Layer 2
  const layer2 = useWatch({ control, name: 'layer2' })
  const deltaAccessLayer2 = useWatch({ control, name: 'deltaAccessLayer2' })

  // Voice products
  const voice = useWatch({ control, name: 'voice' })
  const traditionalTelephony = useWatch({ control, name: 'traditionalTelephony' })
  const ipTelephony = useWatch({ control, name: 'ipTelephony' })
  const xelion = useWatch({ control, name: 'xelion' })
  const hostedTelephony = useWatch({ control, name: 'hostedTelephony' })
  const sipTrunking = useWatch({ control, name: 'sipTrunking' })
  const oneSpace = useWatch({ control, name: 'oneSpace' })
  const fixedMobileIntegration = useWatch({ control, name: 'fixedMobileIntegration' })

  // Effect for handling layer3 toggle - only set initial values when toggled on
  useEffect(() => {
    // When Layer 3 is first enabled, auto-check White Label as a starting point
    if (layer3) {
      setValue('whiteLabel', true)
      setValue('whiteLabelInternet', true)
      setValue('whiteLabelIPVPN', true)
      setValue('whiteLabelMobileData', true)
      setValue('whiteLabelSDWAN', true)
    } else {
      // When Layer 3 is disabled, uncheck all its sub-options
      setValue('whiteLabel', false)
      setValue('direct', false)
      setValue('whiteLabelInternet', false)
      setValue('whiteLabelIPVPN', false)
      setValue('whiteLabelMobileData', false)
      setValue('whiteLabelSDWAN', false)
      setValue('directInternet', false)
      setValue('directIPVPN', false)
      setValue('directMobileData', false)
      setValue('directSDWAN', false)
    }
  }, [layer3, setValue])

  // Effect for handling whiteLabel toggle
  useEffect(() => {
    if (whiteLabel) {
      // When White Label is enabled, check all its sub-options
      setValue('whiteLabelInternet', true)
      setValue('whiteLabelIPVPN', true)
      setValue('whiteLabelMobileData', true)
      setValue('whiteLabelSDWAN', true)
    } else {
      // When White Label is disabled, uncheck all its sub-options
      setValue('whiteLabelInternet', false)
      setValue('whiteLabelIPVPN', false)
      setValue('whiteLabelMobileData', false)
      setValue('whiteLabelSDWAN', false)
    }
  }, [whiteLabel, setValue])

  // Effect for handling direct toggle
  useEffect(() => {
    if (direct) {
      // When Direct is enabled, check all its sub-options
      setValue('directInternet', true)
      setValue('directIPVPN', true)
      setValue('directMobileData', true)
      setValue('directSDWAN', true)
    } else {
      // When Direct is disabled, uncheck all its sub-options
      setValue('directInternet', false)
      setValue('directIPVPN', false)
      setValue('directMobileData', false)
      setValue('directSDWAN', false)
    }
  }, [direct, setValue])

  // Effect for handling voice toggle - only set initial values when toggled on
  useEffect(() => {
    // When voice is first enabled, auto-check all voice products as a starting point
    if (voice) {
      setValue('traditionalTelephony', true)
      setValue('ipTelephony', true)
      setValue('xelion', true)
      setValue('hostedTelephony', true)
      setValue('sipTrunking', true)
      setValue('oneSpace', true)
      setValue('fixedMobileIntegration', true)
    } else {
      // When voice is disabled, uncheck all voice products
      setValue('traditionalTelephony', false)
      setValue('ipTelephony', false)
      setValue('xelion', false)
      setValue('hostedTelephony', false)
      setValue('sipTrunking', false)
      setValue('oneSpace', false)
      setValue('fixedMobileIntegration', false)
    }
  }, [voice, setValue])

  // Effect for handling ipTelephony toggle
  useEffect(() => {
    if (ipTelephony) {
      // When IP Telephony is enabled, check all its sub-options
      setValue('xelion', true)
      setValue('hostedTelephony', true)
      setValue('sipTrunking', true)
      setValue('oneSpace', true)
    } else {
      // When IP Telephony is disabled, uncheck all its sub-options
      setValue('xelion', false)
      setValue('hostedTelephony', false)
      setValue('sipTrunking', false)
      setValue('oneSpace', false)
    }
  }, [ipTelephony, setValue])

  // Effect for layer2 toggle
  useEffect(() => {
    if (layer2) {
      // When Layer 2 is enabled, check Delta Access Layer 2
      setValue('deltaAccessLayer2', true)
    } else {
      // When Layer 2 is disabled, uncheck all its sub-options
      setValue('deltaAccessLayer2', false)
    }
  }, [layer2, setValue])

  return {
    // Return all the watched values
    layer3,
    whiteLabel,
    direct,
    whiteLabelInternet,
    whiteLabelIPVPN,
    whiteLabelMobileData,
    whiteLabelSDWAN,
    directInternet,
    directIPVPN,
    directMobileData,
    directSDWAN,
    layer2,
    deltaAccessLayer2,
    voice,
    traditionalTelephony,
    ipTelephony,
    xelion,
    hostedTelephony,
    sipTrunking,
    oneSpace,
    fixedMobileIntegration,
  }
}
