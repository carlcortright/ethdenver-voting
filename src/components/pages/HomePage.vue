<template>
  <div class="fill-container">
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
.fill-container {
  height: 100%;
  
}
.half-screen {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
