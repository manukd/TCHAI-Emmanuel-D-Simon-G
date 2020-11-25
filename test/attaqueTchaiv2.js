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
    const soldeP3pre = await calculSolde("p3")
    let personne1 = "p1"
    let personne2 = "p2"
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

    personne1 = "p2"
    personne2 = "p3"
    date = Date.now()
    const somme1 = Math.round(Math.random()*100)
    const hash2 = crypto.createHash('sha256')
    const hash_update2 = hash2.update((personne1+personne2+date+somme),'utf8')
    const hash_res2 = hash_update2.digest('hex')


    const tansaction2 = new Transaction({
        personne1: personne1,
        personne2: personne2,
        date: date,
        somme: somme1,
        hash1: hash_res2
    })

    await tansaction2.save()
    const soldeP1post = await calculSolde("p1")
    const soldeP2post = await calculSolde("p2")
    const soldeP3post = await calculSolde("p3")

    // Suppression de la transaction 1
    let tmp = await Transaction.findOne({"_id": transac1.id})
    await Transaction.deleteOne({_id: tmp._id})
    const soldeP1final = await calculSolde("p1")
    const soldeP2final = await calculSolde("p2")
    const soldeP3final = await calculSolde("p3")

    res.json({
        "Solde du compte P1 avant les transactions": soldeP1pre,
        "Solde du compte P2 avant les transactions": soldeP2pre,
        "Solde du compte P3 avant les transactions": soldeP3pre,
        "Montant de la transaction entre P1 et P2": somme,
        "Montant de la transaction entre P2 et P3": somme1,
        "Solde du compte P1 après les transactions": soldeP1post,
        "Solde du compte P2 après les transactions": soldeP2post,
        "Solde du compte P3 après les transactions": soldeP3post,
        "Solde du compte P1 après avoir supprimé la transaction n°1": soldeP1final,
        "Solde du compte P2 après avoir supprimé la transaction n°1": soldeP2final,
        "Solde du compte P3 après avoir supprimé la transaction n°1": soldeP3final
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
