<template>
  <div class="fill-container">
    <AppNav>

    </AppNav>
    <div class="qr-wrapper">
      <qrcode-reader @decode="onDecode" class="qr-scanner"></qrcode-reader>
    </div>
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
  .qr-scanner{
    display: inline-block;
    margin: 20px
  }
  .qr-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
