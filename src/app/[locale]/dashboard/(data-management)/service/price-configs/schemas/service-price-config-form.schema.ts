import * as yup from 'yup'

export const schema = yup.object().shape({
  activeFrom: yup.string().ensure(),
  activeTo: yup.string().ensure(),
  serviceId: yup.number().required('Service is required'),
  priceplanId: yup.number().required('Price Plan is required'),
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
        console.log(ctx, value)
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
  orgUnitId: yup.number().nullable(),
  inputType: yup.string().oneOf(['businesspartnerId', 'enterpriseRootId']),
})
