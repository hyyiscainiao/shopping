import { getInfo, setInfo } from '@/units/storage'
export default {
  namespaced: true,
  state () {
    return {
      userinfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userinfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {

  }
}
