import { Base64 } from 'js-base64'

export const EncriptaBase64 = (value) => {
  if (!value) return null
  return Base64.encodeURI(value)
}

export const DescriptaBase64 = (value) => {
  if (!value) return null
  return Base64.decode(value)
}
