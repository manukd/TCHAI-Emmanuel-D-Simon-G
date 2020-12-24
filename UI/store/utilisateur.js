export const state = () => ({
  utilisateur: {}
})

export const mutations = {
  setUtilisateur(state, _utilisateur) {
    state.utilisateur = _utilisateur
  }
}
