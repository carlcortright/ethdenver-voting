<template>
  <div class="fill-container">
    <AppNav>
      <b-nav-form>
        <b-button size="md" :to="{ name: 'qr'}" ><i class="fa fa-plus"></i> Register New Voter</b-button>
      </b-nav-form>
    </AppNav>
    <StartElection v-if="!election">
      <b-button class="btn-success" v-on:click="startElection" type="submit">Create Election</b-button>
    </StartElection>
    <b-button v-on:click="stopElection" v-if="election && !electionDone"></b-button>


  </div>
</template>


<script>
import AppNav from '../sections/AppNav.vue'
import StartElection from '../sections/StartElection.vue'

export default {
  name: 'home-page',
  data () {
    return {
      'election': false,
      'electionDone': false
    }
  },
  components: {
    'AppNav': AppNav,
    'StartElection': StartElection
  },
  methods: {
    startElection () {
      (async () => {
        for (let candidate of this.candidates) {
          await this.$vote.addCandidate(candidate.description, 'asd')
        }
        await this.$vote.beginVoting()
      })().then(() => { this.election = true })
    },
    stopElection () {
      this.$vote.endVoting().then(() => { this.electionDone = true })
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
