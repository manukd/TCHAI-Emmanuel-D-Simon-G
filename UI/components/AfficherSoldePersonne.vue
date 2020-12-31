<template>
  <div>
    <v-text-field
      v-model="recherche"
      :counter="20"
      :rules="[rules.required]"
      label="Recherche"
      required
      v-if="rechercheB"
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="$fetch"
      v-if="rechercheB"
    >
      Rechercher
    </v-btn>
    <v-card-title>Compte : {{ this.compte.personne }}</v-card-title>
    <v-card-text>Solde : {{ this.compte.solde }}</v-card-text>
    <v-col v-if="!rechercheB">
      <v-btn
          class="mr-4"
          @click="$fetch"
      >
        Rafraîchir
      </v-btn>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "AfficherSoldePersonne",
  props: ['compteP', 'rechercheB'],
  data() {
    return {
      compte: [
        { personne: '' },
        { solde: '' }
      ],
      recherche: this.compteP,
      valid: true,
      rechercheB: false,
      rules: {
        required: value => !!value || 'Ce champ est nécessaire',
      }
    }
  },
  async fetch() {
    this.compte = await this.$axios.$get('/transactions/solde/' + this.recherche)
  }
}
</script>

<style scoped>

</style>
