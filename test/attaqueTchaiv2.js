const express = require('express')
const mongoose = require('mongoose')
const connexion = require('../src/connexion')
const Transaction = require('../src/TchaiV1/schema')
mongoose.connect('mongodb+srv://'+ connexion.user + ':' + connexion.password + '@tchai.yc5xa.mongodb.net/Transaction', {useNewUrlParser: true})

let app = express()
let port = 8080

app.listen(port, () => {
    console.log('Fonctionne au poil')
})

app.get('/', async (req, res) => {
    const personne1 = "p1"
    const personne2 = "p2"
    const personne3 = "p3"
    // solde personne 1
    let solde = 0.
    let transaction1 = await Transaction.find({personne1: personne1})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    let transaction2 = await Transaction.find({personne2: personne1})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const ancienSolde1 = solde
    // solde personne 2
    solde = 0.
    transaction1 = await Transaction.find({personne1: personne2})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    transaction2 = await Transaction.find({personne2: personne2})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const ancienSolde2 = solde
    // solde personne 3
    solde = 0.
    transaction1 = await Transaction.find({personne1: personne3})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    transaction2 = await Transaction.find({personne2: personne3})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const ancienSolde3 = solde

    // transaction de p1 à p2 puis de p2 à p3 
    const transaction = await Transaction.findOne({personne2: personne})
    transaction.somme = transaction.somme + 50
    await transaction.save()

    //solde des personne entermédiaire

    solde = 0

    const transaction1 = await Transaction.find({personne1: personne1})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    const transaction2 = await Transaction.find({personne2: personne1})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const interSolde1 = solde
    // inter solde p2
    solde = 0

    transaction1 = await Transaction.find({personne1: personne2})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    transaction2 = await Transaction.find({personne2: personne2})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const interSolde2 = solde
    // inter solde p3
    solde = 0

    transaction1 = await Transaction.find({personne1: personne3})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    transaction2 = await Transaction.find({personne2: personne3})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const interSolde3 = solde

    //attaque

    // nouveau solde p1
    solde = 0

    const transaction1 = await Transaction.find({personne1: personne1})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    const transaction2 = await Transaction.find({personne2: personne1})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const newSolde1 = solde
    // nouveau solde p2
    solde = 0

    transaction1 = await Transaction.find({personne1: personne2})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    transaction2 = await Transaction.find({personne2: personne2})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const newSolde2 = solde
    // nouveau solde p3
    solde = 0

    transaction1 = await Transaction.find({personne1: personne3})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    transaction2 = await Transaction.find({personne2: personne3})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if(temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }

    const newSolde3 = solde

    res.send("Le solde de la personne " + personne1 + " est de " + ancienSolde1 + " avant l'échange </br> Le solde de la personne " + personne2 + " est de " + ancienSolde2 + " avant avant l'échange <br> Le solde de la personne " + personne3 + " est de " + ancienSolde3 + " avant l'échange <br> Ici la personne" + personne1 + " donne 20 € a la personne " + personne2 + " puis la personne " + personne2 + " donne 20 € à la personne " + personne3 + " <br> Le solde de la personne " + personne1 + " est de " + interSolde1 + " avant modification </br> Le solde de la personne " + personne2 + " est de " + interSolde2 + " avant modification <br> Le solde de la personne " + personne3 + " est de " + interSolde3 + " avant modification <br> Puis un supprime la transation entre la personne " + personne1 + " et la personne " + personne2 + " <br> Le solde de la personne " + personne1 + " est de " + interSolde1 + " après modification </br> Le solde de la personne " + personne2 + " est de " + interSolde2 + " après modification <br> Le solde de la personne " + personne3 + " est de " + interSolde3 + " après modification ")
})
