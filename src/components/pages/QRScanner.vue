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
  import router from '../../router/index.js'

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
        content = decodeURIComponent(content)
        console.log(content)
        this.$vote.publishWallet(content).then(() => { router.push({'name': 'gov'}) })
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
