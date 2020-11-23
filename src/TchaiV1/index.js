const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Transaction = require('./schema')
const connexion = require('./connexion')
mongoose.connect('mongodb+srv://'+ connexion.user + ':' + connexion.password + '@tchai.yc5xa.mongodb.net/Transaction', {useNewUrlParser: true})


let app = express()
let port = 8080

var jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.send('Hello les AMIZ !')
})

app.listen(port, () => {
    console.log('Fonctionne au poil')
})

app.post('/', jsonParser, async (req, res) => {
    const personne1 = req.query.personne1
    const personne2 = req.query.personne2
    const date = req.query.date
    const somme = req.query.somme

    if (!personne1 || !personne2 || !date || !somme) {
        res.send("Les élémentes n'ont pas été correctement reçu")
    }

    const nouvelleTransaction = new Transaction({
        personne1: personne1,
        personne2: personne2,
        date: date,
        somme: somme
    })

    await nouvelleTransaction.save()
    res.json(nouvelleTransaction)
})

app.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find()
    await res.json(transactions)
})

app.get('/transactions/:personne', async (req, res) => {
    const personne = req.params.personne
    const transaction1 = await Transaction.find({personne1: personne})
    const transaction2 = await Transaction.find({personne2: personne})
    const transaction = transaction1.concat(transaction2)
    res.json(transaction)
})

app.get('/transactions/solde/:personne', async (req, res) => {
    const personne = req.params.personne
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
    res.json({"personne": personne, "solde": solde})
})

app.get('/transactions/:id', async (req, res) => {
    const id = req.params.id
    const transaction = await Transaction.findOne({_id: id})
    res.json(transaction)
})
