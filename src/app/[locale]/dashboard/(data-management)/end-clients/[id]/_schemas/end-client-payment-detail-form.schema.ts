import * as yup from 'yup'

export const schema = yup.object().shape({
  paymentInfoId: yup
    .number()
    .required('Payment info is required')
    .notOneOf([0], 'Payment info is required'),
  enterpriseRootId: yup
    .number()
    .nullable()
    .test({
      name: 'is-enterpriseRootId-required',
      test(value, ctx) {
        if (
          ctx.parent.inputType === 'enterpriseRootId' &&
          (value === undefined || value === null || value === 0)
        ) {
          return ctx.createError({
            message: 'Enterprise Root ID is required',
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
  inputType: yup.string().required('Please select a valid option'),
})
