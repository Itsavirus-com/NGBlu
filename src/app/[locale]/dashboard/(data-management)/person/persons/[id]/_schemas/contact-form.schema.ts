import * as yup from 'yup'

export const schema = yup.object().shape({
  contactInfo: yup.string().ensure().required('Contact Info is required'),
  contactTypeId: yup
    .number()
    .required('Contact Type is required')
    .notOneOf([0], 'Contact Type is required'),
  endclientId: yup
    .number()
    .nullable()
    .test({
      name: 'is-endclientId-required',
      test(value, ctx) {
        if (
          ctx.parent.inputType === 'endclientId' &&
          (value === undefined || value === null || value === 0)
        ) {
          return ctx.createError({
            message: 'End Client ID is required',
          })
        }
        return true
      },
    }),
  businesspartnerId: yup
    .number()
    .nullable()
    .test({
      name: 'is-businesspartnerId-required',
      test(value, ctx) {
        if (
          ctx.parent.inputType === 'businesspartnerId' &&
          (value === undefined || value === null || value === 0)
        ) {
          return ctx.createError({
            message: 'Business Partner ID is required',
          })
        }
        return true
      },
    }),
  enterpriseRootId: yup
    .number()
    .nullable()
    .test({
      name: 'is-enterpriseRootId-required',
      test(value, ctx) {
        if (!!ctx.parent.inputType && (value === undefined || value === null || value === 0)) {
          return ctx.createError({
            message: 'Enterprise Root ID is required',
          })
        }
        return true
      },
    }),
  inputType: yup.string(),
  ouUnitId: yup.number().nullable(),
})
