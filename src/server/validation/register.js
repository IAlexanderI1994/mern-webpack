import validator from 'validator'
import { isEmpty } from './is-empty'

export default function validateRegisterInput (data) {
  const errors         = {}
  const requiredFields = ['name', 'email', 'password', 'password2']

  requiredFields.forEach(key => data[key] = !isEmpty(data[key]) ? data[key] : '')
  const { name, email, password, password2 } = data

  if (!validator.isLength(name, { min: 2, max: 30 })) errors.name = 'Name must be between 2 and 30 characters'

  if (!validator.isEmail(email)) errors.email = 'Email is invalid'
  if (!validator.isLength(password, {
    min: 6,
    max: 12
  })) errors.password = 'password must be between 6 and 12 characters'

  if (!validator.isLength(password2, {
    min: 6,
    max: 12
  })) errors.password2 = 'Confirm password must be between 6 and 12 characters'

  if (!validator.equals(password, password2)) errors.password2 = 'passwords must match'



  return { errors, isValid: isEmpty(errors) }
}