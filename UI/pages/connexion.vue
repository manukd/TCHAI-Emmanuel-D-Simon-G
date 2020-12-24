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
              <Connexion :infoConnexion="connexionUtilisateur" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutation } from 'vuex'
export default {
  name: "connexion",
  methods: {
    async connexionUtilisateur(infoConnexion) {
      const res = await this.$axios.$post("/login", infoConnexion)
      console.log(res)
      if (res.resultat) {
        this.$store.commit('utilisateur/setUtilisateur', res.utilisateur)
        await this.$router.push({path: '/'})
      }
    }
  }
}
</script>

<style scoped>

</style>
