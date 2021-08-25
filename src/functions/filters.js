import { date } from 'quasar'

export const removeCaracter = (value) => {
  var er = /[^a-z0-9]/gi
  return value.replace(er, '')
}

export const DataTimeDDMMYY = (dateValue) => {
  if (!dateValue || dateValue === '0001-01-01T00:00:00Z') return null
  return date.formatDate(dateValue, 'DD/MM/YYYY HH:mm:ss')
}

export const DataFormatBR = (dateValue) => {
  if (!dateValue || dateValue === '0001-01-01T00:00:00Z') return null
  return date.formatDate(dateValue, 'DD/MM/YYYY')
}

export const CPFCNPJFormat = (v) => {
  if (v.length >= 14) {
    return CNPJFormat(v)
  } else {
    return CPFFormat(v)
  }
}

export const CPFFormat = (v) => {
  v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
  v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                            //de novo (para o segundo bloco de números)
  v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
  return v
}
export const CNPJFormat = (v) => {
  v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
  v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
  v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
  v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
  v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
  return v
}
