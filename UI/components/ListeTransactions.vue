<template>
  <p v-if="$fetchState.pending">Chargement des données</p>
  <p v-else-if="$fetchState.error">Une erreur c'est produite</p>
  <v-data-table
    v-else
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
</template>

<script>
export default {
  name: "ListeTransactions",
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
      donnees: {"_id": "", "personne1": "", "personne2": "", "date": "", "somme": "", "hash1": ""}
    }
  },
  async fetch() {
    this.donnees = await this.$axios.$get('/transactions')
  }
}
</script>

<style scoped>

</style>
