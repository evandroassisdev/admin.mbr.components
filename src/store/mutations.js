import { LocalStorage } from 'quasar'

export default {
  Logout: (state) => {
    LocalStorage.remove('token')
    LocalStorage.remove('user')
    LocalStorage.remove('vuex')
    state.isAuth = false
    state.token = null
  },
  SetUser: (state, user) => {
    LocalStorage.set('user', user)
    state.user = user
  },
  setToken: (state, token) => {
    LocalStorage.set('token', token)
    state.isAuth = true
    state.token = token
  }
}
