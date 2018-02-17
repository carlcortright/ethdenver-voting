<template>
    <AppNav></AppNav>
</template>

<script>
import AppNav from '../sections/AppNav.vue'

export default {
  name: 'home-page',
  data () {
    this.test()
    return {}
  },
  components: {
    'AppNav': AppNav
  },
  methods: {
    test () {
      this.$vote.getCandidates().then((candidates) => {
        console.log(candidates)
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// some styles
</style>
