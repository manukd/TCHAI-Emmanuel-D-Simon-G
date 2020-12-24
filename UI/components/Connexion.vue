<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card-title>Connexion</v-card-title>
    <v-divider></v-divider>
    <v-text-field
      v-model="informationsConnexion.identifiant"
      :counter="20"
      :rules="[rules.required]"
      label="Identifiant"
      required
    ></v-text-field>

    <v-text-field
      v-model="informationsConnexion.mdp"
      :counter="20"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required]"
      :type="show1 ? 'text' : 'password'"
      label="Mot de passe"
      required
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="infoConnexion(informationsConnexion)"
    >
      Connexion
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
  name: "Connexion",
  props: ['infoConnexion'],
  data() {
    return {
      informationsConnexion: {
        identifiant: '',
        mdp: '',
      },
      valid: true,
      rules: {
        required: value => !!value || 'Ce champ est nécessaire',
      },
      show1: false
    }
  }
}
</script>

<style scoped>

</style>
