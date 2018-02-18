<template>
  <div class="fill-container">
    <AppNav>

    </AppNav>
    <qrcode-reader @decode="onDecode"></qrcode-reader>
  </div>
</template>

<script>
  import AppNav from '../sections/AppNav.vue'

  export default {
    name: 'home-page',
    data () {
      return {
      }
    },
    components: {
      'AppNav': AppNav
    },
    methods: {
      onDecode (content) {
        console.log(content)
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
