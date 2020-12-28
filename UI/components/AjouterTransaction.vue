<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card-title>Effectuer une nouvelle transaction</v-card-title>
    <v-divider></v-divider>
    <v-text-field
      v-model="informationsTransaction.personne1"
      :counter="20"
      :rules="[rules.required]"
      label="Personne à débiter"
      required
    ></v-text-field>

    <v-text-field
      v-model="informationsTransaction.personne2"
      :counter="20"
      :rules="[rules.required]"
      label="Personne à créditer"
      required
    ></v-text-field>

    <v-text-field
      v-model="informationsTransaction.somme"
      :counter="20"
      :rules="[rules.required]"
      placeholder="10"
      label="Montant de la transaction"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="envoyerTransaction()"
    >
      Envoyer
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click=""
    >
      Annuler
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "AjouterTransaction",
  data() {
    return {
      informationsTransaction: {
        personne1: '',
        personne2: '',
        somme: 0,
      },
      valid: true,
      rules: {
        required: value => !!value || 'Ce champ est nécessaire',
      },
      show1: false
    }
  },
  methods: {
    envoyerTransaction() {
      this.$axios.post('/', this.informationsTransaction)
    }
  }
}
</script>

<style scoped>

</style>
