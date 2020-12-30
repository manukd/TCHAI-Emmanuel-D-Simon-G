<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >

      <v-tabs
        v-model="tab"
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="onglet in onglets"
          :key="onglet.nom"
        >
          {{ onglet.nom }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <v-skeleton-loader
                class="mx-auto"
                type="image, article"
                v-if="!connexion"
              ></v-skeleton-loader>
              <v-container style="height: 400px;" v-if="connexion">
                <v-row
                  class="fill-height"
                  align-content="center"
                  justify="center"
                >
                  <AfficherSoldePersonne v-if="connexion" :compteP="utilisateur"/>
                </v-row>
              </v-container>
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
            <v-sheet min-height="70vh" rounded="lg" class="pa-4" v-if="connexion">
              <v-tabs-items v-model="tab" v-if="connexion">
                <v-tab-item
                  v-for="onglet in onglets"
                  :key="onglet.indice"
                >
                  <AjouterTransaction v-if="onglet.indice === 0" />
                  <ListeTransactions v-if="onglet.indice === 1" />
                  <ListeTransactionsPersonne v-if="onglet.indice === 2" />
                  <AfficherSoldePersonne v-if="onglet.indice === 3" :compteP="utilisateur" :rechercheB="true" />
                </v-tab-item>
              </v-tabs-items>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <v-skeleton-loader
                class="mx-auto"
                type="image, article"
                v-if="!connexion"
              ></v-skeleton-loader>
              <v-container style="height: 400px;" v-if="connexion">
                <VerificationIntegrite />
              </v-container>
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
import AjouterTransaction from "~/components/AjouterTransaction";
import ListeTransactions from "~/components/ListeTransactions";
import ListeTransactionsPersonne from "~/components/ListeTransactionsPersonne";
import AfficherSoldePersonne from "~/components/AfficherSoldePersonne";
import VerificationIntegrite from "../components/VerificationIntegrite";
export default {
  components: {
    VerificationIntegrite,
    AfficherSoldePersonne, ListeTransactionsPersonne, ListeTransactions, AjouterTransaction, Logo},
  data() {
    return {
      text: "",
      tab: null,
      onglets: [
        {nom: 'Nouvelle Transaction', indice: 0},
        {nom: 'Transactions', indice: 1},
        {nom: 'Transactions d\'utilisateur', indice: 2},
        {nom: 'Solde utilisateur', indice: 3},
      ],
    }
  },
  computed: {
    connexion() {
      return undefined !== this.$store.state.utilisateur.utilisateur._id;
    },
    utilisateur() {
      return this.$store.state.utilisateur.utilisateur.identifiant
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
