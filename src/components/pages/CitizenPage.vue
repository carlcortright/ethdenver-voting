<template>
  <div>
    <div v-if="!walletPublished">
      Wallet has not been created. Show this QR code to an administrator.
      <img :src="imgSrc">
    </div>
    <div v-else-if="!canVote">
      Vote has not been enabled yet.
    </div>

    <ol>
      <li v-for="(cand,cId) in candidates">
        {{ cand.description }}<a v-if="canVote" href="#" v-on:click="vote(cId)">Vote</a>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'citizen',
    data () {
      return {
        'candidates': [],
        'walletPublished': false,
        'canVote': false,
        'voted': true,
        'imgSrc': 'http://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=' + this.$vote.pubKey
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
    components: {},
    methods: {
      vote: function (cId) {
        this.$vote.submitVote(cId).then(() => {
          alert('Voted!')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
