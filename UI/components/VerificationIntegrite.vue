<template>
  <v-row
      class="fill-height"
      align-content="center"
      justify="center"
  >
    <v-col
        class="subtitle-1 text-center"
        cols="12"
    >
      <v-btn
          color="primary"
          @click="(chargement = true) && lancerVerification()"
          v-if="!chargement"
      >
        Verification
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-progress-linear
          color="deep-purple accent-4"
          :active="chargement"
          :indeterminate="chargement"
          rounded
          height="6"
      ></v-progress-linear>
    </v-col>
    <v-col cols="12">
      <p
          v-if="resultat && nbErreurs === 0"
          :active="!chargement"
          :indeterminate="!chargement"
      >
        La liste des transactions n'a pas été altérée
      </p>
      <p
          v-if="resultat && nbErreurs !== 0"
          :active="!chargement"
          :indeterminate="!chargement"
      >
        La liste des transactions a été altérée, {{ nbErreurs }} transactions ont pontentiellement été modifiées
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "VerificationIntegrite",
  data() {
    return {
      chargement: false,
      resultat: false,
      nbErreurs: 0
    }
  },
  methods: {
    async lancerVerification() {
      const probleme = await this.$axios.$get("/transactions/verification")
      debugger
      if (null !== probleme) {
        this.nbErreurs = probleme.length
      }
      this.resultat = true
    }
  },
  watch: {
    chargement (val) {
      if (!val) return

      setTimeout(() => (this.chargement = false), 3000)
    }
  }
}
</script>

<style scoped>

</style>
