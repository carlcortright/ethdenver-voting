<template>

  <div>
    <AppNav>

    </AppNav>
    <div class="container-fluid person-qr">
      <div v-if="!walletPublished">
          <img :src="imgSrc" style="display:inline-block">
          <h4>Wallet has not been created. Show this QR code to an administrator.</h4>
      </div>
      <div v-else-if="!canVote">
          <h4>Vote has not been enabled yet.</h4>
      </div>
      <div v-else-if="!voted">
        <b-form-select v-model="selected"  class="mb-3">
          <option v-for="(cand,cId) in candidates" :value="cId">{{cand.description}}</option>

        </b-form-select>
        <b-button v-on:click="vote(selected)" variant="success">Submit vote</b-button>
      </div>
      <div v-else>
        <h4>Voting Done</h4>
      </div>

      <!--<ol>-->
          <!--<li v-for="(cand,cId) in candidates">-->
            <!--{{ cand.description }}<a v-if="canVote && !voted" href="#" v-on:click="vote(cId)">Vote</a>-->
          <!--</li>-->
        <!--</ol>-->
      </div>
    </div>

</template>

<script>
  import AppNav from '../sections/AppNav.vue'

  export default {
    name: 'citizen',
    data () {
      return {
        'candidates': [],
        'walletPublished': false,
        'canVote': false,
        'voted': false,
        'selected': null,
        'imgSrc': 'http://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=' + encodeURIComponent(this.$vote.pubKey)
      }
    },
    mounted () {
      this.$vote.getCandidates().then((cands) => {
        this.candidates = cands
      })
      this.$vote.canVote().then((cVote) => {
        this.canVote = cVote
      })
      this.$vote.publishedWallet().then((pWallet) => {
        this.walletPublished = pWallet
      })
    },
    components: {
      'AppNav': AppNav
    },
    methods: {
      vote: function (cId) {
        this.$vote.submitVote(cId).then(() => {
          alert('Voted!')
          this.voted = true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.person-qr {
  text-align: center;
}
</style>
