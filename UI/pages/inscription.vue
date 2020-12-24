<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-col
            cols="12"
            sm="8"
            align="center"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pa-4"
            >
              <Inscription :infoUtilisateur="infoUtilisateur"/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "inscription",
  methods: {
    infoUtilisateur(informationsUtilisateur) {
      this.$axios.post('/inscription', informationsUtilisateur)
      this.$router.push('/connexion')
    }
  }
}
</script>

<style scoped>

</style>
