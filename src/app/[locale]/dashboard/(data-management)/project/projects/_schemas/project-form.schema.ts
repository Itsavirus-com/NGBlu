import * as yup from 'yup'

export const schema = yup.object().shape({
  projectName: yup.string().ensure().required('Project Name is required').max(255),
  projectTypeId: yup
    .number()
    .required('Project Type is required')
    .notOneOf([0], 'Project Type is required'),
  projectInfoId: yup
    .number()
    .required('Project Info is required')
    .notOneOf([0], 'Project Info is required'),
  addressId: yup.number().nullable(),
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
  businesspartnersId: yup
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
  ouUnitId: yup.number().nullable(),
  inputType: yup.string().ensure().required('Please select a valid option'),
})
