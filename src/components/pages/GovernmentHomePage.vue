<template>
  <div class="fill-container">
    <AppNav>
      <b-nav-form>
        <b-button size="md" :to="{ name: 'qr'}" ><i class="fa fa-plus"></i> Register New Voter</b-button>
      </b-nav-form>
    </AppNav>
    <StartElection></StartElection>

  </div>
</template>


<script>
import AppNav from '../sections/AppNav.vue'
import StartElection from '../sections/StartElection.vue'

export default {
  name: 'home-page',
  data () {
    return {
      'qrview': false
    }
  },
  components: {
    'AppNav': AppNav,
    'StartElection': StartElection
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.fill-container {
  height: 100%;
  width: 100%;
}
</style>
