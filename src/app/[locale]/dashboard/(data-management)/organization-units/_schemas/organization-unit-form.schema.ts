import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().ensure().required('Company Name is required'),
  primaryAddressId: yup.number().nullable(),
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
        if (
          (ctx.parent.inputType === 'endclientId' || ctx.parent.inputType === 'enterpriseRootId') &&
          (value === undefined || value === null || value === 0)
        ) {
          return ctx.createError({
            message: 'Enterprise Root ID is required',
          })
        }
        return true
      },
    }),
  inputType: yup.string().required('Please select a valid option'),
})
