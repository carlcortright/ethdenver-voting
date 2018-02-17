<template>
  <div>
    <h1>TODO</h1>
    <p>Make it work.</p>
    <ol>
      <li v-for="cand in candidates">
        {{ cand.description }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'home-page',
    data () {
      return {
        'candidates': []
      }
    },
    mounted () {
      this.$vote.getCandidates().then((cands) => {
        this.candidates = cands
      })
    },
    components: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
</style>
