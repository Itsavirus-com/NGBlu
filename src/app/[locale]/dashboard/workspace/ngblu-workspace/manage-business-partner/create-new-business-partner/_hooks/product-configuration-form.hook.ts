import { useEffect, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import {
  ProductCategory,
  ProductLayer,
  ProductSubcategory,
  useProductCategory,
} from '@/services/swr/use-product-category'

import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const useProductConfiguration = () => {
  const { control, setValue } = useFormContext<CreateBusinessPartnerFormData>()
  const directFirstTimeRef = useRef(true)
  const whiteLabelFirstTimeRef = useRef(true)
  const layer3FirstTimeRef = useRef(true)
  const layer2FirstTimeRef = useRef(true)
  const voiceFirstTimeRef = useRef(true)
  const ipTelephonyFirstTimeRef = useRef(true)

  // Use our custom hook instead of direct useSWR
  const {
    data: categoryHierarchy,
    error: categoryError,
    isLoading: isCategoryLoading,
    isSuccess: isCategorySuccess,
  } = useProductCategory()

  // Extract dynamic labels from API data
  const getDynamicLabels = () => {
    if (!categoryHierarchy) return {}

    const labels: Record<string, any> = {}

    categoryHierarchy.forEach((layer: ProductLayer) => {
      // Layer labels
      labels[layer.layer] = layer.layer

      layer.categories.forEach((category: ProductCategory) => {
        // Category labels
        labels[category.productCategory] = category.productCategory

        // Subcategory labels
        category.subcategories.forEach((subcategory: ProductSubcategory) => {
          labels[subcategory.productCategory] = subcategory.productCategory
        })
      })
    })

    return labels
  }

  const dynamicLabels = getDynamicLabels()

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
    if (!categoryHierarchy) return

    const layer3Data = categoryHierarchy.find(
      (layer: ProductLayer) => layer.layer === 'Layer 3 Data Products'
    )
    if (!layer3Data) return

    if (layer3 && layer3FirstTimeRef.current) {
      // When Layer 3 is first enabled, auto-check White Label as a starting point
      const whiteLabel = layer3Data?.categories?.find(
        (cat: ProductCategory) => cat.productCategory === 'White Label Price Model'
      )
      if (whiteLabel) {
        setValue('whiteLabel', true)
        whiteLabel.subcategories.forEach((sub: ProductSubcategory) => {
          switch (sub.productCategory) {
            case 'Internet':
              setValue('whiteLabelInternet', true)
              break
            case '4G/5G Data':
              setValue('whiteLabelMobileData', true)
              break
            case 'IPVPN':
              setValue('whiteLabelIPVPN', true)
              break
            case 'SDWAN':
              setValue('whiteLabelSDWAN', true)
              break
          }
        })
      }
      layer3FirstTimeRef.current = false
    } else if (!layer3) {
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
      layer3FirstTimeRef.current = true // Reset for next time
    }
  }, [layer3, setValue, categoryHierarchy])

  // Effect for handling whiteLabel toggle
  useEffect(() => {
    if (!categoryHierarchy) return

    const layer3Data = categoryHierarchy.find(
      (layer: ProductLayer) => layer.layer === 'Layer 3 Data Products'
    )
    if (!layer3Data) return

    const whiteLabelCategory = layer3Data?.categories?.find(
      (cat: ProductCategory) => cat.productCategory === 'White Label Price Model'
    )
    if (!whiteLabelCategory) return

    if (whiteLabel && whiteLabelFirstTimeRef.current) {
      // When White Label is first enabled, check all its sub-options
      whiteLabelCategory?.subcategories?.forEach((sub: ProductSubcategory) => {
        switch (sub.productCategory) {
          case 'Internet':
            setValue('whiteLabelInternet', true)
            break
          case '4G/5G Data':
            setValue('whiteLabelMobileData', true)
            break
          case 'IPVPN':
            setValue('whiteLabelIPVPN', true)
            break
          case 'SDWAN':
            setValue('whiteLabelSDWAN', true)
            break
        }
      })
      whiteLabelFirstTimeRef.current = false
    } else if (!whiteLabel) {
      // When White Label is disabled, uncheck all its sub-options
      setValue('whiteLabelInternet', false)
      setValue('whiteLabelIPVPN', false)
      setValue('whiteLabelMobileData', false)
      setValue('whiteLabelSDWAN', false)
      whiteLabelFirstTimeRef.current = true // Reset for next time
    }
  }, [whiteLabel, setValue, categoryHierarchy])

  // Effect for handling direct toggle
  useEffect(() => {
    if (!categoryHierarchy) return

    const layer3Data = categoryHierarchy.find(
      (layer: ProductLayer) => layer.layer === 'Layer 3 Data Products'
    )
    if (!layer3Data) return

    const directCategory = layer3Data?.categories?.find(
      (cat: ProductCategory) => cat.productCategory === 'Data Direct Price Model'
    )
    if (!directCategory) return

    if (direct && directFirstTimeRef.current) {
      // When Direct is first enabled, check all its sub-options
      directCategory?.subcategories?.forEach((sub: ProductSubcategory) => {
        switch (sub.productCategory) {
          case 'Internet':
            setValue('directInternet', true)
            break
          case '4G/5G Data':
            setValue('directMobileData', true)
            break
          case 'IPVPN':
            setValue('directIPVPN', true)
            break
          case 'SDWAN':
            setValue('directSDWAN', true)
            break
        }
      })
      directFirstTimeRef.current = false
    } else if (!direct) {
      // When Direct is disabled, uncheck all its sub-options
      setValue('directInternet', false)
      setValue('directIPVPN', false)
      setValue('directMobileData', false)
      setValue('directSDWAN', false)
      directFirstTimeRef.current = true // Reset for next time
    }
  }, [direct, setValue, categoryHierarchy])

  // Effect for handling voice toggle - only set initial values when toggled on
  useEffect(() => {
    if (!categoryHierarchy) return

    const voiceData = categoryHierarchy.find(
      (layer: ProductLayer) => layer.layer === 'Voice Products'
    )
    if (!voiceData) return

    if (voice && voiceFirstTimeRef.current) {
      // When voice is first enabled, set values based on API data
      voiceData?.categories?.forEach((category: ProductCategory) => {
        switch (category.productCategory) {
          case 'Traditional Telephony':
            setValue('traditionalTelephony', true)
            break
          case 'IP Telephony':
            setValue('ipTelephony', true)
            category.subcategories.forEach((sub: ProductSubcategory) => {
              switch (sub.productCategory) {
                case 'Xelion':
                  setValue('xelion', true)
                  break
                case 'Hosted Telephony':
                  setValue('hostedTelephony', true)
                  break
                case 'SIP Trunking':
                  setValue('sipTrunking', true)
                  break
                case 'OneSpace':
                  setValue('oneSpace', true)
                  break
              }
            })
            break
          case 'Fixed Mobile Integration':
            setValue('fixedMobileIntegration', true)
            break
        }
      })
      voiceFirstTimeRef.current = false
    } else if (!voice) {
      // When voice is disabled, uncheck all voice products
      setValue('traditionalTelephony', false)
      setValue('ipTelephony', false)
      setValue('xelion', false)
      setValue('hostedTelephony', false)
      setValue('sipTrunking', false)
      setValue('oneSpace', false)
      setValue('fixedMobileIntegration', false)
      voiceFirstTimeRef.current = true // Reset for next time
    }
  }, [voice, setValue, categoryHierarchy])

  // Effect for handling ipTelephony toggle
  useEffect(() => {
    if (!categoryHierarchy) return

    const voiceData = categoryHierarchy.find(
      (layer: ProductLayer) => layer.layer === 'Voice Products'
    )
    if (!voiceData) return

    const ipTelephonyCategory = voiceData?.categories?.find(
      (cat: ProductCategory) => cat.productCategory === 'IP Telephony'
    )
    if (!ipTelephonyCategory) return

    if (ipTelephony && ipTelephonyFirstTimeRef.current) {
      // When IP Telephony is first enabled, check all its sub-options
      ipTelephonyCategory?.subcategories?.forEach((sub: ProductSubcategory) => {
        switch (sub.productCategory) {
          case 'Xelion':
            setValue('xelion', true)
            break
          case 'Hosted Telephony':
            setValue('hostedTelephony', true)
            break
          case 'SIP Trunking':
            setValue('sipTrunking', true)
            break
          case 'OneSpace':
            setValue('oneSpace', true)
            break
        }
      })
      ipTelephonyFirstTimeRef.current = false
    } else if (!ipTelephony) {
      // When IP Telephony is disabled, uncheck all its sub-options
      setValue('xelion', false)
      setValue('hostedTelephony', false)
      setValue('sipTrunking', false)
      setValue('oneSpace', false)
      ipTelephonyFirstTimeRef.current = true // Reset for next time
    }
  }, [ipTelephony, setValue, categoryHierarchy])

  // Effect for layer2 toggle
  useEffect(() => {
    if (!categoryHierarchy) return

    const layer2Data = categoryHierarchy.find(
      (layer: ProductLayer) => layer.layer === 'Layer 2 Data Products'
    )
    if (!layer2Data) return

    if (layer2 && layer2FirstTimeRef.current) {
      // When Layer 2 is first enabled, check Delta Access Layer 2
      const deltaAccessCategory = layer2Data?.categories?.find(
        (cat: ProductCategory) => cat.productCategory === 'Delta Access Layer 2'
      )
      if (deltaAccessCategory) {
        setValue('deltaAccessLayer2', true)
      }
      layer2FirstTimeRef.current = false
    } else if (!layer2) {
      // When Layer 2 is disabled, uncheck all its sub-options
      setValue('deltaAccessLayer2', false)
      layer2FirstTimeRef.current = true // Reset for next time
    }
  }, [layer2, setValue, categoryHierarchy])

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

    // Category data from API
    categoryHierarchy,
    categoryError,
    isCategorySuccess,

    // Dynamic labels
    dynamicLabels,
  }
}
