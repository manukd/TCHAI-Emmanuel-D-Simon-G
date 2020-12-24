<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
        v-if="connexion"
      ></v-avatar>
      <v-skeleton-loader
        v-bind="attrs"
        type="avatar"
        class="pa-2"
        v-if="!connexion"
      ></v-skeleton-loader>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <v-skeleton-loader
                class="mx-auto"
                type="image, article"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>




          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg" class="pa-4" v-if="!connexion">
              <v-layout align-center justify-center>
                <div class="text-xs-center">
                  <v-card-title>Vous devez vous connecter avant de pouvoir utiliser les fonctionnalités</v-card-title>
                </div>
              </v-layout>
              <v-layout align-center justify-center>
                <div class="text-xs-center pa-4">
                  <v-btn class="justify-center" color="success" width="200" @click="pageConnexion()">Se connecter</v-btn>
                </div>
                <div class="text-xs-center pa-4">
                  <v-btn class="justify-center" color="warning" width="200" @click="pageInscription()">S'incrire</v-btn>
                </div>
              </v-layout>
            </v-sheet>
            <v-sheet min-height="70vh" rounded="lg" class="pa-4">
              Connecté
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <v-skeleton-loader
                class="mx-auto"
                type="image, article"
              ></v-skeleton-loader>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from "../components/Logo";
import { mapState } from 'vuex'
export default {
  components: {Logo},
  data() {
    return {
      text: "",
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }
  },
  computed: {
    connexion() {
      return undefined !== this.$store.state.utilisateur.utilisateur._id;
    }
  },
  async created() {
    this.text = (await this.$axios.get("/")).data
  },
  methods: {
    pageConnexion() {
      this.$router.push('/connexion')
    },
    pageInscription() {
      this.$router.push('/inscription')
    }
  }
}
</script>

<style>

</style>
