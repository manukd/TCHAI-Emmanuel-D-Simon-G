<template>
  <p v-if="$fetchState.pending">Chargement des données</p>
  <p v-else-if="$fetchState.error">Une erreur c'est produite</p>
  <div v-else>
    <v-text-field
      v-model="personneRecherchee"
      :counter="20"
      :rules="[rules.required]"
      label="Recherche"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="$fetch"
    >
      Rechercher
    </v-btn>

    <v-data-table
      :headers="headers"
      :items="donnees"
      :items-per-page="5"
      item-key="_id"
      class="elevation-1"
      :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "ListeTransactionsPersonne",
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: '_id',
          width: "20px"
        },
        { text: 'Débiteur', value: 'personne1', width: 20 },
        { text: 'Créancier', value: 'personne2', width: 20 },
        { text: 'Date', value: 'date', width: 10 },
        { text: 'Montant', value: 'somme', width: 5 },
        { text: 'Hash', value: 'hash1', width: 40},
      ],
      donnees: {"_id": "", "personne1": "", "personne2": "", "date": "", "somme": "", "hash1": ""},
      personneRecherchee: '',
      valid: true,
      rules: {
        required: value => !!value || 'Ce champ est nécessaire',
      },
    }
  },
  async fetch() {
    this.donnees = await this.$axios.$get('/transactions/' + this.personneRecherchee)
  }
}
</script>

<style scoped>

</style>
