import * as filters from './filters'
import * as Cript from './cript'
import { Notify } from 'quasar'

export const Copy = (value) => {
  var disp = navigator.userAgent.match(/ipad|iphone/i)
  if (disp) {
    CopyApple(value)
  } else {
    CopyAll(value)
  }
}

const CopyAll = (value) => {
  const el = document.createElement('input')
  el.value = value
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  Notify.create({
    message: 'Copiado com sucesso',
    icon: 'done',
    color: 'positive',
    actions: [{ icon: 'close', color: 'white' }]
  })
}

const CopyApple = (value) => {
  const el = document.createElement('input')
  el.value = value
  document.body.appendChild(el)
  var range = document.createRange()
  range.selectNodeContents(el)
  var selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  el.setSelectionRange(0, 999999)
  document.execCommand('copy')
  document.body.removeChild(el)
  Notify.create({
    message: 'Copiado com sucesso',
    icon: 'done',
    color: 'positive',
    actions: [{ icon: 'close', color: 'white' }]
  })
}

export default { filters, Copy, Cript }
