// Déclaration du schéma utiliser en BDD
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    nom: String,
    prenom: String,
    identifiant: String,
    mdp: String,
    email: String,
    adresse: String
})

module.exports = mongoose.model('user', schema)
