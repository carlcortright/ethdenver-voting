<template>
  <div>
    <div v-if="!walletPublished">
      Wallet has not been created. Show this QR code to an administrator.
      <img src="http://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=">
    </div>
    <ol>
      <li v-for="cand in candidates">
        {{ cand.description }}
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
    methods: {}
  }
</script>

<style lang="scss" scoped>
</style>
