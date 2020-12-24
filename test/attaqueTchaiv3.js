const express = require('express')
const mongoose = require('mongoose')
const connexion = require('../src/connexion')
const Transaction = require('../src/TchaiV1/schema')
const crypto = require('crypto')

mongoose.connect('mongodb+srv://'+ connexion.user + ':' + connexion.password + '@tchai.yc5xa.mongodb.net/TransactionV2', {useNewUrlParser: true, useUnifiedTopology: true})

let app = express()
let port = 8080

app.listen(port, () => {
    console.log('Fonctionne au poil')
})

app.get('/', async (req, res) => {

    const soldeP1pre = await calculSolde("p1")
    const soldeP2pre = await calculSolde("p2")
    let personne1 = "p2"
    let personne2 = "p1"
    let date = Date.now()
    const somme = Math.round(Math.random()*100)

    const hash = crypto.createHash('sha256')
    const hash_update = hash.update((personne1+personne2+date+somme),'utf8')
    const hash_res = hash_update.digest('hex')

    const tansaction1 = new Transaction({
        personne1: personne1,
        personne2: personne2,
        date: date,
        somme: somme,
        hash1: hash_res
    })

    const transac1 = await tansaction1.save()

    const soldeP1post = await calculSolde("p1")
    const soldeP2post = await calculSolde("p2")

    res.json({
        "Solde du compte P1 avant les transactions intégré par P1": soldeP1pre,
        "Solde du compte P2 avant les transactions intégré par P1": soldeP2pre,
        "Montant de la transaction entre P1 et P2": somme,
        "Solde du compte P1 après les transactions intégré par P1": soldeP1post,
        "Solde du compte P2 après les transactions intégré par P1": soldeP2post,
    })
})

async function calculSolde(_personne) {
    const personne = _personne
    let solde = 0.
    const transaction1 = await Transaction.find({personne1: personne})
    let temp = JSON.parse(JSON.stringify(transaction1))
    for (const prop in temp) {
        if (temp.hasOwnProperty(prop)) {
            solde -= temp[prop].somme
        }
    }
    const transaction2 = await Transaction.find({personne2: personne})
    temp = JSON.parse(JSON.stringify(transaction2))
    for (const prop in temp) {
        if (temp.hasOwnProperty(prop)) {
            solde += temp[prop].somme
        }
    }
    return solde
}
