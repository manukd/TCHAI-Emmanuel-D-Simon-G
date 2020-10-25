const express = require('express')
const mongoose = require('mongoose')
const connexion = require('../src/connexion')
const Transaction = require('../src/schema')
mongoose.connect('mongodb+srv://'+ connexion.user + ':' + connexion.password + '@tchai.yc5xa.mongodb.net/Transaction', {useNewUrlParser: true})

let app = express()
let port = 8080

app.listen(port, () => {
    console.log('Fonctionne au poil')
})

app.get('/', async (req, res) => {
    const personne = "p2"
    let solde = 0.
    const transaction1 = await Transaction.find({personne1: personne})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    const transaction2 = await Transaction.find({personne2: personne})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const ancienSolde = solde

    const transaction = await Transaction.findOne({personne2: personne})
    transaction.somme = transaction.somme + 50
    await transaction.save()

    solde = 0

    const transaction3 = await Transaction.find({personne1: personne})
    temp = JSON.parse(JSON.stringify(transaction3))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    const transaction4 = await Transaction.find({personne2: personne})
    temp = JSON.parse(JSON.stringify(transaction4))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    res.send("Les soldes de la personne " + personne + " est de " + ancienSolde + " avant modification </br> Les soldes de la personne " + personne + " est de " + solde + " après modification")
})
