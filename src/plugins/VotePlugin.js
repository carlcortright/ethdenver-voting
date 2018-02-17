import Vote from '@/script/vote'

export default {
  install (Vue, options) {
    Vue.prototype.$vote = new Vote()
  }
}
