<template>
  <div>
    <h1>TODO</h1>
    <p>Make it work.</p>
  </div>
</template>

<script>
export default {
  name: 'home-page',
  data () {
    this.test()
    return {}
  },
  components: {
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
