import validator from 'validator'
import { isEmpty } from './is-empty'

export default function validateRegisterInput ({ name }) {
  const errors = {}
  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters'
  }
  return { errors, isValid: isEmpty(errors) }
}