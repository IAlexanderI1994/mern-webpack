import validator from 'validator'
import { isEmpty } from './is-empty'

export  function validatePostInput (data) {
  const errors         = {}
  const requiredFields = ['text']

  requiredFields.forEach(key => data[key] = !isEmpty(data[key]) ? data[key] : '')
  const { text } = data

  if (!validator.isLength(text, {
    min: 10,
    max: 300
  })) errors.text = 'text field must be between 10 and 300 characters'

  return { errors, isValid: isEmpty(errors) }
}