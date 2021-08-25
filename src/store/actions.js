import axios from 'axios'
import { LocalStorage, Notify, Loading } from 'quasar'

export const Login = ({ commit, dispatch }, user) => {
  Loading.show()
  return axios.post('/auth', user)
    .then(resp => {
      if (resp.data.success) {
        commit('setToken', resp.data.token)
        commit('SetUser', resp.data.user)
        Notify.create({
          message: resp.data.message,
          color: 'positive',
          timeout: 5000,
          icon: 'fas fa-check',
          textColor: 'white'
        })
      } else {
        Notify.create({
          message: resp.data.message,
          color: 'negative',
          timeout: 5000,
          icon: 'fas fa-times',
          textColor: 'white'
        })
      }
      Loading.hide()
      return resp.data
    })
    .catch(err => {
      if (!err.response.data.success) {
        Notify.create({
          message: err.response.data.message,
          color: 'negative',
          timeout: 5000,
          icon: 'fas fa-times',
          textColor: 'white'
        })
      }
      Loading.hide()
      return err.response.data
    })
}

export const Logout = ({ commit }) => {
  commit('Logout')
  Loading.show()
  location.reload()
}

export const Post = ({ dispatch }, objeto) => {
  Header()
  Loading.show()
  return axios.post(objeto.endereco, objeto.data)
    .then(resp => {
      Loading.hide()
      Notify.create({
        message: resp.data.message,
        color: 'positive',
        timeout: 5000,
        icon: 'fas fa-check',
        textColor: 'white'
      })
      return resp.data
    })
    .catch(err => {
      Loading.hide()
      Notify.create({
        message: err.response.data.message,
        color: 'negative',
        timeout: 5000,
        icon: 'fas fa-times',
        textColor: 'white'
      })
      return err.response.data
    })
}

export const Put = ({ dispatch }, objeto) => {
  Header()
  Loading.show()
  return axios.put(objeto.endereco, objeto.data)
    .then(resp => {
      Loading.hide()
      Notify.create({
        message: resp.data.message,
        color: 'positive',
        timeout: 5000,
        icon: 'fas fa-check',
        textColor: 'white'
      })
      return resp.data
    })
    .catch(err => {
      Loading.hide()
      Notify.create({
        message: err.response.data.message,
        color: 'negative',
        timeout: 5000,
        icon: 'fas fa-times',
        textColor: 'white'
      })
      return err.response.data
    })
}

export const Delete = ({ dispath }, endereco) => {
  Header()
  Loading.show()
  return axios.delete(endereco)
    .then(resp => {
      Loading.hide()
      Notify.create({
        message: resp.data.message,
        color: 'positive',
        timeout: 5000,
        icon: 'fas fa-check',
        textColor: 'white'
      })
      return resp.data
    })
    .catch(err => {
      Loading.hide()
      Notify.create({
        message: err.response.data.message,
        color: 'negative',
        timeout: 5000,
        icon: 'fas fa-times',
        textColor: 'white'
      })
      return err.response.data
    })
}

export const Get = ({ commit, dispatch, state }, endereco) => {
  Header()
  return axios.get(endereco)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      if (err.response.status === 401) {
        dispatch('ReLogin')
      }
    })
}

export const Patch = ({ dispatch }, objeto) => {
  Header()
  Loading.show()
  return axios.patch(objeto.endereco, objeto.data)
    .then(resp => {
      Loading.hide()
      Notify.create({
        message: resp.data.message,
        color: 'positive',
        timeout: 5000,
        icon: 'fas fa-check',
        textColor: 'white'
      })
      return resp.data
    })
    .catch(err => {
      Loading.hide()
      Notify.create({
        message: err.response.data.message,
        color: 'negative',
        timeout: 5000,
        icon: 'fas fa-times',
        textColor: 'white'
      })
      return err.response.data
    })
}

// export const Delete = ({ commit, dispatch, state }, endereco) => {
//   Header()
//   Loading.show()
//   return axios.delete(endereco)
//     .then(resp => {
//       Loading.hide()
//       Notify.create({
//         message: resp.data.message,
//         color: 'negative',
//         timeout: 5000,
//         icon: 'fas fa-check',
//         textColor: 'white'
//       })
//       return resp.data
//     })
//     .catch(err => {
//       console.log(err)
//       if (err.response.status === 401) {
//         dispatch('ReLogin')
//       }
//     })
// }

export const DeleteAll = ({ dispatch }, object) => {
  Header()
  Loading.show()
  return axios.delete(object.endereco, { data: object.data })
    .then(resp => {
      Loading.hide()
      return resp.data
    })
    .catch(erro => {
      Loading.hide()
      if (erro.response.status === 401) {
        dispatch('ReLogin')
      }
      return erro.response.data
    })
}

export const ReLogin = ({ commit, dispatch, state }) => {
  Loading.show()
  setTimeout(() => {
    commit('Logout')
    window.location = '/'
    Loading.hide()
  }, 1000)
}

const Header = () => {
  var common = {
    Authorization: 'Bearer ' + LocalStorage.getItem('token'),
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
  axios.defaults.headers = {
    common: common
  }
}
