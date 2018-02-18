<template>
  <div class="fill-container">
    <AppNav>

    </AppNav>
    <div class="row fill-container">
      <div class="col-md-6 fill-container">
      <div class="half-screen fill-container">
        <a href="#/citizen"><b-button>Citizen Portal</b-button></a>
      </div>
      </div>
      <div class="col-md-6 fill-container">
        <div class="half-screen fill-container">
          <a href="#/government"><b-button>Government Portal</b-button></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from '../sections/AppNav.vue'

export default {
  name: 'home-page',
  data () {
    return {}
  },
  components: {
    'AppNav': AppNav
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.fill-container {
  height: 100%;
}
.half-screen {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
