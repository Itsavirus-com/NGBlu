import * as yup from 'yup'

export const schema = yup.object().shape({
  firstname: yup
    .string()
    .ensure()
    .required('First name is required')
    .max(45, 'First name must be less than 45 characters'),
  lastname: yup.string().ensure().max(45, 'Last name must be less than 45 characters'),
  pronounce: yup.string().ensure().max(45, 'Pronounce must be less than 45 characters'),
  namePrefix: yup.string().ensure().max(45, 'Prefix must be less than 45 characters'),
  nameSuffix: yup.string().ensure().max(45, 'Suffix must be less than 45 characters'),
  genderId: yup.number().nullable().typeError('Gender must be a number'),
  personTypeId: yup
    .number()
    .required('Person type is required')
    .notOneOf([0], 'Person type is required'),
  titles: yup.string().ensure().max(45, 'Titles must be less than 45 characters'),
  salutation: yup.string().ensure().max(45, 'Salutation must be less than 45 characters'),
  department: yup.string().ensure().max(45, 'Department must be less than 45 characters'),
})
