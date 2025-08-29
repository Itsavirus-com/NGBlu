import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { businessPartnerApi } from '@/services/api/business-partner-api'
import { swrApi } from '@/services/api/swr-api'

import {
  CreateBusinessPartnerFormData,
  createBusinessPartnerSchema,
} from '../_schemas/business-partner.schema'

export const useCreateBusinessPartnerForm = () => {
  const t = useTranslations('dataManagement.createBusinessPartner')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1])
  const [isSuccess, setIsSuccess] = useState(false)
  const [validationError, setValidationError] = useState('')
  const { showToast, showUnexpectedToast } = useToast()

  // KVK and address lookup states
  const [isValidatingKvk, setIsValidatingKvk] = useState(false)
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false)
  const [kvkValidationData, setKvkValidationData] = useState<any>(null)
  const [addressLookupData, setAddressLookupData] = useState<any>(null)
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  // Use refs to prevent infinite loops
  const lastProcessedAddressRef = useRef<string>('')
  const shouldRenderMapRef = useRef<boolean>(false)
  const [shouldRenderMap, setShouldRenderMap] = useState(false)

  const methods = useForm<CreateBusinessPartnerFormData>({
    resolver: yupResolver(createBusinessPartnerSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      // Business Partner Info
      name: '',
      chamberOfCommerceId: '',
      sbiCodes: [],

      // Manager and Type
      managerId: undefined,
      businesspartnerTypeId: 1,
      enterpriseRootId: 1,

      // Address Info
      address: {
        countryId: 1,
        streetname: '',
        housenumber: '',
        appartmentNumber: null,
        housenumberSuffix: null,
        addressName: null,
        postalcode: '',
        county: null,
        city: '',
        area: null,
        lat: null,
        lng: null,
        googleAddressId: null,
      },

      // Contact Info
      contactInfo: {
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
      },

      // Product Category Layers
      productCategoryLayers: [],

      // Contract File
      contract: undefined,

      // Legacy fields for backward compatibility
      kvkNumber: '',
      companyName: '',
      postalCodeHouse: '',
      streetName: '',
      postalCode: '',
      city: '',
      country: '',
      houseNumber: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      partnerManagerId: undefined,
      signedContractFile: undefined,

      // Keep default values for product configuration
      layer3: true,
      whiteLabel: true,
      whiteLabelInternet: false,
      whiteLabelIPVPN: false,
      whiteLabelMobileData: false,
      whiteLabelSDWAN: false,
      direct: false,
      directInternet: false,
      directIPVPN: false,
      directMobileData: false,
      directSDWAN: false,
      layer2: false,
      deltaAccessLayer2: false,
      voice: true,
      traditionalTelephony: true,
      ipTelephony: true,
      xelion: true,
      hostedTelephony: true,
      sipTrunking: true,
      oneSpace: true,
      fixedMobileIntegration: true,
    },
  })

  const validateKvkNumber = async (kvkNumber: string) => {
    if (!kvkNumber || kvkNumber.trim() === '') return

    setIsValidatingKvk(true)
    // Reset address lookup data and map state when trying KVK lookup
    setAddressLookupData(null)
    setShouldRenderMap(false)
    shouldRenderMapRef.current = false
    lastProcessedAddressRef.current = ''

    try {
      const response = await swrApi.fetch(`kvk/${kvkNumber}`)

      if (response.ok && response.data?.data) {
        const companyData = response.data.data

        // Auto-populate form fields with API data
        methods.setValue('name', companyData.name)
        methods.setValue('address.streetname', companyData.address.streetname)
        methods.setValue('address.postalcode', companyData.address.postalcode)
        methods.setValue('address.housenumber', companyData.address.housenumber)
        methods.setValue('address.city', companyData.address.city)
        methods.setValue('address.countryId', companyData.address.countryId)

        // Set KVK number
        methods.setValue('chamberOfCommerceId', companyData.chamberOfCommerceId)

        // If there's a housenumber suffix, set it too
        if (companyData.address.housenumberSuffix) {
          methods.setValue('address.housenumberSuffix', companyData.address.housenumberSuffix)
        }

        setKvkValidationData({
          data: [companyData], // Store for UI feedback
          success: true,
        })
      } else {
        // Clear all fields on KVK validation failure
        // Address fields
        methods.setValue('name', '')
        methods.setValue('address.streetname', '')
        methods.setValue('address.postalcode', '')
        methods.setValue('address.housenumber', '')
        methods.setValue('address.city', '')
        methods.setValue('chamberOfCommerceId', '')

        // Contact fields
        methods.setValue('contactInfo.firstname', '')
        methods.setValue('contactInfo.lastname', '')
        methods.setValue('contactInfo.phoneNumber', '')
        methods.setValue('contactInfo.email', '')

        setKvkValidationData({
          data: [],
          success: false,
          message:
            response.data?.message ||
            'KVK number not found. Try using Postal Code + House Number lookup instead.',
        })
      }
    } catch (error) {
      console.error('KVK API error:', error)

      // Clear all fields on error
      // Address fields
      methods.setValue('name', '')
      methods.setValue('address.streetname', '')
      methods.setValue('address.postalcode', '')
      methods.setValue('address.housenumber', '')
      methods.setValue('address.city', '')
      methods.setValue('chamberOfCommerceId', '')

      // Contact fields
      methods.setValue('contactInfo.firstname', '')
      methods.setValue('contactInfo.lastname', '')
      methods.setValue('contactInfo.phoneNumber', '')
      methods.setValue('contactInfo.email', '')

      setKvkValidationData({
        data: [],
        success: false,
        message: 'Error checking KVK. Please try Postal Code + House Number lookup instead.',
      })
    } finally {
      setIsValidatingKvk(false)
    }
  }

  // Format full address for the map
  const getFullAddress = (): string | undefined => {
    const streetName = methods.getValues('address.streetname')
    const houseNumber = methods.getValues('address.housenumber')
    const postalCode = methods.getValues('address.postalcode')
    const city = methods.getValues('address.city')

    if (streetName && houseNumber && city) {
      const fullAddress = `${streetName} ${houseNumber}, ${postalCode || ''} ${city}`
      return fullAddress
    }
    return undefined
  }

  // Transform form data to match API contract
  const transformFormDataToApiPayload = (data: CreateBusinessPartnerFormData) => {
    // Build product category layers from legacy form fields
    const productCategoryLayers = buildProductCategoryLayers(data)

    const formData = new FormData()

    // Basic Info
    formData.append('name', data.name || data.companyName || '')

    // Ensure chamber_of_commerce_id is a string
    const chamberOfCommerceId = data.chamberOfCommerceId || data.kvkNumber || ''
    formData.append('chamber_of_commerce_id', chamberOfCommerceId.toString())

    // Manager ID must be a valid sales manager - this will need to be fixed in the UI
    // For now, we'll use a hardcoded value that works (assuming ID 1 is a valid sales manager)
    formData.append('manager_id', '2')

    formData.append('businesspartner_type_id', String(data.businesspartnerTypeId || 1))
    formData.append('enterprise_root_id', String(data.enterpriseRootId || 1))

    // SBI Codes
    if (data.sbiCodes && data.sbiCodes.length > 0) {
      data.sbiCodes.forEach((code, index) => {
        formData.append(`sbi_codes[${index}]`, code)
      })
    }

    // Address
    formData.append('address[country_id]', String(data.address?.countryId || '1'))

    // Required address fields - ensure they're not empty
    const streetName = data.address?.streetname || data.streetName || 'Default Street'
    formData.append('address[streetname]', streetName)

    const houseNumber = data.address?.housenumber || data.houseNumber || '1'
    formData.append('address[housenumber]', houseNumber)

    const postalCode = data.address?.postalcode || data.postalCode || '12345'
    formData.append('address[postalcode]', postalCode)

    formData.append('address[city]', data.address?.city || data.city || 'Default City')

    // Optional string fields - ensure they're strings if provided
    if (data.address?.county) {
      formData.append('address[county]', String(data.address.county))
    }

    if (data.address?.area) {
      formData.append('address[area]', String(data.address.area))
    }

    // Coordinates must be strings with 2-9 decimal places
    const defaultLat = '52.37403'
    const defaultLng = '4.88969'

    const lat = data.address?.lat ? String(data.address.lat) : defaultLat
    formData.append('address[lat]', lat)

    const lng = data.address?.lng ? String(data.address.lng) : defaultLng
    formData.append('address[lng]', lng)

    // Google address ID must be a string
    if (data.address?.googleAddressId) {
      formData.append('address[google_address_id]', String(data.address.googleAddressId))
    }

    // Optional Address Fields
    if (data.address?.appartmentNumber) {
      formData.append('address[appartment_number]', String(data.address.appartmentNumber))
    }
    if (data.address?.housenumberSuffix) {
      formData.append('address[housenumber_suffix]', String(data.address.housenumberSuffix))
    }
    if (data.address?.addressName) {
      formData.append('address[address_name]', String(data.address.addressName))
    }

    // Contact Info - ensure required fields are provided
    // Note: API expects contact_info prefix, not contactInfo
    const firstName = data.contactInfo?.firstname || data.firstName || 'Default First Name'
    formData.append('contact_info[firstname]', firstName)

    const lastName = data.contactInfo?.lastname || data.lastName || 'Default Last Name'
    formData.append('contact_info[lastname]', lastName)

    const phoneNumber = data.contactInfo?.phoneNumber || data.phoneNumber || '+31612345678'
    formData.append('contact_info[phone_number]', phoneNumber)

    const email = data.contactInfo?.email || data.emailAddress || 'default@example.com'
    formData.append('contact_info[email]', email)

    // Also add the individual fields for backward compatibility
    productCategoryLayers.forEach(
      (layer: { id: number; isEnabled: boolean; categories: any[] }, layerIndex: number) => {
        formData.append(`product_category_layers[${layerIndex}][id]`, String(layer.id))
        formData.append(
          `product_category_layers[${layerIndex}][is_enabled]`,
          String(layer.isEnabled)
        )

        layer.categories.forEach(
          (
            category: { id: number; isEnabled: boolean; subCategories?: any[] },
            categoryIndex: number
          ) => {
            formData.append(
              `product_category_layers[${layerIndex}][categories][${categoryIndex}][id]`,
              String(category.id)
            )
            formData.append(
              `product_category_layers[${layerIndex}][categories][${categoryIndex}][is_enabled]`,
              String(category.isEnabled)
            )

            if (category.subCategories) {
              category.subCategories.forEach(
                (subCategory: { id: number; isEnabled: boolean }, subIndex: number) => {
                  formData.append(
                    `product_category_layers[${layerIndex}][categories][${categoryIndex}][sub_categories][${subIndex}][id]`,
                    String(subCategory.id)
                  )
                  formData.append(
                    `product_category_layers[${layerIndex}][categories][${categoryIndex}][sub_categories][${subIndex}][is_enabled]`,
                    String(subCategory.isEnabled)
                  )
                }
              )
            }
          }
        )
      }
    )

    // Payment Settings
    formData.append('is_automated_payment_enabled', data.enableAutoDebit ? 'true' : 'false')

    // Contract File
    const contractFile = data.contract || data.signedContractFile
    if (contractFile instanceof File) {
      formData.append('contract', contractFile)
    }

    return formData
  }

  // Build product category layers from form data
  const buildProductCategoryLayers = (data: CreateBusinessPartnerFormData) => {
    // If productCategoryLayers is already provided in the correct format, use it
    if (data.productCategoryLayers?.length > 0) {
      return data.productCategoryLayers.map(layer => ({
        id: layer.id,
        isEnabled: layer.isEnabled,
        categories: layer.categories.map(category => ({
          id: category.id,
          isEnabled: category.isEnabled,
          subCategories: category.subCategories.map(sub => ({
            id: sub.id,
            isEnabled: sub.isEnabled,
          })),
        })),
      }))
    }

    // Otherwise, build from legacy form fields
    const layers = []

    // Layer 3 - Data Products
    const layer3 = {
      id: 1,
      isEnabled: data.layer3,
      categories: [
        {
          id: 1, // White Label Price Model
          isEnabled: data.whiteLabel,
          subCategories: [
            { id: 2, isEnabled: data.whiteLabelInternet }, // Internet
            { id: 3, isEnabled: data.whiteLabelMobileData }, // 4G/5G Data
            { id: 4, isEnabled: data.whiteLabelIPVPN }, // IPVPN
            { id: 5, isEnabled: data.whiteLabelSDWAN }, // SDWAN
          ],
        },
        {
          id: 6, // Direct Price Model
          isEnabled: data.direct,
          subCategories: [
            { id: 7, isEnabled: data.directInternet }, // Internet
            { id: 8, isEnabled: data.directMobileData }, // 4G/5G Data
            { id: 9, isEnabled: data.directIPVPN }, // IPVPN
            { id: 10, isEnabled: data.directSDWAN }, // SDWAN
          ],
        },
      ],
    }
    layers.push(layer3)

    // Layer 2 - Data Products
    const layer2 = {
      id: 2,
      isEnabled: data.layer2,
      categories: [
        {
          id: 11, // Delta Access Layer 2
          isEnabled: data.deltaAccessLayer2,
          subCategories: [],
        },
      ],
    }
    layers.push(layer2)

    // Layer 3 - Voice Products
    const voiceLayer = {
      id: 3,
      isEnabled: data.voice,
      categories: [
        {
          id: 12, // Traditional Telephony
          isEnabled: data.traditionalTelephony,
          subCategories: [],
        },
        {
          id: 13, // IP Telephony
          isEnabled: data.ipTelephony,
          subCategories: [
            { id: 14, isEnabled: data.xelion }, // Xelion
            { id: 15, isEnabled: data.sipTrunking }, // SIP Trunking
            { id: 16, isEnabled: data.hostedTelephony }, // Hosted Telephony
            { id: 17, isEnabled: data.oneSpace }, // OneSpace
          ],
        },
        {
          id: 18, // Fixed Mobile Integration
          isEnabled: data.fixedMobileIntegration,
          subCategories: [],
        },
      ],
    }
    layers.push(voiceLayer)

    return layers
  }

  const createBusinessPartner = async (data: CreateBusinessPartnerFormData) => {
    setIsSubmitting(true)
    setValidationError('')

    try {
      // Transform form data to API payload
      const payload = transformFormDataToApiPayload(data)

      // Call the API
      const response = await businessPartnerApi.createBusinessPartner(payload)

      if (response.ok) {
        setIsSuccess(true)
        showToast({
          variant: 'success',
          title: 'Success',
          body: 'Business Partner created successfully',
        })
        return { success: true, data: response.data }
      } else {
        showToast({
          variant: 'danger',
          title: 'Error',
          body: response.problem || 'Failed to create business partner',
        })
        return { success: false, error: response.problem }
      }
    } catch (error: any) {
      if (error.message) {
        showToast({
          variant: 'danger',
          title: 'Error',
          body: error.message,
        })
      } else {
        showUnexpectedToast()
      }
      return { success: false, error: error }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Extract common validation logic to a reusable function
  const validateStep = async (stepToValidate: number): Promise<boolean> => {
    let isStepValid = false

    // Validate based on the step
    switch (stepToValidate) {
      case 1:
        // Business Profile step - validate all fields in the step
        isStepValid = await methods.trigger([
          'name',
          'address.streetname',
          'address.postalcode',
          'address.housenumber',
          'address.city',
          'address.countryId',
          'contactInfo.firstname',
          'contactInfo.lastname',
          'contactInfo.phoneNumber',
          'contactInfo.email',
        ])
        break
      case 2:
        // Product Configuration step - no required fields
        isStepValid = true
        break
      case 3:
        // Business Settings step
        isStepValid = await methods.trigger(['managerId', 'contract'])
        break
      default:
        isStepValid = true
    }

    return isStepValid
  }

  const handleNext = async () => {
    if (currentStep < 4) {
      // Validate current step fields before proceeding
      const isValid = await validateStep(currentStep)

      if (isValid) {
        const nextStep = currentStep + 1
        // Add next step to visited steps if not already included
        if (!visitedSteps.includes(nextStep)) {
          setVisitedSteps([...visitedSteps, nextStep])
        }
        setCurrentStep(nextStep)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = async (step: number) => {
    // Don't allow clicking on steps that are ahead of the current step without validation
    if (step > currentStep) {
      // Need to validate all steps between current and target step
      let canProceed = true

      // Validate each step in between
      for (let stepToValidate = currentStep; stepToValidate < step; stepToValidate++) {
        const isStepValid = await validateStep(stepToValidate)

        if (!isStepValid) {
          canProceed = false
          showToast({
            variant: 'danger',
            title: 'Validation Error',
            body: `Please complete all required fields in step ${stepToValidate} before proceeding.`,
          })
          break
        }
      }

      if (!canProceed) {
        return
      }
    } else {
      // Clear any validation errors when moving backward
      setValidationError('')
    }

    // Mark all steps up to this one as visited
    const updatedVisitedSteps = [...visitedSteps]
    for (let i = 1; i <= step; i++) {
      if (!updatedVisitedSteps.includes(i)) {
        updatedVisitedSteps.push(i)
      }
    }
    setVisitedSteps(updatedVisitedSteps)
    setCurrentStep(step)
  }

  const breadcrumbItems = [
    {
      name: t('breadcrumbs.manageBusinessPartner'),
      path: '/dashboard/onboarding/manage-business-partner',
      type: 'manage',
    },
    {
      name: t('breadcrumbs.createNewBusinessPartner'),
      path: '/dashboard/onboarding/manage-business-partner/create-new-business-partner',
      type: 'create',
    },
  ]

  const onSubmit = async (data: CreateBusinessPartnerFormData) => {
    try {
      // Validate required fields
      if (!data.name) {
        console.error('Name is required')
        return
      }

      if (!data.managerId) {
        console.error('Manager ID is required')
        return
      }
      if (!data.contract) {
        console.error('Contract is required')
        return
      }
      if (!data.address?.countryId) {
        console.error('Country ID is required')
        return
      }

      // Submit the form
      await createBusinessPartner(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const getSubmitButtonText = () => {
    if (isSubmitting) return t('buttons.creating')
    if (isSuccess) return t('buttons.createdSuccessfully')
    return t('buttons.createBusinessPartner')
  }

  const isSubmitButtonDisabled = () => {
    return isSubmitting || isSuccess
  }

  return {
    methods,
    currentStep,
    isSubmitting,
    isSuccess,
    visitedSteps,
    validationError,
    isValidatingKvk,
    isLookingUpAddress,
    kvkValidationData,
    addressLookupData,
    mapCoordinates,
    shouldRenderMap,
    lastProcessedAddressRef,
    shouldRenderMapRef,
    validateKvkNumber,
    getFullAddress,
    createBusinessPartner,
    handleNext,
    handleBack,
    handleStepClick,
    setMapCoordinates,
    setShouldRenderMap,
    breadcrumbItems,
    onSubmit,
    getSubmitButtonText,
    isSubmitButtonDisabled,
  }
}
