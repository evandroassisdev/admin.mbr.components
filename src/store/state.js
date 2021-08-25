import { LocalStorage } from 'quasar'
import server from '@server'

export default {
  user: LocalStorage.getItem('user') || {},
  isAuth: server.UserLogado(),
  token: LocalStorage.getItem('token'),
  vuex: LocalStorage.getItem('vuex') || {}
}
