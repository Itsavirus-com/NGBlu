import * as yup from 'yup'

export const schema = yup.object().shape({
  firstname: yup.string().required('First name is required').max(255),
  lastname: yup.string().required('Last name is required').max(255),
  phoneNumber: yup
    .string()
    .nullable()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Phone number is not valid'
    ),
  email: yup.string().required('Email is required').email('Invalid email format'),
  roles: yup.array().required('Roles are required'),
  invitationMethod: yup
    .string()
    .required('Invitation method is required')
    .oneOf(['manual', 'entra']),
})
