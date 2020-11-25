// Déclaration du schéma utiliser en BDD
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    personne1: String,
    personne2: String,
    date: Date,
    somme: Number,
    hash1: String
})

module.exports = mongoose.model('transaction', schema)
