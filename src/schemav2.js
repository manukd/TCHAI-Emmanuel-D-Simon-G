// Déclaration du schéma utiliser en BDD
const mongoose = require('mongoose')

const schemav2 = mongoose.Schema({
    personne1: String,
    personne2: String,
    date: Date,
    somme: Number,
    hash: String
})

module.exports = mongoose.model('transactionv2', schemav2)
