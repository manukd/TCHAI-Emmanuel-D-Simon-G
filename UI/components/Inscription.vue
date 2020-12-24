<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="informationsUtilisateur.nom"
      :counter="20"
      :rules="[rules.required]"
      label="Nom"
      required
    ></v-text-field>

    <v-text-field
      v-model="informationsUtilisateur.prenom"
      :counter="20"
      :rules="[rules.required]"
      label="Prénom"
      required
    ></v-text-field>

    <v-text-field
      v-model="informationsUtilisateur.identifiant"
      :counter="20"
      :rules="[rules.required]"
      label="Identifiant"
      required
    ></v-text-field>

    <v-text-field
      v-model="informationsUtilisateur.mdp"
      :counter="20"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      label="Mot de passe"
      required
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      v-model="informationsUtilisateur.email"
      :rules="[rules.required, rules.emailMatch]"
      label="E-mail"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="infoUtilisateur(informationsUtilisateur)"
    >
      Inscription
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Annuler
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: "inscription",
  props: ['infoUtilisateur'],
  data: () => ({
    valid: true,
    informationsUtilisateur: {
      nom: '',
      prenom: '',
      identifiant: '',
      mdp: '',
      email: ''
    },
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    rules: {
      required: value => !!value || 'Ce champ est nécessaire',
      min: v => v.length >= 8 || 'Ce champ doit contenir 8 caractères minimum',
      emailMatch: v => (/.+@.+\..+/.test(v) || "E-mail non valide"),
    },
    show1: false,
  }),

  methods: {
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

</style>
