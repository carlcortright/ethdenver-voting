<template>
  <div class="fill-container">
    <AppNav></AppNav>
    <StartElection></StartElection>
  </div>
    
</template>

<script>
import AppNav from '../sections/AppNav.vue'
import StartElection from '../sections/StartElection.vue'

export default {
  name: 'home-page',
  data () {
    this.test()
    return {}
  },
  components: {
    'AppNav': AppNav,
    'StartElection': StartElection
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
.fill-container {
  height: 100%;
  width: 100%;
}
</style>
