import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().ensure().required('Name is Required').max(255),
  productId: yup
    .number()
    .nullable()
    .test({
      name: 'is-productId-required',
      test(value, ctx) {
        if (
          ctx.parent.inputType === 'productId' &&
          (value === undefined || value === null || value === 0)
        ) {
          return ctx.createError({
            message: 'Product is Required',
          })
        }
        return true
      },
    }),
  serviceId: yup
    .number()
    .nullable()
    .test({
      name: 'is-serviceId-required',
      test(value, ctx) {
        if (
          ctx.parent.inputType === 'serviceId' &&
          (value === undefined || value === null || value === 0)
        ) {
          return ctx.createError({
            message: 'Service is Required',
          })
        }
        return true
      },
    }),
  priceConfigId: yup
    .number()
    .required('Price Config is Required')
    .notOneOf([0], 'Price Config is Required'),
  fallbackPriceConfigId: yup.number().nullable(),
  isDefault: yup.boolean(),
  inputType: yup.string(),
})
