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
      @click="RAZ()"
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
    async envoyerTransaction() {
      const res = await this.$axios.post('/', this.informationsTransaction)
      if (undefined === res.errors) {
        this.$toast.success("La transaction a été enregistrée",  { duration: 5000 })
      } else {
        this.$toast.error("Une erreur c'est produite",  { duration: 5000 })
      }
      this.RAZ()
    },
    RAZ() {
      this.informationsTransaction.personne1 = ""
      this.informationsTransaction.personne2 = ""
      this.informationsTransaction.somme = "0"
    }
  }
}
</script>

<style scoped>

</style>
